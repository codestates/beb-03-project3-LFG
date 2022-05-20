import { Trade } from '../db/trade';

export const offerTrades = async (req, res, next) => {
  const { userAddress } = req.body;
  const offerList = await Trade.find({ offerAddress: userAddress });

  console.log('offerTrades', offerList);
  res.status(200).json({ message: 'succeed', offerList: offerList });
};

export const respondTrades = async (req, res, next) => {
  const { userAddress } = req.body;
  const respondList = await Trade.find({ respondAddress: userAddress });

  console.log('respondTrades', respondList);
  res.status(200).json({ message: 'succeed', respondList: respondList });
};
