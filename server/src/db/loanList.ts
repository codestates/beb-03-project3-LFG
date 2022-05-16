import * as mongoose from 'mongoose';

const loanListSchema = new mongoose.Schema(
  {
    duration: Number,
    amount: Number,
    interestAmount: Number,
    tokenId: Number,
    nftAddress: String,
    loanAddress: String,
    projectTitle: String,
    team: String,
    tokenURI: String,
    status: String, // created, canceled, funded, paidBack, defaulted 대문자
  },
  { timestamps: true }
);

export const loanListModel = mongoose.model('loanList', loanListSchema);
