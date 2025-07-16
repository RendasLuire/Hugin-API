import { getUserById } from "../../repositories/user.repository"
import { createInitialAccount, deleteAccountsByUser } from "../../services/account.service"
import { checkPrimigeniusAccountType } from "../../services/accountType.service"
import { createDefaultBank, deleteBankByUser } from "../../services/bank.service"
import { deleteUserData, loadNewUserData } from "../../services/userSetup.service"

jest.mock("../../services/accountType.service", () => ({
  checkPrimigeniusAccountType: jest.fn()
}))

jest.mock("../../services/bank.service", () => ({
  createDefaultBank: jest.fn(),
  deleteBankByUser: jest.fn()
}))

jest.mock("../../services/account.service", () => ({
  createInitialAccount: jest.fn(),
  deleteAccountsByUser: jest.fn()
}))

jest.mock("../../repositories/user.repository", () => ({
  getUserById: jest.fn()
}))

describe('UserSetup.service', () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('loadNewUserData()', () => {
    it('Should return true when data loaded successfully.', async () => {
      (getUserById as jest.Mock).mockResolvedValue({"algo": "algo"});
      (checkPrimigeniusAccountType as jest.Mock).mockResolvedValue({"algo": "algo"});
      (createDefaultBank as jest.Mock).mockResolvedValue({"algo": "algo"});
      (createInitialAccount as jest.Mock).mockResolvedValue({"algo": "algo"});

      const userId = ""
      const expectedResponse = true

      const response = await loadNewUserData(userId)

      expect.assertions(5);
      expect(getUserById).toHaveBeenCalled()
      expect(checkPrimigeniusAccountType).toHaveBeenCalled()
      expect(createDefaultBank).toHaveBeenCalled()
      expect(createInitialAccount).toHaveBeenCalled()
      expect(response).toBe(expectedResponse)
    })

    it('Should return false when user not exist.', async () => {
      (getUserById as jest.Mock).mockResolvedValue(undefined);

      const userId = ""
      const expectedResponse = false

      const response = await loadNewUserData(userId)

      expect.assertions(5);
      expect(getUserById).toHaveBeenCalled()
      expect(checkPrimigeniusAccountType).not.toHaveBeenCalled()
      expect(createDefaultBank).not.toHaveBeenCalled()
      expect(createInitialAccount).not.toHaveBeenCalled()
      expect(response).toBe(expectedResponse)
    })

    it('Should return false when primigenius type not exist.', async () => {
      (getUserById as jest.Mock).mockResolvedValue({"algo": "algo"});
      (checkPrimigeniusAccountType as jest.Mock).mockResolvedValue(undefined);
      const userId = ""
      const expectedResponse = false

      const response = await loadNewUserData(userId)

      expect.assertions(5);
      expect(getUserById).toHaveBeenCalled()
      expect(checkPrimigeniusAccountType).toHaveBeenCalled()
      expect(createDefaultBank).not.toHaveBeenCalled()
      expect(createInitialAccount).not.toHaveBeenCalled()
      expect(response).toBe(expectedResponse)
    })

    it('Should return false when creation default bank fail.', async () => {
      (getUserById as jest.Mock).mockResolvedValue({"algo": "algo"});
      (checkPrimigeniusAccountType as jest.Mock).mockResolvedValue({"algo": "algo"});
      (createDefaultBank as jest.Mock).mockResolvedValue(undefined);

      const userId = ""
      const expectedResponse = false

      const response = await loadNewUserData(userId)

      expect.assertions(5);
      expect(getUserById).toHaveBeenCalled()
      expect(checkPrimigeniusAccountType).toHaveBeenCalled()
      expect(createDefaultBank).toHaveBeenCalled()
      expect(createInitialAccount).not.toHaveBeenCalled()
      expect(response).toBe(expectedResponse)
    })

    it('Should return false when creation default account fail.', async () => {
      (getUserById as jest.Mock).mockResolvedValue({"algo": "algo"});
      (checkPrimigeniusAccountType as jest.Mock).mockResolvedValue({"algo": "algo"});
      (createDefaultBank as jest.Mock).mockResolvedValue({"algo": "algo"});
      (createInitialAccount as jest.Mock).mockResolvedValue(undefined);

      const userId = ""
      const expectedResponse = false

      const response = await loadNewUserData(userId)

      expect.assertions(5);
      expect(getUserById).toHaveBeenCalled()
      expect(checkPrimigeniusAccountType).toHaveBeenCalled()
      expect(createDefaultBank).toHaveBeenCalled()
      expect(createInitialAccount).toHaveBeenCalled()
      expect(response).toBe(expectedResponse)
    })
  })

  describe('deleteUserData()', () => {
    it('Should return true when user info deleted successfully.', async () => {
      const userId = ""
      const expectedResponse = true

      const response = await deleteUserData(userId)

      expect.assertions(3)
      expect(deleteAccountsByUser).toHaveBeenCalled()
      expect(deleteBankByUser).toHaveBeenCalled()
      expect(response).toBe(expectedResponse)
    })

    it('Should return false if deleteBankByUser throws an error.', async () => {
      (deleteAccountsByUser as jest.Mock).mockResolvedValue(true);
      (deleteBankByUser as jest.Mock).mockRejectedValue(new Error("DB error"));

      const userId = "user123"
      const expectedResponse = false

      const response = await deleteUserData(userId);

      expect.assertions(3);
      expect(deleteAccountsByUser).toHaveBeenCalled();
      expect(deleteBankByUser).toHaveBeenCalled();
      expect(response).toBe(expectedResponse);
    })
  })  
})