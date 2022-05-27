import { PointInfo } from '../db/pointInfo';
import {NextFunction, Request, Response} from "express";
import {badRequest, internal} from "../error/apiError";

export const userPoint = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userAddress } = req.body;
    if(!userAddress){
      next(badRequest("user field is required"));
    }

    const rawTotal = await PointInfo.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$accPoint' },
        },
      },
    ]);
    const responseRes = { message: 'succeed', votePoint: 0, probability: '0' };
    if (rawTotal.length !== 0) {
      const userPointInfo = await PointInfo.findOne({ userAddress: userAddress.toLowerCase() });
      if (userPointInfo !== null) {
        const { total } = rawTotal[0];
        responseRes.votePoint = userPointInfo.votePoint;
        responseRes.probability = Number((userPointInfo.accPoint / total) * 100).toFixed(3);
      }
    }
    res.status(200).json(responseRes);
  } catch (error) {
    if(error){
      next(internal('cannot user Point', error));
    }
  }
};
