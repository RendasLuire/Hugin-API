import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { Category } from "../../../models/Category.model";


let mongoServer: MongoMemoryServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()
  await mongoose.connect(uri)
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

afterEach(async () => {
  await Category.deleteMany({})
})

describe("Category Model", () => {
  it("should response successfully", async () => {
    expect(true).toBe(true)
  })
})