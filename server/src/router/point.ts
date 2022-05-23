import * as express from 'express';
import { userPoint } from '../controller/pointController';

const pointRouter = express.Router();

pointRouter.post('/', userPoint);

export { pointRouter };
