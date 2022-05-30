import { Loan } from '../db/loan';
import {NextFunction, Request, Response} from "express";

export const getHistory = async (req: Request, res: Response, next: NextFunction) => {
  const historyList = await Loan.find({
    $or: [{ status: 'FUNDED' }, { status: 'PAIDBACK' }, { status: 'DEFAULTED' }],
  });
  console.log(historyList);
  console.log('getHistory');
  res.status(200).json({ message: 'succeed', historyList });
};
