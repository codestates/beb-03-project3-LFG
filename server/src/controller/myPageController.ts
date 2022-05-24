import { NftList } from '../db/nftlist';
import { getNFT } from '../utils/kas';

export const getWhiteListNFT = async (req, res, next) => {
  try {
    const { userAddress } = req.body;
    let myNftList = [];

    const whiteLists = await NftList.find({});
    for (const whiteList of whiteLists) {
      const tempList = await getNFT(whiteList.nftAddress, userAddress);
      if (tempList) {
        tempList.map((nft) => {
          nft['projectName'] = whiteList.projectName;
          nft['team'] = whiteList.team;
          nft['nftAddress'] = whiteList.nftAddress;
        });
        myNftList = myNftList.concat(tempList);
      }
    }
    res.status(200).json({ message: 'succeed', myNftList });
  } catch (error) {
    next(error);
  }
};
