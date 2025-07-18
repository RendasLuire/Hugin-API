import { createAccountType, getAccountTypeByKey, getAccountTypeCount } from "../../../repositories/accountType.repository"
import { checkPrimigeniusAccountType, defineDefaultAccountTypes } from "../../../services/accountType.service"

jest.mock("../../../repositories/accountType.repository", () => ({
  getAccountTypeCount: jest.fn(),
  createAccountType: jest.fn(),
  getAccountTypeByKey: jest.fn()
}))


describe('AccountType.service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('defineDefaultAccountTypes()', () => {
    it('Should return true after create default types.', async () => {
      (getAccountTypeCount as jest.Mock).mockResolvedValue(0)
      const expectedResponse = true

      const response = await defineDefaultAccountTypes()

      expect.assertions(4);
      expect(getAccountTypeCount).toHaveBeenCalled()
      expect(createAccountType).toHaveBeenCalled()
      expect(createAccountType).toHaveBeenCalledTimes(6)
      expect(response).toBe(expectedResponse)
    })

    it('Should return false when account type already exist.', async () => {
      (getAccountTypeCount as jest.Mock).mockResolvedValue(1)
      const expectedResponse = false

      const response = await defineDefaultAccountTypes()

      expect.assertions(3);
      expect(getAccountTypeCount).toHaveBeenCalled()
      expect(createAccountType).not.toHaveBeenCalled()
      expect(response).toBe(expectedResponse)
    })

  })

  describe('checkPrimigeniusAccountType()', () => {
    it('Should return false when primigeniusType not exist.', async () => {
      (getAccountTypeByKey as jest.Mock).mockResolvedValue(undefined)
      const expectedResponse = false

      const response = await checkPrimigeniusAccountType()

      expect.assertions(3);
      expect(getAccountTypeByKey).toHaveBeenCalled()
      expect(getAccountTypeByKey).toHaveBeenCalledWith("primigenius")
      expect(response).toBe(expectedResponse)
    })

    it('Should return primigenius type.', async () => {
      const primigeniusType = {
        key: "primigenius",
        name: "Raíz de Yggdrasil",
        description:
          "El pilar inmutable que sostiene los mundos. Aquí yace la esencia primordial, el origen sin forma pero con peso.",
        icon: "tree-icon.svg",
        color: "#4A7729",
    } as any

  (getAccountTypeByKey as jest.Mock).mockResolvedValue(primigeniusType)
      const expectedResponse = primigeniusType

      const response = await checkPrimigeniusAccountType()

      expect.assertions(3);
      expect(getAccountTypeByKey).toHaveBeenCalled()
      expect(getAccountTypeByKey).toHaveBeenCalledWith("primigenius")
      expect(response).toBe(expectedResponse)
    })

  })
})