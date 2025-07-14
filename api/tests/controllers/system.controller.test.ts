import { healthCheck, initializeApp } from "../../controllers/system.controller";
import { initializeSystem } from "../../services/system.service"; // necesario para el expect

jest.mock("../../services/system.service", () => ({
  initializeSystem: jest.fn().mockResolvedValue(undefined)
}));

describe('System.controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('HealthCheck', () => {
    it('should return a 200 status and a message', () => {
      const req = {} as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      const statusExpect = 200
      const responseExpect = {
        data: [],
        message: "Express on Vercel with TS."
      }

      healthCheck(req, res);

      expect(res.status).toHaveBeenCalledWith(statusExpect);
      expect(res.json).toHaveBeenCalledWith(responseExpect);
    });
  });

  describe('Initialize App', () => {
    it('should return pass result.', async () => {
      const req = {} as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      const statusExpect = 202
      const responseExpect = {
        data: [],
        message: "App initialized."
      }

      await initializeApp(req, res);

      expect(initializeSystem).toHaveBeenCalled(); // Verifica que se llamó
      expect(res.status).toHaveBeenCalledWith(statusExpect);
      expect(res.json).toHaveBeenCalledWith(responseExpect);
    });
  });
});
