const dotenv = require('dotenv');
dotenv.config();
const Caver = require('caver-js');
const helperAbi = require('../config/Helper.json');
const loanFactoryAbi = require('../config/LoanFactory.json');
const loanAbi = require('../config/Loan.json');

const OASIS_ADDRESS = process.env.OASIS_ADDRESS;
const LOANFACTORY_ADDRESS = process.env.LOANFACTORY_ADDRESS;
const HELPER_ADDRESS = process.env.HELPER_ADDRESS;
const caver = new Caver('https://api.baobab.klaytn.net:8651/');

const DEBTOR_PRIVATE_KEY = process.env.hPrivKey;
const CREDIT_PRIV_KEY = process.env.sPrivKey;

const key = caver.wallet.keyring.createFromPrivateKey(DEBTOR_PRIVATE_KEY);
caver.wallet.add(key);

const caver2 = new Caver('https://api.baobab.klaytn.net:8651/');
const key2 = caver.wallet.keyring.createFromPrivateKey(CREDIT_PRIV_KEY);
caver2.wallet.add(key2);

const kip17 = new caver.kct.kip17(OASIS_ADDRESS);
kip17.options.from = key.address; // 이거 코드 역할 물어보기

const loanFactory = new caver.contract(loanFactoryAbi, LOANFACTORY_ADDRESS);
const helper = new caver.contract(helperAbi, HELPER_ADDRESS);

const deploy = async (id) => {
  // 해당 loanFactory 로 사용자는 NFT 를 보낸다.
  let receipt = await kip17.safeTransferFrom(key.address, LOANFACTORY_ADDRESS, id);
  // helper 컨트랙트를 이용해 loan contract bytecode 생성
  const bytecode = await helper.methods
    .getBytecode(
      key.address,
      OASIS_ADDRESS,
      id, //tokenId
      10, // [sec]
      caver.utils.convertToPeb(3, 'KLAY'), // [peb]
      caver.utils.convertToPeb(1, 'KLAY') // [peb]
    )
    .call();

  receipt = await loanFactory.methods
    .deploy(bytecode, OASIS_ADDRESS, id)
    .send({ from: key.address, gas: 5000000 });

  console.log(receipt);
};

const cancel = async (address) => {
  const loan = new caver.contract(loanAbi, address);

  let receipt = await loan.methods.cancel().send({ from: key.address, gas: 5000000 });

  console.log(receipt);
};

const edit = async (address, period, amount, rateAmount) => {
  const loan = new caver.contract(loanAbi, address);

  let receipt = await loan.methods
    .edit(period, amount, rateAmount)
    .send({ from: key.address, gas: 5000000 });

  console.log(receipt);
};

const fund = async (address) => {
  const loan = new caver2.contract(loanAbi, address);

  let receipt = await loan.methods
    .fund()
    .send({ value: caver.utils.convertToPeb(5, 'KLAY'), from: key2.address, gas: 5000000 });
  console.log(receipt);
};

const repay = async (address) => {
  const loan = new caver.contract(loanAbi, address);

  let receipt = await loan.methods
    .repay()
    .send({ value: caver.utils.convertToPeb(5, 'KLAY'), from: key.address, gas: 5000000 });

  console.log(receipt);
};

const defaulted = async (address) => {
  const loan = new caver2.contract(loanAbi, address);

  let receipt = await loan.methods.defaulted().send({ from: key2.address, gas: 5000000 });
  console.log(receipt);
};

const getLoanState = async (address) => {
  const loan = new caver.contract(loanAbi, address);

  const res = await loan.methods.term().call();
  console.log(res);
};

const putNFT = async (address, id) => {
  let receipt = await kip17.safeTransferFrom(key.address, address, id);
  console.log(receipt);
};

const getBlockTimestamp = async () => {
  const blockNumber = await caver.rpc.klay.getBlockNumber();
  // console.log(blockNumber);

  const res = await caver.rpc.klay.getBlockByNumber(blockNumber);
  console.log(res);
  // const res = await caver.rpc.klay.getBlockTimestamp();
  // console.log(res);
};

async function main() {
  // deploy(332);
  // const LOAN_ADDRESS = '0xee0b9fa43af8bed2da90cc099e1a24172c5cc1fc'; // 새로 loan 만들 때마다 값 바꿔줘야 함
  // cancel(LOAN_ADDRESS);
  // edit(
  //   LOAN_ADDRESS,
  //   23323,
  //   caver.utils.convertToPeb(10, 'KLAY'),
  //   caver.utils.convertToPeb(3, 'KLAY')
  // );
  // fund(LOAN_ADDRESS);
  // repay(LOAN_ADDRESS);
  // defaulted(LOAN_ADDRESS);
  // getLoanState(LOAN_ADDRESS);
  // getBlockTimestamp();
  // const TEST_ADDRESS = '0xD2e13022e0195A7A32Eb2C073BB7eEB6e45f0AE5';
  // putNFT(LOAN_ADDRESS, 376);
}

main();
