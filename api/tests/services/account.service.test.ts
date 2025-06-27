process.env.MONGODB_URI = "mongodb://fakeurl"; 

import { testAccounts, getAccountsForUser } from "../../services/account.service";
import * as accountRepository from "../../repositories/account.repository"; 

jest.mock("../../repositories/account.repository"); 

describe("Account Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  jest.mock('../../lib/mongodb', () => {
    return {
      __esModule: true,
      default: jest.fn(() => Promise.resolve()),
    };
  });

  describe("testAccounts", () => {
    it("should return test accounts successfully", () => {
      const mockAccounts = [{ name: "Test Account" }];
      (accountRepository.getTestAccounts as jest.Mock).mockReturnValue(mockAccounts);

      const result = testAccounts();

      expect(accountRepository.getTestAccounts).toHaveBeenCalled();
      expect(result).toEqual(
        {
          data: mockAccounts,
          message: "Test Accounts endpoint is working.",
        },
      );
    });
  });

  describe("getAccountsForUser", () => {
    it("should return accounts when found", async () => {
      const mockAccounts = [{ name: "User Account" }];
      (accountRepository.getAccountsByUserId as jest.Mock).mockResolvedValue(mockAccounts);

      const result = await getAccountsForUser("userId123");

      expect(accountRepository.getAccountsByUserId).toHaveBeenCalledWith("userId123");
      expect(result).toEqual(mockAccounts);
    });

    it("should return a no accounts message when array is empty", async () => {
      (accountRepository.getAccountsByUserId as jest.Mock).mockResolvedValue([]);

      const result = await getAccountsForUser("userId123");

      expect(accountRepository.getAccountsByUserId).toHaveBeenCalledWith("userId123");
      expect(result).toEqual([]);
    });
  });
});
