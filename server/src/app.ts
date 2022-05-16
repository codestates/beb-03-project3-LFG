import { CoinGeckoClient } from 'coingecko-api-v3';
import * as express from 'express';
import { userModel } from './db/user';
import { loanRouter } from './router/loan';
import { tradeRouter } from './router/trade';
import { getBlockNumber, getNFT } from './utils/kas';

const sdk = require('api')('@opensea/v1.0#5zrwe3ql2r2e6mn');
//require와 import의 혼종..?

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.send('hello typescript express!');
});

app.use('/loan', loanRouter);
app.use('/trade', tradeRouter);

app.get(
  '/kasTest',
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const blockNumber: Number = await getBlockNumber();
    console.log(blockNumber);
    res.send(blockNumber);
  }
);

app.get(
  '/nftTest',
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const contractAddress: String = '0x1b0e9a44a4d7e1fa1e321bb6feadeb3ed6a9843a';
    const ownerAddress: String = '0xBEc3ccA3AbF992Ea770671E568BA8c2C90db271b';
    const nftArr = await getNFT(contractAddress, ownerAddress);
    for (const elem of nftArr) {
      const { tokenId, tokenUri } = elem;
      let projectId = 'the-meta-kongz';
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
        console.log(Number(res.stats.floor_price));
        console.log(Number(res.stats.floor_price) / Number(simplePrice['klay-token'].eth));
      } catch (err) {
        console.log(err);
      }
    }
    res.send('success');
  }
);

app.post(
  '/test',
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const id = req.body.id;
    const user = new userModel();
    console.log('test :', id);
    user.userId = id;
    await user.save();
    res.send('succeed');
  }
);

app.get(
  '/test',
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    userModel.find({}).then((users) => {
      console.log(users);
      res.send(users);
    });
  }
);

export default app;
