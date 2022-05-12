import axios from 'axios';
import * as express from 'express';
import { userModel } from './db/user';
import { getBlockNumber, getNFT } from './utils/kas';

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  // console.log('hello');
  res.send('hello typescript express!');
});

// declare module 'express' {
//   interface Request {
//     body: {
//       id?: String;
//     };
//   }
// }

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
      const uriResult = await axios.get(tokenUri);
      console.log(uriResult.data);
    }
    // console.log(blockNumber);
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
