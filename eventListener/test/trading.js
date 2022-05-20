require('dotenv').config();
const Caver = require('caver-js');
const CaverExtKas = require('caver-js-ext-kas');
const tradingAbi = require('../config/Trading.json');
const LFGAbi = require('../config/LFG.json');

const OASIS_ADDRESS = process.env.OASIS_ADDRESS;
const TRADING_ADDRESS = process.env.TRADING_ADDRESS;

const OFFER_PRIVATE_KEY = process.env.hPrivKey;
const RESPOND_PRIV_KEY = process.env.sPrivKey;

const OFFER_ADDRESS = process.env.hAddress;
const RESPOND_ADDRESS = process.env.sAddress;

const caver = new Caver('https://api.baobab.klaytn.net:8651/');
const key = caver.wallet.keyring.createFromPrivateKey(OFFER_PRIVATE_KEY); // offer는 민권
caver.wallet.add(key);

const caver2 = new Caver('https://api.baobab.klaytn.net:8651/');
const key2 = caver.wallet.keyring.createFromPrivateKey(RESPOND_PRIV_KEY); // respond는 영준
caver2.wallet.add(key2);

const kip17 = new caver.kct.kip17(OASIS_ADDRESS);
kip17.options.from = key.address; // 이거 코드 역할 물어보기

const offerApproveNFT = async (tokenId) => {
  const lfg = new caver.contract(LFGAbi, OASIS_ADDRESS);

  let receipt = await lfg.methods
    .approve(TRADING_ADDRESS, tokenId)
    .send({ from: key.address, gas: 5000000 });

  console.log('offer approved', tokenId);
};

const respondApproveNFT = async (tokenId) => {
  const lfg = new caver2.contract(LFGAbi, OASIS_ADDRESS);

  let receipt = await lfg.methods
    .approve(TRADING_ADDRESS, tokenId)
    .send({ from: key2.address, gas: 5000000 });

  console.log('respond approved', tokenId);
};

const startTrade = async (
  respondAddress,
  offerNFTList,
  offerTokenIdList,
  offerPaid,
  respondNFTList,
  respondTokenIdList,
  respondPaid
) => {
  const trading = new caver.contract(tradingAbi, TRADING_ADDRESS);
  let receipt = await trading.methods
    .makeTrade(
      respondAddress,
      offerNFTList,
      offerTokenIdList,
      respondNFTList,
      respondTokenIdList,
      respondPaid
    )
    .send({ value: offerPaid, from: key.address, gas: 5000000 });

  console.log(receipt);
};

const getTrade = async (tradeId) => {
  // const trading = new caver.contract(tradingAbi, TRADING_ADDRESS);
  // let { offerNFTList, offerIdList } = await trading.methods.getTrade(tradeId).call();
  // // cypress : 8217, baobab : 1001
  // const chainId = 1001;
  // const accessKeyId = process.env.accessKeyId;
  // const secretAccessKey = process.env.secretAccessKey;
  // const caverKas = new CaverExtKas();
  // // console.log(accessKeyId, secretAccessKey);
  // // console.log(res);
  // // console.log(offerNFTList[0], offerIdList[0]);
  // caverKas.initTokenHistoryAPI(1001, accessKeyId, secretAccessKey);
  // caverKas.initKIP17API(1001, accessKeyId, secretAccessKey);
  // try {
  //   const ret = await caverKas.kas.tokenHistory.getNFT(
  //     '0xe6f023036c06862d9a8e00cea169653f1cb1ab14',
  //     '332'
  //   );
  //   console.log(ret);
  // } catch (error) {
  //   console.log(error);
  // }
};

const failTrade = async (tradeId) => {
  const trading = new caver.contract(tradingAbi, TRADING_ADDRESS);

  let receipt = await trading.methods
    .cancelTrade(tradeId)
    .send({ from: key.address, gas: 5000000 });

  console.log(receipt);
};

const acceptTrade = async (tradeId, respondPaid) => {
  const trading = new caver2.contract(tradingAbi, TRADING_ADDRESS);
  let receipt = await trading.methods
    .acceptTrade(tradeId)
    .send({ value: respondPaid, from: key2.address, gas: 5000000 });

  console.log(receipt);
};

async function main() {
  // getTrade(1);

  // offerApproveNFT(319);
  // respondApproveNFT(331);

  // const offerNFTList = [OASIS_ADDRESS];
  // const offerTokenIdList = [319];
  // const offerPaid = 1;
  // const respondNFTList = [OASIS_ADDRESS];
  // const respondTokenIdList = [331];
  // const respondPaid = 2;
  // startTrade(
  //   RESPOND_ADDRESS,
  //   offerNFTList,
  //   offerTokenIdList,
  //   offerPaid,
  //   respondNFTList,
  //   respondTokenIdList,
  //   respondPaid
  // );

  failTrade(23);

  // acceptTrade(10, respondPaid);
}

main();
