import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { loanRouter } from './router/loan';
import { myPageRouter } from './router/myPage';
import { pointRouter } from './router/point';
import { tradeRouter } from './router/trade';
import { voteRouter } from './router/vote';

// import {Api} from 'api';
// const sdk = Api('@opensea/v1.0#5zrwe3ql2r2e6mn');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
    credentials: true,
    allowedHeaders: '*',
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  })
);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('homepage');
});

app.use('/loan', loanRouter);
app.use('/trade', tradeRouter);
app.use('/myPage', myPageRouter);
app.use('/vote', voteRouter);
app.use('/point', pointRouter);
// app.use('/history', historyRouter);

app.use((err: Error, req:Request, res:Response, next:NextFunction) => {
  console.error(err.stack);
  res.status(404).send({ status: 404, message: 'cannot find website' });
});

export default app;
