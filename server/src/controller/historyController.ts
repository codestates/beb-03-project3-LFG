import { Loan } from '../db/loan';

export const getHistory = async (req, res, next) => {
  const historyList = await Loan.find({
    $or: [{ status: 'FUNDED' }, { status: 'PAIDBACK' }, { status: 'DEFAULTED' }],
  });
  console.log(historyList);
  console.log('getHistory');
  res.status(200).json({ message: 'succeed', historyList });
};
