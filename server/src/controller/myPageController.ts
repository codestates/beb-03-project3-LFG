import { NftList } from '../db/nftlist';
import {getNFT, nftInfo} from '../utils/kas';
import {NextFunction, Request, Response} from "express";

export const getWhiteListNFT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userAddress } = req.body;
    let myNftList : nftInfo[] = [];

    const whiteLists = await NftList.find({});
    for (const whiteList of whiteLists) {
      const tempList = await getNFT(whiteList.nftAddress, userAddress);
      if (tempList) {
        tempList.map((nft) => {
          nft['projectName'] = whiteList.projectName as string;
          nft['team'] = String(whiteList.team);
          nft['nftAddress'] = whiteList.nftAddress as string;
        });
        myNftList = myNftList.concat(tempList);
      }
    }
    res.status(200).json({ message: 'succeed', myNftList });
  } catch (error) {
    next(error);
  }
};
