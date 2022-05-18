import * as express from 'express';
import { getWhiteListNFT } from '../controller/myPageController';

const myPageRouter = express.Router();

myPageRouter.post('/', getWhiteListNFT);

export { myPageRouter };
