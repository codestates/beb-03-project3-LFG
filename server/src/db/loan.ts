import * as mongoose from 'mongoose';

const loanSchema = new mongoose.Schema(
  {
    debtor: String,
    creditor: String,
    period: Number,
    amount: String,
    rateAmount: String,
    tokenId: Number,
    nftAddress: String,
    loanAddress: String,
    projectName: String,
    team: String,
    tokenURI: String,
    startAt: { type: Number, default: null },
    endAt: { type: Number, default: null },
    paidBackTime: { type: Number, default: null },
    paidBackAmount: { type: String, default: null },
    state: String, // created, canceled, funded, paidBack, defaulted 대문자 // (status === FUNDED && endTime < nowTime) => 채권자가 아직 담보물을 안 찾아간, 지불기한은 끝난 상태
  },
  { timestamps: true }
);

export const Loan = mongoose.model('loan', loanSchema);
