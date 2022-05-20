import * as mongoose from 'mongoose';

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

export const Trade = mongoose.model('trade', tradeSchema);
