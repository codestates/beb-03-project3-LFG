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
    duration: period,
    amount: amount,
    interestAmount: rateAmount,
    tokenId: tokenId,
    nftAddress: ikip17,
    loanAddress: newLoanAddress,
    projectTitle: nftName,
    team: nftTeam,
    tokenURI: tokenUri,
    status: 'CREATED', // created, canceled, funded, paidBack, defaulted 대문자
  });
  const res = await loan.save();
  console.log(res);
};

const cancelLoan = async (loanAddress) => {
  const res = await Loan.findOneAndUpdate(
    { loanAddress: loanAddress, status: 'CREATED' },
    { $set: { status: 'CANCELED' } }
  );
  if (res === null) {
    console.log(`there are no loan contract! check : ${loanAddress}`);
  }
};

const editLoan = async (loanAddress, data) => {
  const duration = caver.utils.hexToNumberString('0x' + data.substr(2, 64));
  const amount = caver.utils.hexToNumberString('0x' + data.substr(66, 64));
  const interestAmount = caver.utils.hexToNumberString('0x' + data.substr(130));
  const res = await Loan.findOneAndUpdate(
    { loanAddress: loanAddress, status: 'CREATED' },
    { $set: { duration: duration, amount: amount, interestAmount: interestAmount } }
  );
  if (res === null) {
    console.log(`there are no loan contract! check : ${loanAddress}`);
  }
};

const fundLoan = async (loanAddress, data) => {
  const address = '0x' + data.substr(26, 40);
  const curTimestamp = caver.utils.hexToNumber('0x' + data.substr(66, 64));
  Loan.findOne({ loanAddress: loanAddress, status: 'CREATED' })
    .then(async (loan) => {
      if (loan == null) {
        console.log(`there are no loan contract! check : ${loanAddress}`);
      }
      loan.creditor = address;
      loan.status = 'FUNDED';
      loan.startTime = new Date(curTimestamp * 1000);
      loan.endTime = new Date((Number(loan.duration) + curTimestamp) * 1000);
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
    { loanAddress: loanAddress, status: 'FUNDED' },
    {
      $set: {
        status: 'PAIDBACK',
        paidBackTime: new Date(endAtTimestamp * 1000),
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
    { loanAddress: loanAddress, status: 'FUNDED' },
    {
      $set: { status: 'DEFAULTED' },
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
