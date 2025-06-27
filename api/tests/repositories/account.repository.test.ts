import { getAccountsByUserId, getTestAccounts } from "../../repositories/account.repository";
import { Account } from "../../models/Account.model";

jest.mock("../../models/Account.model");

jest.mock('../../lib/mongodb', () => {
  return {
    __esModule: true,
    default: jest.fn(() => Promise.resolve()),
  };
});

describe("getTestAccounts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an array of test accounts", () => {
    const mockAccounts = [{ 
      name: "Test Account",
      balance: 1000,
      accountType: "Savings", 
    }];

    const result = getTestAccounts();

    expect(result).toEqual(mockAccounts);
  })
})

describe("getAccountsByUserId", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return accounts for the given userId", async () => {
    const mockAccounts = [{ name: "Account A" }, { name: "Account B" }];

    const selectMock = jest.fn();
    const populateMock = jest.fn();

    selectMock.mockReturnValue({ populate: populateMock });
    populateMock.mockReturnValueOnce({ 
      populate: populateMock 
    }); 
    populateMock.mockReturnValueOnce(Promise.resolve(mockAccounts));

    (Account.find as jest.Mock).mockReturnValue({ select: selectMock });

    const result = await getAccountsByUserId("fakeUserId");

    expect(Account.find).toHaveBeenCalledWith({ userId: "fakeUserId", state: "active" });
    expect(result).toEqual(mockAccounts);
  });

  it("should throw an error if the database call fails", async () => {
    (Account.find as jest.Mock).mockImplementation(() => {
      throw new Error("Database error");
    });
    await expect(getAccountsByUserId("fakeUserId")).rejects.toThrow("Database error");
  });

  it("should throw an error if error occurs during chained calls (populate)", async () => {
    const selectMock = jest.fn();
    const populateMock = jest.fn();

    selectMock.mockReturnValue({ populate: populateMock });
    populateMock
      .mockImplementationOnce(() => ({ populate: populateMock }))
      .mockImplementationOnce(() => {
        throw new Error("Database error during populate");
      });

    (Account.find as jest.Mock).mockReturnValue({ select: selectMock });

    await expect(getAccountsByUserId("fakeUserId")).rejects.toThrow("Database error during populate");
  });
});