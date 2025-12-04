// @ts-nocheck
process.env.JWT_SECRET = 'testsecret'; 

import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import app from '../../app.js'; 

let mongo;

beforeAll(async () => {

  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.disconnect();

  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
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
        console.error('Login Error:', res.body); 
    }

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  test('Create post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`) 
      .send({
        title: 'My first post',
        text: 'Hello world!',
        tags: 'test,jest' 
      });
      
    if (res.statusCode !== 200) console.error('Create Post Error:', res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id');
    postId = res.body._id;
  });

  
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
    expect(res.statusCode).toBe(201); 
    expect(res.body.comment).toBe('Nice post!');
  });

  test('Get comments of post', async () => {
    const res = await request(app).get(`/api/posts/comments/${postId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].comment).toBe('Nice post!');
  });
});