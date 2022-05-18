import * as express from 'express';
import { getTrades } from '../controller/tradeController';

const tradeRouter = express.Router();

tradeRouter.get('/', getTrades);

export { tradeRouter };
