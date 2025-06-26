import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Account } from "../../models/Account.model";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Account.deleteMany({});
});

describe("Account Model", () => {
  jest.setTimeout(30000);

  it("should create & save an account successfully", async () => {
    const validAccount = new Account({
      userId: new mongoose.Types.ObjectId(),
      name: "Test Account",
      accountTypeId:  new mongoose.Types.ObjectId(),
    });
    const savedAccount = await validAccount.save();

    expect(savedAccount._id).toBeDefined();
    expect(savedAccount.name).toBe("Test Account");
    expect(savedAccount.balance).toBe(0);
    expect(savedAccount.limit).toBe(0);
    expect(savedAccount.nextPay).toBe(0);
  });

  it("should fail when required fields are missing", async () => {
    const invalidAccount = new Account({ balance: 1000 });

    await expect(invalidAccount.save()).rejects.toMatchObject({
      errors: expect.objectContaining({
        name: expect.anything(),
        userId: expect.anything(),
        accountTypeId: expect.anything(),
      }),
    });
  });

  it("should fail if state is invalid", async () => {
    const invalidAccount = new Account({
      userId: new mongoose.Types.ObjectId(),
      name: "Test Account",
      accountTypeId:  new mongoose.Types.ObjectId(),
      state: "invalid_state",
    });

    await expect(invalidAccount.save()).rejects.toMatchObject({
      errors: expect.objectContaining({
        state: expect.anything(),
      }),
    });
  });
});
