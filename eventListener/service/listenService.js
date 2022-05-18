const Loan = require('../db/loan');
const NftList = require('../db/nftList');
const caver = require('../caver');
const loanAbi = require('../config/Loan.json');

const openLoanRequest = async (newLoanAddressData) => {
  const newLoanAddress = '0x' + newLoanAddressData.slice(-40);
  const loanContract = new caver.contract(loanAbi, newLoanAddress);

  const { debtor, creditor, period, amount, rateAmount, ikip17, tokenId } =
    await loanContract.methods.term().call();
  const { tokenUri } = await caver.kas.tokenHistory.getNFT(ikip17, tokenId);
  const { nftName, nftTeam } = await NftList.findOne({ nftCA: ikip17 });

  const loan = new Loan({
    debtor: debtor,
    creditor: creditor,
    period: Number(period),
    amount: amount,
    rateAmount: rateAmount,
    tokenId: Number(tokenId),
    nftAddress: ikip17,
    loanAddress: newLoanAddress,
    projectName: nftName,
    team: nftTeam,
    tokenURI: tokenUri,
    state: 'CREATED', // created, canceled, funded, paidBack, defaulted 대문자
  });
  const res = await loan.save();
  console.log(res);
};

const cancelLoan = async (loanAddress) => {
  const res = await Loan.findOneAndUpdate(
    { loanAddress: loanAddress, state: 'CREATED' },
    { $set: { state: 'CANCELED' } }
  );
  if (res === null) {
    console.log(`there are no loan contract! check : ${loanAddress}`);
  }
};

const editLoan = async (loanAddress, data) => {
  const period = caver.utils.hexToNumber('0x' + data.substr(2, 64));
  const amount = caver.utils.hexToNumberString('0x' + data.substr(66, 64));
  const rateAmount = caver.utils.hexToNumberString('0x' + data.substr(130));
  const res = await Loan.findOneAndUpdate(
    { loanAddress: loanAddress, state: 'CREATED' },
    { $set: { period: period, amount: amount, rateAmount: rateAmount } }
  );
  if (res === null) {
    console.log(`there are no loan contract! check : ${loanAddress}`);
  }
};

const fundLoan = async (loanAddress, data) => {
  const address = '0x' + data.substr(26, 40);
  const curTimestamp = caver.utils.hexToNumber('0x' + data.substr(66, 64));
  Loan.findOne({ loanAddress: loanAddress, state: 'CREATED' })
    .then(async (loan) => {
      if (loan == null) {
        console.log(`there are no loan contract! check : ${loanAddress}`);
      }
      loan.creditor = address;
      loan.state = 'FUNDED';
      loan.startAt = curTimestamp;
      loan.endAt = curTimestamp + loan.period;
      await loan.save();
    })
    .catch((err) => {
      console.log(err);
    });
};

const repayLoan = async (loanAddress, data) => {
  const endAtTimestamp = caver.utils.hexToNumber('0x' + data.substr(2, 64));
  const amount = caver.utils.hexToNumberString('0x' + data.substr(66, 64));
  const res = await Loan.findOneAndUpdate(
    { loanAddress: loanAddress, state: 'FUNDED' },
    {
      $set: {
        state: 'PAIDBACK',
        paidBackTime: endAtTimestamp,
        paidBackAmount: amount,
      },
    }
  );
  if (res === null) {
    console.log(`there are no loan contract! check : ${loanAddress}`);
  }
};

const liquidateLoan = async (loanAddress) => {
  const res = await Loan.findOneAndUpdate(
    { loanAddress: loanAddress, state: 'FUNDED' },
    {
      $set: { state: 'DEFAULTED' },
    }
  );
  if (res === null) {
    console.log(`there are no loan contract! check : ${loanAddress}`);
  }
};

module.exports = {
  openLoanRequest,
  cancelLoan,
  editLoan,
  fundLoan,
  repayLoan,
  liquidateLoan,
};
