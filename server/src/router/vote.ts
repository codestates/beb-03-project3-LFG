import * as express from 'express';
import { agendaList, viewAgenda } from '../controller/agendaController';
import { seasonList, seasonVote, viewSeason } from '../controller/seasonController';

const voteRouter = express.Router();

voteRouter.get('/season', seasonList);
voteRouter.get('/season/:id', viewSeason);
voteRouter.post('/season/:id', seasonVote);

voteRouter.get('/agenda', agendaList);
voteRouter.post('/agenda/:id', viewAgenda);

export { voteRouter };
