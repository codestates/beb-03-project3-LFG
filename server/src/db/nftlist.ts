import * as mongoose from 'mongoose';

const nftListSchema = new mongoose.Schema({
  nftCA: String,
  nftName: String,
  nftTeam: String,
});

export const userModel = mongoose.model('NFTList', nftListSchema);
