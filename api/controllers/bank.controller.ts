import { Request, Response } from 'express';
import connectToDatabase from "../lib/mongodb";
import { Bank } from '../models/Bank.model';

export const testBanks = (req: Request, res: Response) => {
  res.json([
    {
      data: {
        name: "Test Bank",
        description: "This is a test bank",
      },
      message: "Test Banks endpoint is working",
    },
  ]);
};

export const getBanks = async (req: Request, res: Response) => {
  const { user } = req as any;
  if (!user) {
    res.status(401).json({
      data: {},
      message: "Unauthorized access",
    });
    return;
  }
  try {
    await connectToDatabase();
    const banks = await Bank.find({ userId: user.id });

    res.json({
      data: banks,
      message: "Banks List retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Error retrieving banks list",
      error,
    });
  }
};

export const getBankById = async (req: Request, res: Response) => {
  const { user } = req as any;
  const bankId = req.params.id;

  if (!user) {
    res.status(401).json({
      data: {},
      message: "Unauthorized access",
    });
    return;
  }

  if (!bankId) {
    res.status(400).json({
      data: {},
      message: "Bank ID is required",
    });
    return;
  }

  try {
    await connectToDatabase();
    const bank = await Bank.findOne({ _id: bankId, userId: user.id });
    if (!bank) {
      res.status(404).json({
        data: {},
        message: "Bank not found",
      });
      return;
    }
    res.json({
      data: bank,
      message: "Bank retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Error retrieving bank",
      error,
    });
  }
};

export const createBank = async (req: Request, res: Response) => {
  const { user } = req as any;
  if (!user) {
    res.status(401).json({
      data: {},
      message: "Unauthorized access",
    });
    return;
  }

  const { name, logoUrl } = req.body;
  if (!name) {
    res.status(400).json({
      data: {},
      message: "Fields name and description are required",
    });
    return;
  }

  try {
    await connectToDatabase();
    const newBank = await Bank.create({
      userId: user.id,
      name,
      logoUrl
    });

    res.status(201).json({
      data: newBank,
      message: "Bank created successfully",
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Error creating bank",
      error,
    });
  }
};

export const updateBank = async (req: Request, res: Response) => {
  const { user } = req as any;
  const bankId = req.params.id;
  const { name, logoUrl } = req.body;

  if (!user) {
    res.status(401).json({
      data: {},
      message: "Unauthorized access",
    });
    return;
  }

  if (!bankId) {
    res.status(400).json({
      data: {},
      message: "Bank ID is required",
    });
    return;
  }

  try {
    await connectToDatabase();
    const updatedBank = await Bank.findOneAndUpdate(
      { _id: bankId, userId: user.id },
      { name, logoUrl },
      { new: true }
    );

    if (!updatedBank) {
      res.status(404).json({
        data: {},
        message: "Bank not found",
      });
      return;
    }

    res.json({
      data: updatedBank,
      message: "Bank updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Error updating bank",
      error,
    });
  }
};

export const deleteBank = async (req: Request, res: Response) => {
  const { user } = req as any;
  const bankId = req.params.id;

  if (!user) {
    res.status(401).json({
      data: {},
      message: "Unauthorized access",
    });
    return;
  }

  if (!bankId) {
    res.status(400).json({
      data: {},
      message: "Bank ID is required",
    });
    return;
  }

  try {
    await connectToDatabase();
    const deletedBank = await Bank.findOneAndDelete({ _id: bankId, userId: user.id });

    if (!deletedBank) {
      res.status(404).json({
        data: {},
        message: "Bank not found",
      });
      return;
    }

    res.json({
      data: deletedBank,
      message: "Bank deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Error deleting bank",
      error,
    });
  }
};