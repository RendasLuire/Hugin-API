import { createCategory, getCategoryById, getCategoryCount, getTestCategory } from "../../../repositories/category.repository";
import { Category } from "../../../models/Category.model";

jest.mock("../../../models/Category.model")


describe('Category Repository Tests', () => {
  describe('getTestCategory', () => {
    it('should return a test category', () => {
      const expectedCategory = [
        {
          name: "Test Category",
          classification: "Optional"
        }
      ];
      const category = getTestCategory();
      expect(category).toEqual(expectedCategory);
    });
  })
  describe('getCategoryCount', () => {
    it('should return the count of categories', async () => {
      const mockCount = 10;
      (Category.countDocuments as jest.Mock).mockResolvedValue(mockCount);

      const count = await getCategoryCount();

      expect(Category.countDocuments).toHaveBeenCalled();
      expect(count).toBe(mockCount);
    });
  })
  describe('getCategoryById', () => {
    it('should return a category by ID', async () => {
      const mockCategoryId = "60c72b2f9b1d8c001c8e4f1a";
      const mockCategory = new Category({ _id: mockCategoryId, name: "Test Category" });
      (Category.findById as jest.Mock).mockResolvedValue(mockCategory);

      const category = await getCategoryById(mockCategoryId);

      expect(Category.findById).toHaveBeenCalledWith(mockCategoryId);
      expect(category).toEqual(mockCategory);
    });
  })
  describe('createCategory', () => {
    it('should create a new category', async () => {
      const mockCategoryData = { name: "New Category", classification: "Optional" };
      const mockCategory = new Category(mockCategoryData);
      (Category.prototype.save as jest.Mock).mockResolvedValue(mockCategory);

      const category = await createCategory(mockCategoryData);

      expect(Category.prototype.save).toHaveBeenCalled();
      expect(category).toEqual(mockCategory);
    });
  })
})