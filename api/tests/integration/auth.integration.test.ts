import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { User } from '../../models/User.model';
import bcrypt from "bcryptjs"

let mongoServer: MongoMemoryServer
let app: any;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  process.env.MONGODB_URI = uri;
  app = (await import("../../index")).default;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
})

describe('Auth Integration - ', () => {
  describe('GET /test - Check Health Auth', () => {
    it('Should returns 200 with test message.', async () => {
      const expectedStatus = 200
      const expectedBody = {
        data: {},
        message: "Auth test route is working."
      }

      const response = await request(app).get('/auth/test')

      expect.assertions(2)
      expect(response.body).toEqual(expectedBody)
      expect(response.status).toBe(expectedStatus)
    })
  })

  describe('POST /login', () => {

    const testUser = {
    name: "Test User",
    email: "test@example.com",
    password: "12345678"
  };

  beforeAll( async () => {
    const passwordHash = await bcrypt.hash(testUser.password, 10);

    await User.create({
      name: testUser.name,
      email: testUser.email,
      passwordHash
    });
  })

  afterAll(async () => {
  await User.deleteMany({});
});

    it('Should response 202 with token and cookies.', async () => {
      const expectedStatus = 202
      const expectedMessage = "Login successful"
      const expectedUser = {
      name: testUser.name,
      email: testUser.email
    }

      const response = await request(app)
      .post('/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });

    expect(response.status).toBe(expectedStatus);
    expect(response.body.message).toBe(expectedMessage);
    expect(response.body.data.accessToken).toBeDefined();
    expect(response.body.data.user).toMatchObject(expectedUser);
    const cookies = response.headers['set-cookie'];
    expect(cookies).toBeDefined();
    expect(cookies[0]).toContain('refreshToken');
    })

    it('Should response 400 when some data left.', async () => {
      const expectedStatus = 400
      const expectedMessage = "Fields email and password are required"

      const response = await request(app)
      .post('/auth/login')
      .send({
        email: testUser.email,
        password: ""
      });

    expect(response.status).toBe(expectedStatus);
    expect(response.body.message).toBe(expectedMessage);
    })

     it('Should response 401 user not exist.', async () => {
      const expectedStatus = 401
      const expectedMessage = "User incorrect"
      const response = await request(app)
      .post('/auth/login')
      .send({
        email: "wron_user@example.com",
        password: testUser.password
      });

    expect(response.status).toBe(expectedStatus);
    expect(response.body.message).toBe(expectedMessage);
    })

    it('Should response 401 password is incorrect.', async () => { 
      const expectedStatus = 401
      const expectedMessage = "Password incorrect"
      const response = await request(app)
      .post('/auth/login')
      .send({
        email: testUser.email,
        password: "password incorrect"
      });

    expect(response.status).toBe(expectedStatus);
    expect(response.body.message).toBe(expectedMessage);
    })

    it('Should response 500 password is incorrect.', async () => { 
      const expectedStatus = 500
      const expectedMessage = "Error during login"

      jest.spyOn(User, 'findOne').mockImplementationOnce(() => {
        throw new Error("Simulated DB error");
      });

      const response = await request(app)
      .post('/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });

    expect(response.status).toBe(expectedStatus);
    expect(response.body.message).toBe(expectedMessage);
    })
  })
  describe('POST /refresh', () => {
    it('Should response 202 when token was updated.', async () => {
      const senderToken = 'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODdhYzZhNmIyYzY0NWIyZGVjNzFkYWQiLCJpYXQiOjE3NTI4NzY3MTEsImV4cCI6MTc1MzQ4MTUxMX0.4OIsPBbTZrcnl8S4m9jOfQUNACsf6cPfN1bAJ5o2DLU; Max-Age=604800; Path=/; Expires=Fri, 25 Jul 2025 22:11:51 GMT; HttpOnly; Secure; SameSite=Strict'
      const expectedStatus = 202
      const expectedMessage = "Access token refreshed successfully"

      const response = await request(app).post('/auth/refresh').set("Cookie", [senderToken]).send({})

      expect(response.status).toBe(expectedStatus)
      expect(response.body.message).toBe(expectedMessage)
      expect(response.body.data.accessToken).toBeDefined()
      const cookies = response.headers['set-cookie'];
      expect(cookies).toBeDefined();
    })

    it('Should response 401 when there is not.', async () => {
      const senderToken = ''
      const expectedStatus = 401
      const expectedMessage = "No refresh token provided"

      const response = await request(app).post('/auth/refresh').set("Cookie", [senderToken]).send({})

      expect(response.status).toBe(expectedStatus)
      expect(response.body.message).toBe(expectedMessage)
    })

    it('Should response 401 when token is invalit.', async () => {
      const senderToken = 'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVsdfgCJ9.eyJ1c2VySWQiOiI2ODdhYzZhNmIyYzY0NWIyZGVjNzFkYWQiLCJpYXQiOjE3NTI4NzY3MTEsImV4cCI6MTc1MzQ4MTUxMX0.4OIsPBbTZrcnl8S4m9jOfQUNACsf6cPfN1bAJ5o2DLU; Max-Age=604800; Path=/; Expires=Fri, 25 Jul 2025 22:11:51 GMT; HttpOnly; Secure; SameSite=Strict'
      const expectedStatus = 401
      const expectedMessage = "Invalid or expired refresh token"

      const response = await request(app).post('/auth/refresh').set("Cookie", [senderToken]).send({})

      expect(response.status).toBe(expectedStatus)
      expect(response.body.message).toBe(expectedMessage)
    })
  })
  describe('POST /logout', () => {})
})