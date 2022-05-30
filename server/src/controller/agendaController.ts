import dotenv from 'dotenv';
dotenv.config();
import {Request, Response, NextFunction} from 'express';
import { Agenda } from '../db/agenda';
import { caver } from '../utils/kas';
import {badRequest, internal} from "../error/apiError";

export const agendaList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await Agenda.find({}).select('agendaId title');
    res.status(200).json({ message: 'succeed', list });
  } catch (error) {
    if(error){
      next(internal('cannot fetch agenda list', error));
    }
  }
};

export const viewAgenda = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { userAddress } = req.body;

    if(!id){
      next(badRequest("id parameter is required"));
    }
    if(!userAddress){
      next(badRequest("user field is required"));
    }

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
  } catch (error) {
    if(error){
      next(internal('cannot fetch agenda list',error));
    }
  }
};
