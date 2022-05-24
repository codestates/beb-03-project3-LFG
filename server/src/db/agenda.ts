import * as mongoose from 'mongoose';

const agendaSchema = new mongoose.Schema(
  {
    agendaId: String,
    agendaAddress: String,
    title: String,
    description: String,
  },
  { timestamps: true }
);

export const Agenda = mongoose.model('agenda', agendaSchema);
