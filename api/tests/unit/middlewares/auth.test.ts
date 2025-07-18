import { authMiddleware } from "../../../middlewares/auth";
import jwt from "jsonwebtoken";

describe("Auth Middleware", () => {
  it("should return 401 if no authorization header is provided", () => {
    const req = { headers: {} } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      data: [],
      message: "No authorization header provided",
    });
  });

  it("should return 401 if token is invalid", () => {
    const req = { headers: { authorization: "Bearer invalid token" } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      data: [],
      message: "Invalid or expired token",
    });
  });

  it("should call next if token is valid", () => {
    const validUser = { userId: "user123", email: "test@example.com" };
    const userExpected = { id: "user123", email: "test@example.com" };
    const token = jwt.sign(validUser, "secreto");
  
    const req = {
      headers: { authorization: `Bearer ${token}` },
    } as any;
  
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;
  
    const next = jest.fn();
  
    authMiddleware(req, res, next);
  
    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual(expect.objectContaining(userExpected));
  });
});