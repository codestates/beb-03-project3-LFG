import * as mongoose from 'mongoose';

const nftListSchema = new mongoose.Schema({
  nftAddress: String,
  projectName: String,
  team: String,
});

export const NftList = mongoose.model('NFTList', nftListSchema);
