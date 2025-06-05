import { Request, Response } from 'express';
import connectToDatabase from "../lib/mongodb";
import { AccountType } from '../models/AccountType.model';

export const testAccountTypes = (req: Request, res: Response) => {
  res.json([
    {
      data: {
        name: "Test Account Type",
        description: "This is a test account type"
      },
      message: "Test Account Types endpoint is working",
    }])
  }

  export const getAccountTypes = async (req: Request, res: Response) => {
    try {
      await connectToDatabase();
      const accountTypes = await AccountType.find().select('-createdAt -updatedAt -__v');

      res.json({
        data: accountTypes,
        message: "Account Types List retrieved successfully",
      });
    } catch (error) {
      res.status(500).json({
        data: {},
        message: "Error retrieving account types list",
        error
      });
    }
  }

  export const getAccountTypeById = async (req: Request, res: Response) => {
    const accountTypeId = req.params.id;
    if (!accountTypeId) {
      res.status(400).json({
        data: {},
        message: "Account Type ID is required",
      });
      return;
    }

    try {
      await connectToDatabase();
      const accountType = await AccountType.findById(accountTypeId).select('-createdAt -updatedAt -__v');
      if (!accountType) {
        res.status(404).json({
          data: {},
          message: "Account Type not found",
        });
        return;
      }
      res.json({
        data: accountType,
        message: "Account Type retrieved successfully",
      });
    } catch (error) {
      res.status(500).json({
        data: {},
        message: "Error retrieving account type",
        error
      });
    }
  }

export const createAccountType = async (req: Request, res: Response) => {
  const { name, description, key, icon, color } = req.body;
  if (!name || !description || !key) {
    res.status(400).json({
      data: {},
      message: "Fields name and description are required",
    });
    return;
  }

  try {
    await connectToDatabase();
    const newAccountType = new AccountType({ name, description, key, icon, color });
    await newAccountType.save();

    res.status(201).json({
      data: {
        id: newAccountType._id,
        name: newAccountType.name,
        description: newAccountType.description,
        key: newAccountType.key
      },
      message: "Account Type created successfully",
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Error creating account type",
      error
    });
  }
}

export const updateAccountType = async (req: Request, res: Response) => {
  const accountTypeId = req.params.id;
  const { name, description, key, icon, color } = req.body;

  if (!accountTypeId) {
    res.status(400).json({
      data: {},
      message: "Account Type ID is required",
    });
    return;
  }

  try {
    await connectToDatabase();

    const existingAccountType = await AccountType.findById(accountTypeId)
    if (!existingAccountType){
      res.status(400).json({
        data: {},
        message: "Account Type is not exist.",
      });
      return;
    }

    const newName = name || existingAccountType.name
    const newDescription = description || existingAccountType.description
    const newKey = key || existingAccountType.key
    const newIcon = icon || existingAccountType.icon
    const newColor = color || existingAccountType.color

    const updatedAccountType = await AccountType.findByIdAndUpdate(
      accountTypeId,
      { name: newName, description: newDescription, key: newKey, icon: newIcon, color: newColor },
      { new: true }
    ).select('-createdAt -updatedAt -__v');

    if (!updatedAccountType) {
      res.status(404).json({
        data: {},
        message: "Account Type not found",
      });
      return;
    }

    res.json({
      data: updatedAccountType,
      message: "Account Type updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Error updating account type",
      error
    });
  }
}

export const deleteAccountType = async (req: Request, res: Response) => {
  const accountTypeId = req.params.id;

  if (!accountTypeId) {
    res.status(400).json({
      data: {},
      message: "Account Type ID is required",
    });
    return;
  }

  try {
    await connectToDatabase();
    const deletedAccountType = await AccountType.findByIdAndDelete(accountTypeId);

    if (!deletedAccountType) {
      res.status(404).json({
        data: {},
        message: "Account Type not found",
      });
      return;
    }

    res.json({
      data: {
        id: deletedAccountType._id,
        name: deletedAccountType.name
      },
      message: "Account Type deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Error deleting account type",
      error
    });
  }
}
