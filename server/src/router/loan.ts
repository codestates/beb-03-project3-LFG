import * as express from 'express';
import { getLoans } from '../controller/loanController';

const loanRouter = express.Router();

loanRouter.get('/', getLoans);

export { loanRouter };
