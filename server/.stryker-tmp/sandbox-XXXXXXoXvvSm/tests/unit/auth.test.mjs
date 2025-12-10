// @ts-nocheck
import { jest } from '@jest/globals';

// Створюємо mockSave перед mockModule
const mockSave = jest.fn();

const userMock = {
  findOne: jest.fn(),
  findById: jest.fn(),
};

const bcryptMock = {
  genSaltSync: jest.fn(),
  hashSync: jest.fn(),
  compare: jest.fn(),
};

const jwtMock = {
  sign: jest.fn(),
};

jest.unstable_mockModule('../../models/User.js', () => ({
  default: jest.fn().mockImplementation(function (data) {
    return {
      ...data,
      _id: 'id123',
      save: mockSave,
    };
  }),
}));

jest.unstable_mockModule('bcryptjs', () => ({
  default: bcryptMock,
}));

jest.unstable_mockModule('jsonwebtoken', () => ({
  default: jwtMock,
}));

// Імпорти
const { register, login, getMe } = await import('../../controllers/auth.js');
const User = (await import('../../models/User.js')).default;
const bcrypt = (await import('bcryptjs')).default;
const jwt = (await import('jsonwebtoken')).default;

// Додаємо статичні методи до User
User.findOne = userMock.findOne;
User.findById = userMock.findById;

const mockRequest = (body = {}, userId = null) => ({
  body,
  userId,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// Tests
describe('Auth controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Register
  test('register: повертає помилку, якщо username вже зайнятий', async () => {
    const req = mockRequest({ username: 'test', password: '123' });
    const res = mockResponse();

    User.findOne.mockResolvedValue({ username: 'test' });

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Даний username вже зайнятий. ',
    });
  });

  test('register: успішна реєстрація', async () => {
    const req = mockRequest({ username: 'alice', password: 'pass' });
    const res = mockResponse();

    User.findOne.mockResolvedValue(null);

    bcrypt.genSaltSync.mockReturnValue('salt');
    bcrypt.hashSync.mockReturnValue('hashedPassword');

    const savedUser = {
      _id: 'id123',
      username: 'alice',
      password: 'hashedPassword',
    };

    mockSave.mockResolvedValue(savedUser);
    jwt.sign.mockReturnValue('token123');

    await register(req, res);

    expect(mockSave).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      newUser: expect.objectContaining({
        username: 'alice',
        password: 'hashedPassword',
      }),
      token: 'token123',
      message: 'Реєстрація пройшла успішно.',
    });
  });

  // Login
  test('login: помилка — юзера не існує', async () => {
    const req = mockRequest({ username: 'unknown', password: '1234' });
    const res = mockResponse();

    User.findOne.mockResolvedValue(null);

    await login(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: 'Такого корситувача не існує.',
    });
  });

  test('login: неправильний пароль', async () => {
    const req = mockRequest({ username: 'user', password: 'wrong' });
    const res = mockResponse();

    const user = { username: 'user', password: 'hashed' };

    User.findOne.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(false);

    await login(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: 'Неправильний пароль.',
    });
  });

  test('login: успішний вхід', async () => {
    const req = mockRequest({ username: 'user', password: '1234' });
    const res = mockResponse();

    const user = { _id: 'userId', username: 'user', password: 'hashed' };

    User.findOne.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('login_token');

    await login(req, res);

    expect(res.json).toHaveBeenCalledWith({
      token: 'login_token',
      user,
      message: 'Ви увійшли в систему.',
    });
  });

  // get Me
  test('getMe: юзера не існує', async () => {
    const req = mockRequest({}, '123');
    const res = mockResponse();

    User.findById.mockResolvedValue(null);

    await getMe(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: 'Такого корситувача не існує.',
    });
  });

  test('getMe: успішно повертає дані', async () => {
    const req = mockRequest({}, '123');
    const res = mockResponse();

    const user = { _id: '123', username: 'vlad' };

    User.findById.mockResolvedValue(user);
    jwt.sign.mockReturnValue('tokenXYZ');

    await getMe(req, res);

    expect(res.json).toHaveBeenCalledWith({
      token: 'tokenXYZ',
      user,
    });
  });
});
