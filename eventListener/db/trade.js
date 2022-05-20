const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema(
  {
    tradeId: Number,
    offerAddress: String,
    respondAddress: String,
    offerNFTList: [String],
    respondNFTList: [String],
    offerPaidKlay: String,
    respondPaidKlay: String,
    status: String, // CREATED, CANCELLED, FINISHED
  },
  { timestamps: true }
);

const Trade = mongoose.model('trade', tradeSchema);

module.exports = Trade;
