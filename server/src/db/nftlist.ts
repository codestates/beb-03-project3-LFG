import * as mongoose from 'mongoose';

const nftListSchema = new mongoose.Schema({
  nftCA: String,
  nftName: String,
  nftTeam: String,
});

export const nftListModel = mongoose.model('NFTList', nftListSchema);
