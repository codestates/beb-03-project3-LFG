const mongoose = require('mongoose');

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
    status: String, // created, canceled, funded, paidBack, defaulted 대문자
  },
  { timestamps: true }
);

const Loan = mongoose.model('loan', loanSchema);

module.exports = Loan;
