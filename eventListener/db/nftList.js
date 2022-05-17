const mongoose = require('mongoose');

const nftListSchema = new mongoose.Schema({
  nftCA: String,
  nftName: String,
  nftTeam: String,
});

const nftListModel = mongoose.model('NFTList', nftListSchema);

module.exports = nftListModel;