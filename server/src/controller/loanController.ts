import axios from 'axios';
import { CoinGeckoClient } from 'coingecko-api-v3';
import { Loan } from '../db/loan';

export const getLoans = async (req, res, next) => {
  const loanList = await Loan.find({});

  //TODO
  //query parameter filter 구현
  console.log(loanList);
  console.log('getLoans');
  res.status(200).json({ message: 'succeed', loanList });
};

const sdk = require('api')('@opensea/v1.0#5zrwe3ql2r2e6mn');

export const getLoan = async (req, res, next) => {
  const loan = await Loan.findOne({ id: req.params.id });
  const { data } = await axios.get(loan.tokenURI);
  const loanInfo = data;
  const projectId = loan.projectTitle;

  try {
    const res = await sdk['retrieving-collection-stats']({ collection_slug: projectId });
    const client = new CoinGeckoClient({
      timeout: 10000,
      autoRetry: true,
    });
    const simplePrice = await client.simplePrice({
      ids: 'klay-token',
      vs_currencies: 'eth',
    });
    loanInfo['floorPrice'] = Number(res.stats.floor_price) / Number(simplePrice['klay-token'].eth);
  } catch (err) {
    console.log(err);
  }

  console.log(loanInfo);
  console.log('getLoan');
  res.status(200).json({ message: 'succeed', loanInfo });
  return;
};