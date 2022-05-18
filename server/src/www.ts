import { createServer } from 'http';
import app from './app';
import { DBinit } from './db/mongodb';

const port: number = Number(process.env.PORT) || 4002;

const server = createServer(app);

server.listen(port, () => {
  DBinit();
  console.log(`${port}포트 서버 대기 중!`);
});

export default server;
