import { CoinGeckoClient } from 'coingecko-api-v3';
import { Loan } from '../db/loan';

export const getLoans = async (req, res, next) => {
  const loanList = await Loan.find({}).select(
    '_id debtor creditor state tokenURI tokenId amount rateAmount period projectName'
  );

  //TODO
  //query parameter filter 구현
  console.log(loanList);
  console.log('getLoans');
  res.status(200).json({ message: 'succeed', loanList });
};

const sdk = require('api')('@opensea/v1.0#5zrwe3ql2r2e6mn');

export const getLoan = async (req, res, next) => {
  const loanInfo = await Loan.findOne({ _id: req.params.id });
  // const { data } = await axios.get(loan.tokenURI);
  // const loanInfo = data;
  loanInfo.floorPrice = 'N/A';
  try {
    const res = await sdk['retrieving-collection-stats']({ collection_slug: loanInfo.projectName });
    console.log('res', res);
    const client = new CoinGeckoClient({
      timeout: 10000,
      autoRetry: true,
    });
    const simplePrice = await client.simplePrice({
      ids: 'klay-token',
      vs_currencies: 'eth',
    });
    const floorPrice = Number(res.stats.floor_price) / Number(simplePrice['klay-token'].eth);
    // if (floorPrice === undefined) {
    //   loanInfo['floorPrice'] = 'N/A';
    // }
  } catch (err) {
    console.log(err);
  }
  res.status(200).json({ message: 'succeed', loanInfo });
};
