import { createUser, getAdminUser } from "../../../repositories/user.repository"
import { createAdminUser } from "../../../services/user.service"

jest.mock("../../../repositories/user.repository", () => ({
  getAdminUser: jest.fn(),
  createUser: jest.fn()
}))

describe('User.service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('createAdminUser()', () => {
    it('Should return new admin user.', async() => {
      const adminUser = {
        name: "Admin",
        email: "admin@example.com"
      };
      (getAdminUser as jest.Mock).mockResolvedValue(undefined);
      (createUser as jest.Mock).mockResolvedValue(adminUser);
      const expectedResponse = adminUser

      const response = await createAdminUser()

      expect(getAdminUser).toHaveBeenCalled()
      expect(createUser).toHaveBeenCalled()
      expect(response).toBe(expectedResponse)
    })
    it('Should return false when admin user already exist.', async() => {
      (getAdminUser as jest.Mock).mockResolvedValue({"algo": "algo"});
      const expectedResponse = false

      const response = await createAdminUser()

      expect(getAdminUser).toHaveBeenCalled()
      expect(createUser).not.toHaveBeenCalled()
      expect(response).toBe(expectedResponse)
    })
    it('Should return false when create admin user fail.', async() => {
      (getAdminUser as jest.Mock).mockResolvedValue(undefined);
      (createUser as jest.Mock).mockResolvedValue(undefined)
      const expectedResponse = false

      const response = await createAdminUser()

      expect(getAdminUser).toHaveBeenCalled()
      expect(createUser).toHaveBeenCalled()
      expect(response).toBe(expectedResponse)
    })
  })
})