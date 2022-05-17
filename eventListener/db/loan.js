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
    startTime: { type: Date, default: null },
    endTime: { type: Date, default: null },
    paidBackTime: { type: Date, default: null },
    paidBackAmount: { type: String, default: null },
    status: String, // created, canceled, funded, paidBack, defaulted 대문자 // (status === FUNDED && endTime < nowTime) => 채권자가 아직 담보물을 안 찾아간, 지불기한은 끝난 상태
  },
  { timestamps: true }
);

const Loan = mongoose.model('loan', loanSchema);

module.exports = Loan;
