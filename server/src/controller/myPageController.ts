import { NftList } from '../db/nftList';
import { getNFT } from '../utils/kas';

export const getWhiteListNFT = async (req, res, next) => {
  // 이전에 nftList 불러와서
  // for 문 돌리면선
  // kas로 만든 모듈 이용해서 해당 주소가 소유한 NFT 정보를 불러옴
  // 그 다음에 담아서 응답하면 됨
  const { userAddress } = req.body;

  let myNftList = [];
  const whiteLists = await NftList.find({});
  for (const whiteList of whiteLists) {
    const tempList = await getNFT(whiteList.nftCA, userAddress);
    tempList.map((nft) => (nft['nftCA'] = whiteList.nftCA));
    myNftList = myNftList.concat(tempList);
  }
  console.log(myNftList);
  console.log('getWhiteListNFT');
  res.status(200).json({ message: 'succeed' });
};
