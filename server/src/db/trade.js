const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema(
  {
    tradeId: Number,
    offerAddress: String,
    respondAddress: String,
    offerNFTList: [
      {
        nftAddress: String,
        tokenId: String,
        tokenURI: String,
      },
    ],
    respondNFTList: [
      {
        nftAddress: String,
        tokenId: String,
        tokenURI: String,
      },
    ],
    offerPaidKlay: Number,
    respondPaidKlay: Number,
    status: String, // CREATED, CANCELLED, FINISHED
  },
  { timestamps: true }
);

const Trade = mongoose.model('trade', tradeSchema);

module.exports = Trade;
