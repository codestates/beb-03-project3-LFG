import dotenv from 'dotenv';
dotenv.config();
import { CoinGeckoClient } from 'coingecko-api-v3';
import { Loan } from '../db/loan';
import {NextFunction, Request, Response} from "express";

export const getLoans = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loanList = await Loan.find({}).select(
      '_id debtor creditor state tokenURI tokenId amount rateAmount period projectName'
    );
    res.status(200).json({ message: 'succeed', loanList });
  } catch (error) {
    next(error);
  }
};

// import {Api} from 'api';
// const sdk = Api('@opensea/v1.0#5zrwe3ql2r2e6mn');
const sdk = require('api')('@opensea/v1.0#5zrwe3ql2r2e6mn');

export const getLoan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loanInfo = await Loan.findOne({ _id: req.params.id });
    if (loanInfo === null) {
      next();
    }
    loanInfo.floorPrice = 'N/A';
    if (process.env.CHAIN_ID === process.env.MAINNET) {
      const res = await sdk['retrieving-collection-stats']({
        collection_slug: loanInfo.projectName,
      });
      if (res.success) {
        // console.log('res', res);
        const client = new CoinGeckoClient({
          timeout: 10000,
          autoRetry: true,
        });
        const simplePrice = await client.simplePrice({
          ids: 'klay-token',
          vs_currencies: 'eth',
        });
        loanInfo.floorPrice = Number(res.stats.floor_price) / Number(simplePrice['klay-token'].eth);
      }
    }
    res.status(200).json({ message: 'succeed', loanInfo });
  } catch (err) {
    console.log(err);
  }
};
