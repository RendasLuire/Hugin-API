import request from 'supertest';
import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from 'mongoose';

jest.setTimeout(20000);

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

describe('System Integration - ', () => {
  describe('GET / - Health Check', () => {
    it('should returns 200 with expected message and empty data', async () => {
      const expectedStatus = 200
      const expectedBody = {
        data: [],
        message: "Express on Vercel with TS.",
      }

      const response = await request(app).get('/');

      expect(response.status).toBe(expectedStatus);
      expect(response.body).toEqual(expectedBody);
    })
  })

  describe('GET /initialize - App Initialization', () =>{
    it('should returns 202 with init message and empty data array', async () => {
      const expectedStatus = 202
      const expectedBody = {
        data: [],
        message: 'App initialized.',
      }

      const response = await request(app).get('/initialize');
      expect(response.status).toBe(expectedStatus);
      expect(response.body).toEqual(expectedBody);
    });
  })
});