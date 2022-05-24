const Loan = require('../db/loan');
const NftList = require('../db/nftList');
const PointLog = require('../db/pointLog');
const PointInfo = require('../db/pointInfo');
const caver = require('../caver');
const loanAbi = require('../config/Loan.json');

const deployLoan = async (newLoanAddressData) => {
  const newLoanAddress = '0x' + newLoanAddressData.slice(-40);
  const loanContract = new caver.contract(loanAbi, newLoanAddress);

  const { debtor, creditor, period, amount, rateAmount, ikip17, tokenId } =
    await loanContract.methods.term().call();
  const { tokenUri } = await caver.kas.tokenHistory.getNFT(ikip17, tokenId);
  const { projectName, team } = await NftList.findOne({ nftAddress: ikip17.toLowercase() });

  const loan = new Loan({
    debtor: debtor,
    creditor: creditor,
    period: Number(period),
    amount: amount,
    rateAmount: rateAmount,
    tokenId: Number(tokenId),
    nftAddress: ikip17,
    loanAddress: newLoanAddress,
    projectName: projectName,
    team: team,
    tokenURI: tokenUri,
    state: 'CREATED', // created, canceled, funded, paidBack, defaulted 대문자
  });
  const res = await loan.save();
  console.log(res);
};

const cancelLoan = async (loanAddress) => {
  const res = await Loan.findOneAndUpdate(
    { loanAddress: loanAddress, state: 'CREATED' },
    { $set: { state: 'CANCELLED' } }
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
  const rawfee = caver.utils.hexToNumberString('0x' + data.substr(130));
  let fee = caver.utils.convertFromPeb(rawfee, 'KLAY');
  fee = Math.floor(Number(fee) * 100);

  await Loan.findOne({ loanAddress: loanAddress, state: 'FUNDED' }).then(async (loan) => {
    loan.state = 'PAIDBACK';
    loan.paidBackTime = endAtTimestamp;
    loan.paidBackAmount = amount;
    await loan.save();

    await savePoint(loanAddress, loan.debtor, fee);
    await savePoint(loanAddress, loan.creditor, fee);
  });
};

const liquidateLoan = async (loanAddress, data) => {
  const rawfee = caver.utils.hexToNumberString('0x' + data.substr(2, 64));
  let fee = caver.utils.convertFromPeb(rawfee, 'KLAY');
  fee = Math.floor(Number(fee) * 100);

  await Loan.findOne({ loanAddress: loanAddress, state: 'FUNDED' }).then(async (loan) => {
    loan.state = 'DEFAULTED';
    await loan.save();

    await savePoint(loanAddress, loan.debtor, fee);
    await savePoint(loanAddress, loan.creditor, fee);
  });
};

const savePoint = async (loanAddress, userAddress, fee) => {
  //point Log 저장
  const pointLog = new PointLog({
    contractAddress: loanAddress,
    userAddress: userAddress,
    point: fee,
  });
  await pointLog.save();

  // pointInfo 저장
  // 있으면 업데이트
  await PointInfo.findOne({ userAddress: userAddress }).then(async (info) => {
    if (info === null) {
      const pointInfo = new PointInfo({
        userAddress: userAddress,
        votePoint: fee,
        accPoint: fee,
      });
      await pointInfo.save();
    } else {
      info.votePoint += fee;
      info.accPoint += fee;
      await info.save();
    }
  });
};

module.exports = {
  deployLoan,
  cancelLoan,
  editLoan,
  fundLoan,
  repayLoan,
  liquidateLoan,
};
