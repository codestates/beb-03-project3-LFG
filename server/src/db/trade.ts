import * as mongoose from 'mongoose';

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

export const Trade = mongoose.model('trade', tradeSchema);
