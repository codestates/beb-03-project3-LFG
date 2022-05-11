import * as express from 'express';
import { userModel } from './db/user';

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
