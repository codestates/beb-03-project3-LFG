import { loanListModel } from '../db/loanList';

export const getLoans = async (req, res, next) => {
  const loanList = await loanListModel.find({});

  console.log(loanList);
  console.log('getLoans');
  res.status(200).json({ message: 'succeed', loanList });
  return;
};

export const getLoan = async (req, res, next) => {
  const loan = await loanListModel.findOne({ id: req.params.id });

  console.log(loan);
  console.log('getLoan');
  res.status(200).json({ message: 'succeed', loan });
  return;
};
