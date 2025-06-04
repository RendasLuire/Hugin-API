import { Request, Response } from 'express';
import connectToDatabase from "../lib/mongodb";
import { Account } from '../models/Account.model';

export const testAccounts = (req: Request, res: Response) => {
  res.json([
    {
      data: {
        name: "Test Account",
        balance: 1000,
        accountType: "Savings",
      },
      Message: "Test Accounts endpoint is working",
    },
  ])
}

export const getAccounts = async (req: Request, res: Response) => {
  const { user } = req as any;

  if (!user) {
    res.status(401).json({
      data: {},
      message: "Unauthorized access",
    });
    return
  }

  try {
    await connectToDatabase();
    const accounts = await Account.find({userId: user.id});

    res.json({
      data: accounts,
      message: "Accounts List retrieved successfully",
    })
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Error retrieving accounts list",
    })
  }
}

export const getAccountById = async (req: Request, res: Response) => {
  const { user } = req as any;
  const accountId = req.params.id;

  if (!user) {
    res.status(401).json({
      data: {},
      message: "Unauthorized access",
    });
    return
  }

  if (!accountId) {
    res.status(400).json({
      data: {},
      message: "Account ID is required",
    });
    return
  }

  try {
    await connectToDatabase();
    const account = await Account.findOne({ _id: accountId, userId: user.id });

    if (!account) {
      res.status(404).json({
        data: {},
        message: "Account not found",
      });
      return
    }

    res.json({
      data: account,
      message: "Account retrieved successfully",
    })
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Error retrieving account",
    })
  }
}

export const createAccount = async (req: Request, res: Response) => {
  const { user } = req as any;
  const { name, bankId, accountTypeId, balance, limit, cutDay, payDay } = req.body;

  if (!user) {
    res.status(401).json({
      data: {},
      message: "Unauthorized access",
    });
    return
  }

  if (!name || !bankId || !accountTypeId) {
    res.status(400).json({
      data: {},
      message: "Fields name, bankId, and accountTypeId are required",
    });
    return
  }

  try {
    await connectToDatabase();
    const newAccount = new Account({
      name,
      bankId,
      accountTypeId,
      balance,
      limit: limit,
      cutDay: cutDay,
      payDay: payDay,
      userId: user.id,
    });

    await newAccount.save();

    res.status(201).json({
      data: {
        id: newAccount._id,
        name: newAccount.name,
        balance: newAccount.balance
      },
      message: "Account created successfully",
    })
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Error creating account",
    })
  }
}

export const updateAccount = async (req: Request, res: Response) => {
  const { user } = req as any;
  const accountId = req.params.id;
  const { name, bankId, accountTypeId, balance, limit, cutDay, payDay } = req.body;

  if (!user) {
    res.status(401).json({
      data: {},
      message: "Unauthorized access",
    });
    return
  }

  if (!accountId) {
    res.status(400).json({
      data: {},
      message: "Account ID is required",
    });
    return
  }

  try {
    await connectToDatabase();
    const updatedAccount = await Account.findOneAndUpdate(
      { _id: accountId, userId: user.id },
      { name, bankId, accountTypeId, balance, limit, cutDay, payDay },
      { new: true, runValidators: true }
    );

    if (!updatedAccount) {
      res.status(404).json({
        data: {},
        message: "Account not found",
      });
      return
    }

    res.json({
      data: updatedAccount,
      message: "Account updated successfully",
    })
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Error updating account",
    })
  }
}

export const deleteAccount = async (req: Request, res: Response) => {
  const { user } = req as any;
  const accountId = req.params.id;

  if (!user) {
    res.status(401).json({
      data: {},
      message: "Unauthorized access",
    });
    return
  }

  if (!accountId) {
    res.status(400).json({
      data: {},
      message: "Account ID is required",
    });
    return
  }

  try {
    await connectToDatabase();
    const deletedAccount = await Account.findOneAndDelete({ _id: accountId, userId: user.id });

    if (!deletedAccount) {
      res.status(404).json({
        data: {},
        message: "Account not found",
      });
      return
    }

    res.json({
      data: deletedAccount,
      message: "Account deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Error deleting account",
    })
  }
}
