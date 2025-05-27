import { Schema, model, Types } from "mongoose";

const SubCategorySchema = new Schema({
  name: { type: String, required: true },
  classification: { 
    type: String, 
    enum: ["Necessary", "Desirable", "Optional", "Unnecessary", "Bad"], 
    required: true 
  }
}, { _id: true });

const CategorySchema = new Schema({
  name: { type: String, required: true },
  subCategories: [SubCategorySchema]
});

export const Category = model("Category", CategorySchema);
