import { Request, Response } from "express";
import connectToDatabase from "../lib/mongodb";
import bcrypt from "bcryptjs";
import { User } from "../models/User.model";
import mongoose from "mongoose";
import { createInitUserData, deleteUserData } from "../utils/users";

export const testUsers = (req: Request, res: Response) => {
  res.json([
    {
      data: {
        id: 1,
        name: "John Doe",
        email: "JohnDoe@correo.com",
        passwordHash: "hashed_password_123",
        createdAt: new Date("2023-01-01T00:00:00Z"),
        updatedAt: new Date("2023-01-01T00:00:00Z"),
      },
      message: "Test Users endpoint is working",
    }
  ]);
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    await connectToDatabase();
    const users = await User.find().select("-passwordHash");
    res.json({
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
    await connectToDatabase();
    const user = await User.findById(userId).select("-passwordHash");
    if (!user) {
      res.status(404).json({ 
        data: {},
        message: "User not found" 
      });
    }
    res.json({
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
await connectToDatabase();
const existingUser = await User.findOne({ email });
if (existingUser) {
  res.status(400).json({
    data: {},
    message: "This email is already registered",
  });
}

const passwordHash = await bcrypt.hash(password, 10);
const newUser = new User({ name, email, passwordHash });
await newUser.save();

await createInitUserData(newUser._id);
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
  message: "Error creating user",
  error
});
}
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;
  let passwordHash
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ 
      data: {},
      message: "Invalid ID"
    });
  }
  if (!name && !email && !passwordHash) {
    res.status(400).json({
      data: {},
      message: "Fields name, email, and passwordHash are required",
    });
  }
try {
await connectToDatabase();
const existingUser = await User.findById(userId);
if (!existingUser) {
  res.status(404).json({
    data: {},
    message: "User not found",
  });
  return
}

if (password) {
passwordHash = await bcrypt.hash(password, 10)
}


const newName = name || existingUser.name;
const newEmail = email || existingUser.email;
const newPasswordHash = passwordHash || existingUser.passwordHash;

const updatedUser = await User.findByIdAndUpdate(
userId,
{ name:newName, email: newEmail, passwordHash: newPasswordHash },
{ new: true, runValidators: true }
);
if (!updatedUser) {
  res.status(404).json({
    data: {},
    message: "User not found",
  });
  return
}
res.json({
  data: {
    id: updatedUser._id,
    name: updatedUser.name
  },
  message: "User updated successfully",
});
} catch (error) {
res.status(500).json({
  data: {},
  message: "Error updating user",
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
await connectToDatabase();
const deletedUser = await User.findByIdAndDelete(userId);
if (!deletedUser) {
  res.status(404).json({
    data: {},
    message: "User not found",
  });
  return
}

await deleteUserData(deletedUser.id);

res.json({
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

