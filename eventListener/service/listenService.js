const Loan = require('../db/loan');
const NftList = require('../db/nftList');
const caver = require('../caver');
const loanAbi = require('../config/Loan.json');

const openLoanRequest = async (newLoanAddress) => {
  const loanContract = new caver.contract(loanAbi, newLoanAddress);
  const { debtor, creditor, period, amount, rateAmount, ikip17, tokenId } =
    await loanContract.methods.term().call();
  const { tokenUri } = await caver.kas.tokenHistory.getNFT(ikip17, tokenId);

  console.log(tokenUri);

  const { nftName, nftTeam } = await NftList.findOne({ nftCA: ikip17 });
  console.log(nftName, nftTeam);

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
  const result = await loan.save();
  console.log(result);
};

module.exports = {
  openLoanRequest,
};
