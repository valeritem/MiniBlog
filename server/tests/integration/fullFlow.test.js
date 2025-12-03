process.env.JWT_SECRET = 'testsecret'; // Це має бути ДО імпорту app, якщо app використовує цей env одразу

import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
// Імпортуємо app статично, якщо ви виправили Крок 1. 
// Якщо ні - залишіть динамічний імпорт, але переконайтесь, що app.js не робить connect.
import app from '../../app.js'; 

// Моделі (переконайтеся, що шляхи правильні)
// import User from '../../models/User.js'; // Не обов'язково імпортувати, якщо не використовуєте напряму в тесті


let mongo;

beforeAll(async () => {
  // 1. Запускаємо віртуальну БД
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  // 2. Явно відключаємось, якщо раптом було старе з'єднання
  await mongoose.disconnect();
  
  // 3. Підключаємо Mongoose саме до нашої віртуальної БД
  await mongoose.connect(uri);
});

afterAll(async () => {
  // 1. Чистимо БД
  await mongoose.connection.dropDatabase();
  // 2. Закриваємо з'єднання Mongoose
  await mongoose.connection.close();
  // 3. Зупиняємо віртуальний сервер
  await mongo.stop();
});

describe('Full integration test: Auth → Post → Comment', () => {
  let token;
  let postId;

  test('Register user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      password: '123456',
    });
    
    // Додайте лог, якщо тест падає, щоб бачити помилку
    if (res.statusCode !== 200) {
        console.error('Register Error:', res.body);
    }

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  test('Login user', async () => {
    const res = await request(app).post('/api/auth/login').send({
      username: 'testuser',
      password: '123456',
    });

    if (res.statusCode !== 200) {
        console.error('Login Error:', res.body); // Це покаже, чому саме 404 (напр. "User not found")
    }

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  test('Create post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`) // Важливо: переконайтесь, що мідлвар Auth бере токен правильно
      .send({
        title: 'My first post',
        text: 'Hello world!',
        tags: 'test,jest' // Додайте всі обов'язкові поля вашої моделі Post
      });
      
    if (res.statusCode !== 200) console.error('Create Post Error:', res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id');
    postId = res.body._id;
  });

  // ... решта тестів без змін ...
  
  test('Get post by ID', async () => {
    const res = await request(app).get(`/api/posts/${postId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('My first post');
  });

  test('Create comment', async () => {
    const res = await request(app)
      .post(`/api/comments/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        comment: 'Nice post!',
      });
    expect(res.statusCode).toBe(201); // Або 200, залежить від вашого контролера
    expect(res.body.comment).toBe('Nice post!');
  });

  test('Get comments of post', async () => {
    const res = await request(app).get(`/api/posts/comments/${postId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].comment).toBe('Nice post!');
  });
});