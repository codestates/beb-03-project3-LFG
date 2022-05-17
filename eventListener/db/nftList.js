const mongoose = require('mongoose');

const nftListSchema = new mongoose.Schema({
  nftCA: String,
  nftName: String,
  nftTeam: String,
});

const NftList = mongoose.model('NFTList', nftListSchema);

module.exports = NftList;