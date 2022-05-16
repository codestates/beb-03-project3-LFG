export const getLoans = async (req, res, next) => {
  console.log('getLoans');
  res.status(200).json({ message: 'succeed' });
  return;
};
