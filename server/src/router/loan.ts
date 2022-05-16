import * as express from 'express';
import { getLoan, getLoans } from '../controller/loanController';

const loanRouter = express.Router();

loanRouter.get('/', getLoans);
loanRouter.get('/:id', getLoan);

export { loanRouter };
