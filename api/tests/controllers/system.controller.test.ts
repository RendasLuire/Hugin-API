process.env.MONGODB_URI = "mongodb://fakeurl"; 
import { healthCheck, initializeApp } from "../../controllers/system.controller";


describe('System.controller', () => {

describe('HealthCheck', () => {
  it('should return a 200 status and a message', () => {
    const req = {} as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    healthCheck(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: [],
      message: "Express on Vercel with TS",
    });
  });
})

describe('Initialize System', () => {
  it('should return a 200 status and a message', async () => {
    const req = {} as any;
    const res = {} as any;
    const expectedResponse = {
      data: [],
      message: "App initialized successfully",
    };

    await initializeApp(req, res);

  })
})

})