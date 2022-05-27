import dotenv from 'dotenv';
dotenv.config();
import { createServer } from 'http';
import app from './app';
import { DBinit } from './utils/connect';
import {logger} from "./utils/logger";

const port = Number(process.env.PORT) || 4002;

const server = createServer(app);

server.listen(port, () => {
  DBinit();
  logger.info(`${port} 포트 서버 대기 중!`);
});

export default server;
