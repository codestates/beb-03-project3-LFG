import * as mongoose from 'mongoose';

const loanSchema = new mongoose.Schema(
  {
    debtor: String,
    creditor: String,
    duration: String,
    amount: String,
    interestAmount: String,
    tokenId: String,
    nftAddress: String,
    loanAddress: String,
    projectTitle: String,
    team: String,
    tokenURI: String,
    startTime: String,
    endTime: String,
    paidBackTime: String,
    paidBackAmount: String,
    status: String, // created, canceled, funded, paidBack, defaulted 대문자
  },
  { timestamps: true }
);

export const Loan = mongoose.model('loan', loanSchema);
