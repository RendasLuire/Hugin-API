import request from 'supertest';
import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose, { Types } from 'mongoose';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { User } from '../../models/User.model';
import { defineDefaultAccountTypes } from '../../services/accountType.service';

jest.setTimeout(20000);

let mongoServer: MongoMemoryServer
let app: any;
let accessToken: any

type TestUser = {
  name: string;
  email: string;
  password: string;
  _id?: Types.ObjectId;
};

 let testUser:TestUser = {
    name: "Test User",
    email: "test@example.com",
    password: "12345678"
  };


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

describe('User Integration -', () => {

  beforeEach(async () => {
    const passwordHash = await bcrypt.hash(testUser.password, 10);
    const email = Math.random().toString(36).slice(2) + testUser.email;

    const newUser = await User.create({
      name: testUser.name,
      email,
      passwordHash
    });

    testUser = {...testUser , _id:newUser._id, email};

    accessToken = jwt.sign(
                { userId: testUser?._id, email: testUser?.email },
                process.env.JWT_SECRET || "secreto",
                { expiresIn: "1h" }
              );
  })

  afterEach(async () => {
    await User.deleteMany({});
  })

  describe('GET /users/test', () => {

    it('Should return a test user and message', async () => {
      const expectedStatus = 202;
      const expectedMessage = "Test Users endpoint is working"

      const response = await request(app).get('/users/test')

      expect(response.status).toBe(expectedStatus);
      expect(response.body.message).toBe(expectedMessage);
      expect(response.body.data.length).toBe(1);
    })
  })
  describe('GET /users/', () => {
    it('Should return 200 and list of users', async () => {
      const expectedStatus = 200
      const expectedMessage = "Users List retrieved successfully"

      const response = await request(app).get('/users/').auth(accessToken, { type: 'bearer' });

      expect(response.status).toBe(expectedStatus);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.message).toBe(expectedMessage);
    })
    it('Should return 401 when there is not a token', async () => {
      const expectedStatus = 401
      const expectedMessage = "No authorization header provided"

      const response = await request(app).get('/users/').auth('', { type: 'bearer' });

      expect(response.status).toBe(expectedStatus);
      expect(response.body.message).toBe(expectedMessage);
    })
  })
  describe('GET /users/:id', () => {

    it('Should return 200 and user data', async () => {
      const sendedUserId = testUser._id;
      const expectedStatus = 200
      const expectedMessage = "User retrieved successfully"

      const response = await request(app).get(`/users/${sendedUserId}`).auth(accessToken, { type: 'bearer' });

      expect(response.status).toBe(expectedStatus);
      expect(response.body.data.name).toBe(testUser.name);
      expect(response.body.data.email).toBe(testUser.email);
      expect(response.body.message).toBe(expectedMessage);
    })

    it('Should return 404 when user not found', async () => {
      const sendedUserId = new Types.ObjectId();
      const expectedStatus = 404
      const expectedMessage = "User not found"

      const response = await request(app).get(`/users/${sendedUserId}`).auth(accessToken, { type: 'bearer' });

      expect(response.status).toBe(expectedStatus);
      expect(response.body.message).toBe(expectedMessage);
    })

  })
  describe('POST /users/', () => {

    beforeAll(async () => {
      await defineDefaultAccountTypes();
    })

    it('Should return 201 and create a new user', async () => {
      const sendedUser = {
        name: testUser.name+"2",
        email: testUser.email+"2",
        password: testUser.password
        }
      const expectedStatus = 201
      const expectedUser = {
        name: testUser.name+"2",
        email: testUser.email+"2"
      }
      const expectedMessage = "User created successfully"

      const response = await request(app)
        .post('/users/')
        .send(sendedUser).auth(accessToken, { type: 'bearer' });

      expect(response.status).toBe(expectedStatus);
      expect(response.body.data).toMatchObject(expectedUser);
      expect(response.body.message).toBe(expectedMessage);
    })
    it('Should return 400 when a field is missing', async () => {
      const sendedUser = {
        email: testUser.email+"3",
        password: testUser.password
        }
      const expectedStatus = 400
      const expectedMessage = "Fiels name, email, and password are required"

      const response = await request(app)
        .post('/users/')
        .send(sendedUser).auth(accessToken, { type: 'bearer' });

      expect(response.status).toBe(expectedStatus);
      expect(response.body.message).toBe(expectedMessage);
    })
    it('Should return 409 duplicate user', async () => {
      const sendedUser = {
        name: testUser.name,
        email: testUser.email,
        password: testUser.password
      }
      const expectedStatus = 409
      const expectedMessage = "This email is already registered"

      const response = await request(app)
        .post('/users/')
        .send(sendedUser).auth(accessToken, { type: 'bearer' });

      expect(response.status).toBe(expectedStatus);
      expect(response.body.message).toBe(expectedMessage);
    })
  })
  describe('PUT /users/:id', () => {
    it('Should return 400 when name is missing', async () => {
      const senderUserId = testUser._id;
      const sendedUser = {}
      const expectedStatus = 400
      const expectedMessage = "Fields name, email, or password are required"

      const response = await request(app)
        .put(`/users/${senderUserId}`)
        .send(sendedUser).auth(accessToken, { type: 'bearer' });

      expect(response.status).toBe(expectedStatus);
      expect(response.body.message).toBe(expectedMessage);
    })
    it('Should return 400 when id is invalid', async () => {
      const senderUserId = "invalidUserId";
      const sendedUser = {}
      const expectedStatus = 400
      const expectedMessage = "Invalid ID"

      const response = await request(app)
        .put(`/users/${senderUserId}`)
        .send(sendedUser).auth(accessToken, { type: 'bearer' });

      expect(response.status).toBe(expectedStatus);
      expect(response.body.message).toBe(expectedMessage);
    })
    it('Should return 404 when user is not exist', async () => {
      const senderUserId = new Types.ObjectId();
      const sendedUser = {
         name: testUser.name+"5",
      }
      const expectedStatus = 404
      const expectedMessage = "User not found"

      const response = await request(app)
        .put(`/users/${senderUserId}`)
        .send(sendedUser).auth(accessToken, { type: 'bearer' });

        expect(response.status).toBe(expectedStatus);
        expect(response.body.message).toBe(expectedMessage);
    })
    it('Should return 202 when user is updated successfully', async () => {
      const senderUserId = testUser._id;
      const sendedUser = {
         name: testUser.name+"5",
      }
      const expectedStatus = 202
      const expectedMessage = "User updated successfully"

      const response = await request(app)
        .put(`/users/${senderUserId}`)
        .send(sendedUser).auth(accessToken, { type: 'bearer' });

        expect(response.status).toBe(expectedStatus);
        expect(response.body.message).toBe(expectedMessage);
    })
  })
  describe('DELETE /users/:id', () => {
    it('Should return 400 when id is invalid', async () => {
      const senderUserId = "invalidUserId";
      const expectedStatus = 400
      const expectedMessage = "Invalid ID"

      const response = await request(app)
        .delete(`/users/${senderUserId}`)
        .auth(accessToken, { type: 'bearer' });

      expect(response.status).toBe(expectedStatus);
      expect(response.body.message).toBe(expectedMessage);
    })
    it('Should return 404 when user is not exist', async () => {
      const senderUserId = new Types.ObjectId();
      const expectedStatus = 404
      const expectedMessage = "User not found"

      const response = await request(app)
        .delete(`/users/${senderUserId}`)
        .auth(accessToken, { type: 'bearer' });

      expect(response.status).toBe(expectedStatus);
      expect(response.body.message).toBe(expectedMessage);
    })
    it('Should return 202 when user was deleted successfully', async () => {
      const senderUserId = testUser._id;
      const expectedStatus = 202
      const expectedMessage = "User deleted successfully"

      const response = await request(app)
        .delete(`/users/${senderUserId}`)
        .auth(accessToken, { type: 'bearer' });

      expect(response.status).toBe(expectedStatus);
      expect(response.body.message).toBe(expectedMessage);
    })
  })
})