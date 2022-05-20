import * as express from 'express';
import { offerTrades, respondTrades } from '../controller/tradeController';

const tradeRouter = express.Router();

tradeRouter.post('/offer', offerTrades);
tradeRouter.post('/respond', respondTrades);

export { tradeRouter };
