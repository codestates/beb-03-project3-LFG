import { Trade } from '../db/trade';
import {NextFunction, Request, Response} from "express";

export const offerTrades = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userAddress } = req.body;
    const offerList = await Trade.find({ offerAddress: userAddress.toLowerCase() });
    res.status(200).json({ message: 'succeed', offerList: offerList });
  } catch (error) {
    next(error);
  }
};

export const respondTrades = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userAddress } = req.body;
    const respondList = await Trade.find({ respondAddress: userAddress.toLowerCase() });
    res.status(200).json({ message: 'succeed', respondList: respondList });
  } catch (error) {
    next(error);
  }
};
