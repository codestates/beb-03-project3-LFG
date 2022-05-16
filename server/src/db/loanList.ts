import * as mongoose from 'mongoose';

const loanListSchema = new mongoose.Schema(
  {
    duration: Number,
    amount: Number,
    interestAmount: Number,
    tokenId: Number,
    nftAddr: String,
    loanAddr: String,
    projectTitle: String,
    team: String,
    tokenUri: String,
    status: String,
  },
  { timestamps: true }
);

export const userModel = mongoose.model('loanList', loanListSchema);
