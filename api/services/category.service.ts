import { createCategory, getCategoryCount } from "../repositories/category.repository"


export const createDefaultCategory = async () => {
  const defaultCategory = {
    name: "common",
    classfication: "Optional"
  }

  const existCategorys = await getCategoryCount()

  if (existCategorys > 0) {
    return false
  }

  const newCategory = await createCategory(defaultCategory)

  if (!newCategory) {
    return false
  }

  return true
}