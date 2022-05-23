import { PointInfo } from '../db/pointInfo';

export const userPoint = async (req, res, next) => {
  const { userAddress } = req.body;
  const rawTotal = await PointInfo.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: '$accPoint' },
      },
    },
  ]);
  const { total } = rawTotal[0];

  const userPointInfo = await PointInfo.findOne({ userAddress: userAddress });
  if (userPointInfo === null) {
    res.status(200).json({ message: 'succeed', votePoint: 0, probability: '0' });
  } else {
    res.json({
      message: 'succeed'
      votePoint: userPointInfo.votePoint,
      probabilty: Number((userPointInfo.accPoint / total) * 100).toFixed(3),
    });
  }
};
