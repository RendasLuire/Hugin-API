import { createCategory, getCategoryCount } from "../../repositories/category.repository"
import { createDefaultCategory } from "../../services/category.service"

jest.mock("../../repositories/category.repository", () => ({
  getCategoryCount: jest.fn(),
  createCategory: jest.fn()
}))

describe('Category.service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('createDefaultCategory()', () => {
    it('Should return true when create default categories', async () => {
      (getCategoryCount as jest.Mock).mockResolvedValue(0);
      (createCategory as jest.Mock).mockResolvedValue({
        name: "common",
        classfication: "Optional"
      });
      const expectedResponse = true

      const response = await createDefaultCategory()

      expect.assertions(3)
      expect(getCategoryCount).toHaveBeenCalled()
      expect(createCategory).toHaveBeenCalled()
      expect(response).toBe(expectedResponse)
    })

    it('Should return false when categories already exist.', async () => {
      (getCategoryCount as jest.Mock).mockResolvedValue(1);
      const expectedResponse = false

      const response = await createDefaultCategory()

      expect.assertions(3)
      expect(getCategoryCount).toHaveBeenCalled()
      expect(createCategory).not.toHaveBeenCalled()
      expect(response).toBe(expectedResponse)
    })

    it('Should return false when create category fail.', async () => {
       (getCategoryCount as jest.Mock).mockResolvedValue(0);
      (createCategory as jest.Mock).mockResolvedValue(undefined);
      const expectedResponse = false

      const response = await createDefaultCategory()

      expect.assertions(3)
      expect(getCategoryCount).toHaveBeenCalled()
      expect(createCategory).toHaveBeenCalled()
      expect(response).toBe(expectedResponse)
    })
  })
})