import { Response } from "express";
import { healthCheck, initializeApp } from "../../../controllers/system.controller";
import { initializeSystem } from "../../../services/system.service";

jest.mock("../../../services/system.service", () => ({
  initializeSystem: jest.fn().mockResolvedValue(undefined),
}));

const mockRes = (): Partial<Response> => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
});

describe('System.controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('healthCheck()', () => {
    it('should respond with 200 and expected message', () => {
      const req = {} as any;
      const res = mockRes() as Response;

      const expectedStatus = 200;
      const expectedResponse = {
        data: [],
        message: "Express on Vercel with TS.",
      };

      healthCheck(req, res);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });

  describe('initializeApp()', () => {
    it('should initialize the app and respond with 202 and message', async () => {
      expect.assertions(3);

      const req = {} as any;
      const res = mockRes() as Response;

      const expectedStatus = 202;
      const expectedResponse = {
        data: [],
        message: "App initialized.",
      };

      await initializeApp(req, res);

      expect(initializeSystem).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
    it('should initialize the app and respond with 200 and message', async () => {
      expect.assertions(3);

      const req = {} as any;
      const res = mockRes() as Response;

      const expectedStatus = 200;
      const expectedResponse = {
        data: [],
        message: "System has been initialized.",
      };

      await initializeApp(req, res);

      expect(initializeSystem).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});
