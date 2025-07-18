process.env.MONGODB_URI = "mongodb://fakeurl"; 
import { testAccountsController, getAccounts } from "../../../controllers/account.controller";
import * as accountService from "../../../services/account.service"; 

describe("account.controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  jest.mock('../../../lib/mongodb', () => {
    return {
      __esModule: true,
      default: jest.fn(() => Promise.resolve()),
    };
  });

  describe("testAccountsController", () => {
    it("should return test accounts response", () => {
      const mockResponse = [{ data: "test" }];
      jest.spyOn(accountService, "testAccounts").mockReturnValue(mockResponse as any);

      const req = {} as any;
      const res = {
        json: jest.fn(),
      } as any;

      testAccountsController(req, res);

      expect(accountService.testAccounts).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });
  });

  describe("getAccounts", () => {
    it("should return 401 if no user in request", async () => {
      const req = {} as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await getAccounts(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        data: [],
        message: "Unauthorized access",
      });
    });

    it("should return accounts for valid user", async () => {
      const mockAccounts = [{ name: "User Account" }];
      jest.spyOn(accountService, "getAccountsForUser").mockResolvedValue(mockAccounts as any);

      const req = {
        user: { id: "userId123" },
      } as any;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await getAccounts(req, res);

      expect(accountService.getAccountsForUser).toHaveBeenCalledWith("userId123");
      expect(res.json).toHaveBeenCalledWith({
        data: mockAccounts,
        message: "Accounts List retrieved successfully",
      });
    });

    it("should return error if service fails", async () => {
      jest.spyOn(accountService, "getAccountsForUser").mockRejectedValue(new Error("fail"));
      const req = {
        user: { id: "userId123" },
      } as any;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await getAccounts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        data: [],
        message: "Error retrieving accounts list",
      });
    });
  });
});
