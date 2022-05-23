import { PointInfo } from '../db/pointInfo';
import { Season } from '../db/season';

export const seasonList = async (req, res, next) => {
  const list = await Season.find({}).select('_id title');
  res.status(200).json({ message: 'succeed', list });
};

export const viewSeason = async (req, res, next) => {
  const { id } = req.params;
  const season = await Season.findOne({ _id: id });

  res.status(200).json({ message: 'succeed', season });
};

export const seasonVote = async (req, res, next) => {
  const { id } = req.params;
  const { userAddress, nftAddress } = req.body;

  await PointInfo.findOne({ userAddress: userAddress }).then(async (info) => {
    const { votePoint } = info;

    info.votePoint = 0;
    await info.save();

    await Season.findOne({ _id: id }).then(async (season) => {
      for (const elem of season.candidate) {
        if (elem.nftAddress === nftAddress) {
          elem.vote += votePoint;
          break;
        }
      }
      await season.save();
      res.status(200).json({ message: 'succeed', season });
    });
  });
};
