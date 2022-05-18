import { loanListModel } from '../db/loanList';

export const getHistory = async (req, res, next) => {
  const historyList = await loanListModel.find({
    $or: [{ status: 'FUNDED' }, { status: 'PAIDBACK' }, { status: 'DEFAULTED' }],
  });
  //TODO
  //query parameter filter 구현
  console.log(historyList);
  console.log('getHistory');
  res.status(200).json({ message: 'succeed', historyList });
};
