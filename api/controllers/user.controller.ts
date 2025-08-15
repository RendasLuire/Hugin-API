import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { createNewUser, deleteUserInfo, existingUser, getInfoUserById, getUsersList, updateUser} from "../services/user.service";
import { User } from "../models/User.model";
 
export const testUsers = (req: Request, res: Response) => {
  res.status(202).json(
    {
      data: [{
        id: 1,
        name: "John Doe",
        email: "JohnDoe@correo.com",
        passwordHash: "hashed_password_123",
        createdAt: new Date("2023-01-01T00:00:00Z"),
        updatedAt: new Date("2023-01-01T00:00:00Z"),
      }],
      message: "Test Users endpoint is working",
    }
  );
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsersList();
    res.status(200).json({
      data: users,
      message: "Users List retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Error retrieving users list", 
      error 
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ 
      data: {},
      message: "Invalid ID"
    });
  }
  try {
    const user = await getInfoUserById(userId);
    if (!user) {
      res.status(404).json({ 
        data: {},
        message: "User not found" 
      });
    }
    res.status(200).json({
      data: user,
      message: "User retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Error retrieving user",
      error 
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({
      data: {},
      message: "Fiels name, email, and password are required",
    });
  }
  try {
    const alreadyUserExist = await existingUser(email);

    if (alreadyUserExist) {
      res.status(409).json({
        data: {},
        message: "This email is already registered",
      });
    }

    const newUser = await createNewUser({ name, email, passwordHash: password });

    if (!newUser) {
      res.status(500).json({
        data: {},
        message: "Error creating user",
      });
    }

    res.status(201).json({
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Error creating user.",
      error
    });
  }
};

export const updateUserInfo = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;
 
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ 
      data: {},
      message: "Invalid ID"
    });
  }
  
  if (!name && !email && !password) {
    res.status(400).json({
      data: {},
      message: "Fields name, email, and password are required",
    });
  }
  try {
    const userData = await getInfoUserById(userId);
    if (!userData) {
      res.status(404).json({
        data: {},
        message: "User not found",
      });
    }

    const updatedData: Partial<User> = {};
    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (password) updatedData.passwordHash = await bcrypt.hash(password, 10);

    const updatedUser = await updateUser(userId, updatedData);
    if (!updatedUser) {
      res.status(500).json({
        data: {},
        message: "Error updating user",
      });
    }

    res.status(200).json({
      data: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
      message: "User updated successfully",
    });


  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Error retrieving user",
      error
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
const userId = req.params.id;
if (!mongoose.Types.ObjectId.isValid(userId)) {
  res.status(400).json({ 
    data: {},
    message: "Invalid ID"
  });
}
try {
const deletedUser = await deleteUserInfo(userId);

if (!deletedUser) {
  res.status(404).json({
    data: {},
    message: "User not found",
  });
  return
}

res.status(202).json({
  data: {
    id: deletedUser._id,
    name: deletedUser.name
  },
  message: "User deleted successfully",
});

} catch (error) {
res.status(500).json({
  data: {},
  message: "Error deleting user",
  error
});
}
};

