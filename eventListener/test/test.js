const Caver = require('caver-js');
const helperAbi = require('../config/Helper.json');
const loanFactoryAbi = require('../config/LoanFactory.json');
const loanAbi = require('../config/Loan.json');

const OASIS_ADDRESS = '0xe6f023036c06862d9a8e00cea169653f1cb1ab14';
const LOANFACTORY_ADDRESS = '0xd7D7b53aEB978E96d7C506946cF69393ABB9ffF3';
const HELPER_ADDRESS = '0xc98871CB1b678775c0d26370C83d052f3cE4fd4F';
const caver = new Caver('https://api.baobab.klaytn.net:8651/');

// 보성 Address : '0x24daf1e6c925a61d9f186bf5232ed907cfde15d9'
// 영준 Address : '0xbec3cca3abf992ea770671e568ba8c2c90db271b'
// 민권 Address : '0xd5792936d4230b575342e08E3D5406029487Ee48'

// 보성님_키 = "0xb54670eaa14c403526fb71441acd1cbed2e82b79d950509f2e7bc6b6e998f2ea"
// 영준님_개인키 : "0xe4526785e492dddf0f1ef916c12d3295dbe1123d6ea5360ad0df2c2d8d4b3a8f"
// 민권님 개인키 : "0x194195fd5250f6de0885521f986a6de8860c859a52cd2bd050b0f7fd55ac8840"

const DEBTOR_PRIVATE_KEY = '0x194195fd5250f6de0885521f986a6de8860c859a52cd2bd050b0f7fd55ac8840';
const CREDIT_PRIV_KEY = '0xe4526785e492dddf0f1ef916c12d3295dbe1123d6ea5360ad0df2c2d8d4b3a8f';

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
      1, // [wei]
      1 // [wei]
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

  let receipt = await loan.methods.fund().send({ value: 3, from: key2.address, gas: 5000000 });
  console.log(receipt);
};

const repay = async (address) => {
  const loan = new caver.contract(loanAbi, address);

  let receipt = await loan.methods.repay().send({ value: 10, from: key.address, gas: 5000000 });

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
  deploy(353);

  // const LOAN_ADDRESS = '0x9a7dd9e0f681fc2a07a3351f9f3804ced63ee350'; // 새로 loan 만들 때마다 값 바꿔줘야 함
  // cancel(LOAN_ADDRESS);
  // edit(LOAN_ADDRESS, 300, 3, 4);
  // fund(LOAN_ADDRESS);
  // repay(LOAN_ADDRESS);
  // defaulted(LOAN_ADDRESS);
  // getLoanState(LOAN_ADDRESS);
  // getBlockTimestamp();
  // const TEST_ADDRESS = '0xD2e13022e0195A7A32Eb2C073BB7eEB6e45f0AE5';
  // putNFT(LOAN_ADDRESS, 376);
}

main();
