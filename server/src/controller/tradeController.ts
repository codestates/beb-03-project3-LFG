import { Trade } from '../db/trade';
import {NextFunction, Request, Response} from "express";
import {badRequest, internal} from "../error/apiError";

export const offerTrades = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userAddress } = req.body;
    if(!userAddress){
      next(badRequest("user field is required"));
    }
    const offerList = await Trade.find({ offerAddress: userAddress.toLowerCase() });
    res.status(200).json({ message: 'succeed', offerList: offerList });
  } catch (error) {
    if(error){
      next(internal('cannot fetch offer'));
    }
  }
};

export const respondTrades = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userAddress } = req.body;
    if(!userAddress){
      next(badRequest("user field is required"));
    }
    const respondList = await Trade.find({ respondAddress: userAddress.toLowerCase() });
    res.status(200).json({ message: 'succeed', respondList: respondList });
  } catch (error) {
    if(error){
      next(internal('cannot fetch offer'));
    }
  }
};
