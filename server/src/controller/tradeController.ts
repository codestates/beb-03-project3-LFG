import { Trade } from '../db/trade';

export const offerTrades = async (req, res, next) => {
  try {
    const { userAddress } = req.body;
    const offerList = await Trade.find({ offerAddress: userAddress.toLowerCase() });
    res.status(200).json({ message: 'succeed', offerList: offerList });
  } catch (error) {
    next(error);
  }
};

export const respondTrades = async (req, res, next) => {
  try {
    const { userAddress } = req.body;
    const respondList = await Trade.find({ respondAddress: userAddress.toLowerCase() });
    res.status(200).json({ message: 'succeed', respondList: respondList });
  } catch (error) {
    next(error);
  }
};
