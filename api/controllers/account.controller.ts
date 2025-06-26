import { Request, Response } from 'express';
import connectToDatabase from "../lib/mongodb";
import { Account } from '../models/Account.model';
import { Bank } from '../models/Bank.model'
import { AccountType } from '../models/AccountType.model';
import { testAccounts } from '../services/account.service';

export const testAccountsController = (req: Request, res: Response) => {
  const response = testAccounts();
  res.json(response);
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
    const accounts = await Account.find({ userId: user.id, state: "active" })
  .select('-__v -userId -updatedAt -state -deletedAt')
  .populate({
    path: 'bankId',
    select: 'name logoUrl'
  })
  .populate({
    path: 'accountTypeId',
    select: 'name key icon color'
  });


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
    const account = await Account.findOne({ _id: accountId, userId: user.id, state: "active" }).select('-__v -userId -updatedAt -state -deletedAt')
    .populate({
      path: 'bankId',
      select: 'name logoUrl'
    })
    .populate({
      path: 'accountTypeId',
      select: 'name key icon color'
    });

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
  let { name, bankId, accountTypeId, balance, limit, cutDay, payDay } = req.body;

  if (!user) {
    res.status(401).json({
      data: {},
      message: "Unauthorized access",
    });
    return
  }

  if (!name) {
    res.status(400).json({
      data: {},
      message: "Field name are required",
    });
    return
  }

  try {
    await connectToDatabase();

    if (!bankId) {
      const bank = await Bank.findOne({name: "Testamento"})
      if (!bank) {
        res.status(400).json({
          data: {},
          message: "Field bank are required",
        });
        return
      }
      bankId = bank._id 
    }

    if (!accountTypeId) {
      const accountType = await AccountType.findOne({key: "wandering_shadow"})
      if (!accountType) {
        res.status(400).json({
          data: {},
          message: "Field accountType are required",
        });
        return
      }
      accountTypeId = accountType._id
    }

    const accountTypeValidate = await AccountType.findById(accountTypeId)

    if (accountTypeValidate  && accountTypeValidate.key == "primigenius"){
      res.status(400).json({
        data: {},
        message: "A traveler can only possess one Arca Primordial.",
      });
      return
    }

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

    const existingAccount = await Account.findOne({_id: accountId, userId: user.id, state: "active"})

    if (!existingAccount) {
      res.status(400).json({
        data: {},
        message: "Account is not exist",
      });
      return
    }

    
    
    const newName = name || existingAccount.name
    const newAccountTypeId = accountTypeId || existingAccount.accountTypeId
    const newBalance = balance || existingAccount.balance
    const newLimit = limit || existingAccount.balance
    const newCutDay = cutDay || existingAccount.cutDay
    const newPayDay = payDay || existingAccount.payDay

    const accountTypeValidate = await AccountType.findById(newAccountTypeId)

    if (!accountTypeValidate){
      res.status(400).json({
        data: {},
        message: "This accountType not exist.",
      });
      return
    }

    if (accountTypeValidate && accountTypeValidate.key == "primigenius") {
      res.status(400).json({
        data: {},
        message: "A traveler can only possess one Arca Primordial.",
      });
      return
    }

    const updatedAccount = await Account.findOneAndUpdate(
      { _id: accountId, userId: user.id, state: "active" },
      { name: newName, 
        bankId, 
        accountTypeId: newAccountTypeId, 
        balance: newBalance, 
        limit: newLimit, 
        cutDay: newCutDay, 
        payDay: newPayDay },
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
      data: {
        id: updatedAccount._id,
        name: updatedAccount.name
      },
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

    const acconuntValidate = await Account.findById(accountId)
    if(!acconuntValidate){
      res.status(400).json({
        data: {},
        message: "Account is not exist",
      });
      return
    }
    const accountTypeValidate = await AccountType.findById(acconuntValidate.accountTypeId)

    if (accountTypeValidate  && accountTypeValidate.key == "primigenius"){
      res.status(400).json({
        data: {},
        message: "A traveler can only possess one Arca Primordial.",
      });
      return
    }
    
    const deletedAccount = await Account.findOneAndUpdate(
      { _id: accountId, userId: user.id, state: "active" }, 
      { state: 'deleted', deletedAt: new Date() }, 
      { new: true, runValidators: true });

    if (!deletedAccount) {
      res.status(404).json({
        data: {},
        message: "Account not found",
      });
      return
    }

    res.json({
      data: {
        id: deletedAccount._id,
        name: deletedAccount.name,
        deletedAt: deletedAccount.deletedAt
      },
      message: "Account deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      data: {},
      message: "Error deleting account",
    })
  }
}
