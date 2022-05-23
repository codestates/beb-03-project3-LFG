import * as mongoose from 'mongoose';

const seasonSchema = new mongoose.Schema({
  title: String,
  description: String,
  candidate: [
    {
      nftAddress: String,
      image: String,
      projectName: String,
      vote: Number,
    },
  ],
});

export const Season = mongoose.model('season', seasonSchema);
