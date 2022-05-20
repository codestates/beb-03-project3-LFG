//const NftList = require('../db/nftList');
const caver = require('../caver');
const tradingAbi = require('../config/Trading.json');
const Trade = require('../db/trade');

// p2p trade
const startTrade = async (tradeAddress, data) => {
  try {
    const targetTradeId = caver.utils.hexToNumber(data.substr(0, 66));
    const tradeContract = new caver.contract(tradingAbi, tradeAddress);

    const {
      tradeId,
      offerAddress,
      respondAddress,
      offerNFTList,
      offerIdList,
      respondNFTList,
      respondIdList,
      offerPaidKlay,
      respondPaidKlay,
      status,
    } = await tradeContract.methods.getTrade(targetTradeId).call();

    curOfferNFTList = [];
    for (let i = 0; i < offerNFTList.length; i++) {
      const { tokenUri } = await caver.kas.tokenHistory.getNFT(offerNFTList[i], offerIdList[i]);
      curOfferNFTList.push({
        nftAddress: offerNFTList[i],
        tokenId: offerIdList[i],
        tokenURI: tokenUri,
      });
    }

    curRespondNFTList = [];
    for (let i = 0; i < respondNFTList.length; i++) {
      const { tokenUri } = await caver.kas.tokenHistory.getNFT(respondNFTList[i], respondIdList[i]);
      curRespondNFTList.push({
        nftAddress: respondNFTList[i],
        tokenId: respondIdList[i],
        tokenURI: tokenUri,
      });
    }

    const getStatus = (status) => {
      switch (status) {
        case '0':
          return 'CREATED';
        case '1':
          return 'CANCELLED';
        case '2':
          return 'FINISHED';
        default:
          return 'INVAILD';
      }
    };

    const trade = new Trade({
      tradeId: tradeId,
      offerAddress: offerAddress,
      respondAddress: respondAddress,
      offerNFTList: curOfferNFTList,
      respondNFTList: curRespondNFTList,
      offerPaidKlay: offerPaidKlay,
      respondPaidKlay: respondPaidKlay,
      status: getStatus(status), // "CREATED", CANCELLED, FINISHED
    });

    const res = await trade.save();
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

const endTrade = async (data) => {
  const targetTradeId = caver.utils.hexToNumber(data.substr(0, 66));
  await Trade.findOneAndUpdate({ tradeId: targetTradeId }, { $set: { status: 'FINISHED' } });
};

const failTrade = async (data) => {
  const targetTradeId = caver.utils.hexToNumber(data.substr(0, 66));
  await Trade.findOneAndUpdate({ tradeId: targetTradeId }, { $set: { status: 'CANCELLED' } });
};

module.exports = {
  startTrade,
  endTrade,
  failTrade,
};
