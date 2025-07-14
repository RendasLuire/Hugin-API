import { defineDefaultAccountTypes } from "../../services/accountType.service"
import { initializeSystem } from "../../services/system.service"
import { createAdminUser } from "../../services/user.service"
import { loadNewUserData } from "../../services/userSetup.service"

jest.mock("../../services/accountType.service", () => ({
  defineDefaultAccountTypes: jest.fn(),
}));

jest.mock("../../services/user.service", () => ({
  createAdminUser: jest.fn(),
}));

jest.mock("../../services/userSetup.service", () => ({
  loadNewUserData: jest.fn(),
}));


describe('System.service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('initializeSystem()', () => {
    it('should return true if all steps complete successfully', async () => {
      (defineDefaultAccountTypes as jest.Mock).mockResolvedValue(true);
    (createAdminUser as jest.Mock).mockResolvedValue({ _id: "user123" });
    (loadNewUserData as jest.Mock).mockResolvedValue(true);
    const expectedResponse = true
    
    const response = await initializeSystem()
    
      expect.assertions(4);
      expect(defineDefaultAccountTypes).toHaveBeenCalled()
      expect(createAdminUser).toHaveBeenCalled()
      expect(loadNewUserData).toHaveBeenCalled()
      expect(response).toBe(expectedResponse)
    })

    it('should return false if defineDefaultAccountTypes fails', async () => {
       (defineDefaultAccountTypes as jest.Mock).mockResolvedValue(false);
       const expectedResponse = false

    const result = await initializeSystem();

    expect.assertions(3);
    expect(defineDefaultAccountTypes).toHaveBeenCalled();
    expect(createAdminUser).not.toHaveBeenCalled();
    expect(result).toBe(expectedResponse);
    })

    it("should return false if createAdminUser fails", async () => {
    (defineDefaultAccountTypes as jest.Mock).mockResolvedValue(true);
    (createAdminUser as jest.Mock).mockResolvedValue(null);
    const expectedResponse = false

    const result = await initializeSystem();

    expect.assertions(4);
    expect(defineDefaultAccountTypes).toHaveBeenCalled();
    expect(createAdminUser).toHaveBeenCalled();
    expect(loadNewUserData).not.toHaveBeenCalled();
    expect(result).toBe(expectedResponse);
  });

    it("should return false if loadNewUserData fails", async () => {
    (defineDefaultAccountTypes as jest.Mock).mockResolvedValue(true);
    (createAdminUser as jest.Mock).mockResolvedValue({ _id: "user123" });
    (loadNewUserData as jest.Mock).mockResolvedValue(null);
    const expectedResponse = false

    const result = await initializeSystem();

    expect.assertions(4);
    expect(defineDefaultAccountTypes).toHaveBeenCalled();
    expect(createAdminUser).toHaveBeenCalled();
    expect(loadNewUserData).toHaveBeenCalledWith("user123");
    expect(result).toBe(expectedResponse);
  });
  })
})