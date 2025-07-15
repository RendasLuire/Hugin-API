import { Category } from "../models/Category.model"

export const getTestCategory = () => {
  return [
    {
      name: "Test Category",
      classification: "Optional"
    }
  ]
}

export const getCategoryCount = async () => {
  const count = await Category.countDocuments()

  return count
}

export const getCategoryById = async (categoryId: string) => {
  const category = await Category.findById(categoryId)

  return category
}

export const createCategory = async (categoryData: Object) => {
  const category = await new Category(categoryData)
  const newCategory = await category.save()
  return newCategory
}