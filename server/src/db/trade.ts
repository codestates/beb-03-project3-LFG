import * as mongoose from 'mongoose';

const NFTSchema = new mongoose.Schema(
  {
    tokenURI: String,
    tokenId: Number,
    nftAddress: String,
    team: String,
    projectName: String,
  },
  { _id: false }
);

const tradeSchema = new mongoose.Schema(
  {
    tradeId: Number,
    offerAddress: String,
    respondAddress: String,
    offerNFTList: [NFTSchema],
    respondNFTList: [NFTSchema],
    offerPaidKlay: String,
    respondPaidKlay: String,
    status: String, // CREATED, CANCELLED, FINISHED
  },
  { timestamps: true }
);

export const Trade = mongoose.model('trade', tradeSchema);
