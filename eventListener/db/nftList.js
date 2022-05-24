const mongoose = require('mongoose');

const nftListSchema = new mongoose.Schema({
  nftAddress: String,
  projectName: String,
  team: String,
});

const NftList = mongoose.model('NFTList', nftListSchema);

module.exports = NftList;
