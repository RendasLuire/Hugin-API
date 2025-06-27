process.env.MONGODB_URI = "mongodb://fakeurl"; 
import request from "supertest";
import app from "../../index";

describe("Accounts Integration", () => {

  describe("GET /accounts/test", () => {
    it("should return a test message", async () => {
      const accountExpected =  [{
        name: "Test Account",
        balance: 1000,
        accountType: "Savings",
    }]
      const response = await request(app).get("/accounts/test");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        data: accountExpected,
        message: "Test Accounts endpoint is working.",
      });
    });
  })
  it("should return 401 if no user is present", async () => {
    const response = await request(app).get("/accounts");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      data: {},
      message: "No authorization header provided",
    });
  });
});
