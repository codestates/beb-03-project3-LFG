import { PointInfo } from '../db/pointInfo';
import { Season } from '../db/season';
import {NextFunction, Request, Response} from "express";
import {badRequest, internal} from "../error/apiError";

export const seasonList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await Season.find({}).select('_id title');
    res.status(200).json({ message: 'succeed', list });
  } catch (error) {
    if(error){
      next(internal('cannot fetch season list', error));
    }
  }
};

export const viewSeason = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const season = await Season.findOne({ _id: id });
    if(!id){
      next(badRequest("id parameter is required"));
    }
    res.status(200).json({ message: 'succeed', season });
  } catch (error) {
    if(error){
      next(internal('cannot fetch this season topic', error));
    }
  }
};

export const seasonVote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { userAddress, nftAddress } = req.body;

    await PointInfo.findOne({ userAddress: userAddress.toLowerCase() }).then(async (info) => {
      if (info === null) {
        res.status(400).json({ message: 'fail, you have no votePoint' });
      } else {
        const { votePoint } = info;

        info.votePoint = 0;
        const infoRes = await info.save();
        if (infoRes === null) {
          next(internal(`cannot reduce point : ${userAddress}`));
        }

        await Season.findOne({ _id: id }).then(async (season) => {
          for (const elem of season.candidate) {
            if (elem.nftAddress.toLowerCase() === nftAddress.toLowerCase()) {
              elem.vote += votePoint;
              break;
            }
          }
          const seasonRes = await season.save();
          if (seasonRes === null) {
            next(internal(`cannot add point : ${userAddress} to ${id}`));
          }
          res.status(200).json({ message: 'succeed', season });
        });
      }
    });
  } catch (error) {
    next(error);
  }
};
