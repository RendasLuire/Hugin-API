import { Request, Response } from "express";
import { User } from "../models/User.model";
import mongoose from "mongoose";

export const testUsers = (req: Request, res: Response) => {
  res.json([
    {
      id: 1,
      name: "John Doe",
      email: "JohnDoe@correo.com",
      passwordHash: "hashed_password_123",
      createdAt: new Date("2023-01-01T00:00:00Z"),
      updatedAt: new Date("2023-01-01T00:00:00Z"),
    }
  ]);
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};


export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: "ID no válido" });
    }
    const user = await User.findById(userId);
    if (!user) res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario", error });
  }
};

export const createUser = async (req: Request, res: Response) => {
try {
const { name, email, passwordHash } = req.body;
const existingUser = await User.findOne({ email });
if (existingUser) res.status(400).json({ message: "El correo ya está en uso" });

const newUser = new User({ name, email, passwordHash });
await newUser.save();
res.status(201).json(newUser);
} catch (error) {
res.status(500).json({ message: "Error al crear usuario", error });
}
};

export const updateUser = async (req: Request, res: Response) => {
try {
const { name, email, passwordHash } = req.body;
const updatedUser = await User.findByIdAndUpdate(
req.params.id,
{ name, email, passwordHash },
{ new: true, runValidators: true }
);
if (!updatedUser) res.status(404).json({ message: "Usuario no encontrado" });
res.json(updatedUser);
} catch (error) {
res.status(500).json({ message: "Error al actualizar usuario", error });
}
};


export const deleteUser = async (req: Request, res: Response) => {
try {
const deletedUser = await User.findByIdAndDelete(req.params.id);
if (!deletedUser) res.status(404).json({ message: "Usuario no encontrado" });
res.json({ message: "Usuario eliminado correctamente" });
} catch (error) {
res.status(500).json({ message: "Error al eliminar usuario", error });
}
};

