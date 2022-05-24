import * as dotenv from 'dotenv';
import { Agenda } from '../db/agenda';
import { caver } from '../utils/kas';
dotenv.config();

export const agendaList = async (req, res, next) => {
  const list = await Agenda.find({}).select('agendaId title');
  res.status(200).json({ message: 'succeed', list });
};

export const viewAgenda = async (req, res, next) => {
  const { id } = req.params;
  const { userAddress } = req.body;
  const agenda = await Agenda.findOne({ agendaId: id }).select('-_id');

  const result = await caver.kas.tokenHistory.getNFTListByOwner(
    process.env.OASIS_ADDRESS,
    userAddress
  );
  const tokenList = [];
  for (const elem of result.items) {
    const { tokenId } = elem;
    tokenList.push(parseInt(tokenId, 16));
  }

  res.status(200).json({ message: 'succeed', agenda, tokenList });
};
