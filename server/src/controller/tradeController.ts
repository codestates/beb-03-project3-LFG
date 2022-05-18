export const getTrades = async (req, res, next) => {
  console.log('getTrades');
  res.status(200).json({ message: 'succeed' });
  return;
};
