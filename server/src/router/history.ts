import * as express from 'express';
import { getHistory } from '../controller/historyController';

const historyRouter = express.Router();

historyRouter.get('/', getHistory);

export { historyRouter };
