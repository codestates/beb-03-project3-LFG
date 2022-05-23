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
  res.json({
    votePoint: userPointInfo.votePoint,
    probabilty: Number((userPointInfo.accPoint / total) * 100).toFixed(3),
  });
};
