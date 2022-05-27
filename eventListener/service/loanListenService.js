const Loan = require('../db/loan');
const NftList = require('../db/nftList');
const PointLog = require('../db/pointLog');
const PointInfo = require('../db/pointInfo');
const caver = require('../caver');
const loanAbi = require('../config/Loan.json');

const deployLoan = async (newLoanAddressData) => {
  try {
    const newLoanAddress = '0x' + newLoanAddressData.slice(-40);
    const loanContract = new caver.contract(loanAbi, newLoanAddress);

    const { debtor, creditor, period, amount, rateAmount, ikip17, tokenId } =
      await loanContract.methods.term().call();
    const { tokenUri } = await caver.kas.tokenHistory.getNFT(ikip17, tokenId);
    const { projectName, team } = await NftList.findOne({ nftAddress: ikip17.toLowerCase() });
    if (projectName === null || team === null) {
      throw Error('cannot find projectName or team');
    }

    const loan = new Loan({
      debtor: debtor.toLowerCase(),
      creditor: creditor.toLowerCase(),
      period: Number(period),
      amount: amount,
      rateAmount: rateAmount,
      tokenId: Number(tokenId),
      nftAddress: ikip17.toLowerCase(),
      loanAddress: newLoanAddress.toLowerCase(),
      projectName: projectName,
      team: team,
      tokenURI: tokenUri,
      state: 'CREATED', // CREATED, CANCELLED, FUNDED, PAIDBACK, DEFAULTED
    });
    const loanRes = await loan.save();
    if (loanRes === null) {
      throw Error('deployLoan db error');
    }
  } catch (err) {
    console.log(err);
  }
};

const cancelLoan = async (loanAddress) => {
  try {
    const res = await Loan.findOneAndUpdate(
      { loanAddress: loanAddress, state: 'CREATED' },
      { $set: { state: 'CANCELLED' } }
    );
    if (res === null) {
      throw Error(`there are no loan contract! check : ${loanAddress}`);
    }
  } catch (err) {
    console.log(err);
  }
};

const editLoan = async (loanAddress, data) => {
  try {
    const period = caver.utils.hexToNumber('0x' + data.substr(2, 64));
    const amount = caver.utils.hexToNumberString('0x' + data.substr(66, 64));
    const rateAmount = caver.utils.hexToNumberString('0x' + data.substr(130));
    const res = await Loan.findOneAndUpdate(
      { loanAddress: loanAddress, state: 'CREATED' },
      { $set: { period: period, amount: amount, rateAmount: rateAmount } }
    );
    if (res === null) {
      throw Error(`there are no loan contract! check : ${loanAddress}`);
    }
  } catch (err) {
    console.log(err);
  }
};

const fundLoan = async (loanAddress, data) => {
  try {
    const address = '0x' + data.substr(26, 40);
    const curTimestamp = caver.utils.hexToNumber('0x' + data.substr(66, 64));
    await Loan.findOne({ loanAddress: loanAddress, state: 'CREATED' })
      .then(async (loan) => {
        if (loan === null) {
          throw Error(`there is no loan contract! check : ${loanAddress}`);
        }
        loan.creditor = address.toLowerCase();
        loan.state = 'FUNDED';
        loan.startAt = curTimestamp;
        loan.endAt = curTimestamp + loan.period;
        const loanRes = await loan.save();
        if (loanRes === null) {
          throw Error('fundLoan db error');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

const repayLoan = async (loanAddress, data) => {
  try {
    const endAtTimestamp = caver.utils.hexToNumber('0x' + data.substr(2, 64));
    const amount = caver.utils.hexToNumberString('0x' + data.substr(66, 64));
    const rawfee = caver.utils.hexToNumberString('0x' + data.substr(130));
    let fee = caver.utils.convertFromPeb(rawfee, 'KLAY');
    fee = Math.floor(Number(fee) * 100);

    await Loan.findOne({ loanAddress: loanAddress, state: 'FUNDED' })
      .then(async (loan) => {
        if (loan === null) {
          throw Error(`there is no loan contract! check : ${loanAddress}`);
        }

        loan.state = 'PAIDBACK';
        loan.paidBackTime = endAtTimestamp;
        loan.paidBackAmount = amount;
        const loanRes = await loan.save();
        if (loanRes === null) {
          throw Error('repayLoan db error');
        }

        await savePoint(loanAddress, loan.debtor, fee);
        await savePoint(loanAddress, loan.creditor, fee);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

const liquidateLoan = async (loanAddress, data) => {
  try {
    const rawfee = caver.utils.hexToNumberString('0x' + data.substr(2, 64));
    let fee = caver.utils.convertFromPeb(rawfee, 'KLAY');
    fee = Math.floor(Number(fee) * 100);

    await Loan.findOne({ loanAddress: loanAddress, state: 'FUNDED' })
      .then(async (loan) => {
        if (loan === null) {
          throw Error(`there is no loan contract! check : ${loanAddress}`);
        }

        loan.state = 'DEFAULTED';
        const loanRes = await loan.save();
        if (loanRes === null) {
          throw Error('liquidateLoan db error');
        }

        await savePoint(loanAddress, loan.debtor, fee);
        await savePoint(loanAddress, loan.creditor, fee);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

const savePoint = async (loanAddress, userAddress, fee) => {
  try {
    const pointLog = new PointLog({
      contractAddress: loanAddress,
      userAddress: userAddress,
      point: fee,
    });
    const pointLogRes = await pointLog.save();
    if (pointLogRes === null) {
      throw Error(`cannot save pointLog ${loanAddress}`);
    }

    await PointInfo.findOne({ userAddress: userAddress })
      .then(async (info) => {
        if (info === null) {
          const pointInfo = new PointInfo({
            userAddress: userAddress,
            votePoint: fee,
            accPoint: fee,
          });
          const pointInfoRes = await pointInfo.save();
          if (pointInfoRes === null) {
            throw Error('deployLoan db error');
          }
        } else {
          info.votePoint += fee;
          info.accPoint += fee;
          const infoRes = await info.save();

          if (infoRes === null) {
            throw Error(`cannot save infoRes ${loanAddress}`);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  deployLoan,
  cancelLoan,
  editLoan,
  fundLoan,
  repayLoan,
  liquidateLoan,
};
