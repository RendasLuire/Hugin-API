import { getUserCount, createUser, getAdminUser, getUserById } from "../../../repositories/user.repository"
import { User } from "../../../models/User.model";

jest.mock("../../../models/User.model")

jest.mock('../../../lib/mongodb', () => {
  return {
    __esModule: true,
    default: jest.fn(() => Promise.resolve()),
  };
});

describe('User Repository Tests', () => {
  describe('getUserCount', () => {
    it('should return the count of users', async () => {
      const mockCount = 5;
      (User.countDocuments as jest.Mock).mockResolvedValue(mockCount);
 
      const count = await getUserCount();

      expect(User.countDocuments).toHaveBeenCalled();
      expect(count).toBe(mockCount);
    });
  })
  describe('createUser', () => {
    it('should create a new user', async () => {
      const mockUserData = { name: "Test User", email: "", passwordHash: "hashedPassword" };
      const mockUser = new User(mockUserData);
      (User.prototype.save as jest.Mock).mockResolvedValue(mockUser);

      const user = await createUser(mockUserData);

      expect(User.prototype.save).toHaveBeenCalled();
      expect(user).toEqual(mockUser);
    });
  })
  describe('getAdminUser', () => {
    it('should return the admin user', async () => {
      const mockAdminUser = new User({ name: "Admin", role: "admin" });
      (User.findOne as jest.Mock).mockResolvedValue(mockAdminUser);

      const adminUser = await getAdminUser();

      expect(User.findOne).toHaveBeenCalledWith({ role: "admin" });
      expect(adminUser).toEqual(mockAdminUser);
    });
  })
  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const mockUserId = "60c72b2f9b1d8c001c8e4f1a";
      const mockUser = new User({ _id: mockUserId, name: "Test User" });
      (User.findById as jest.Mock).mockResolvedValue(mockUser);

      const user = await getUserById(mockUserId);

      expect(User.findById).toHaveBeenCalledWith(mockUserId);
      expect(user).toEqual(mockUser);
    });

    it('should throw an error if user not found', async () => {
      const mockUserId = "60c72b2f9b1d8c001c8e4f1a";
      (User.findById as jest.Mock).mockResolvedValue(null);

      await expect(getUserById(mockUserId)).rejects.toThrow("User not found");
    });
  });
})