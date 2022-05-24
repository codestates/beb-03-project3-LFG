const caver = require('../caver');
const tradingAbi = require('../config/Trading.json');
const Trade = require('../db/trade');
const NftList = require('../db/nftList');

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
      await NftList.findOne({ nftAddress: offerNFTList[i].toLowerCase() })
        .then(async (whiteList) => {
          const curNFT = {
            tokenURI: tokenUri,
            tokenId: offerIdList[i],
            nftAddress: offerNFTList[i].toLowerCase(),
            projectName: whiteList.projectName,
            team: whiteList.team,
          };
          curOfferNFTList.push(curNFT);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    curRespondNFTList = [];
    for (let i = 0; i < respondNFTList.length; i++) {
      const { tokenUri } = await caver.kas.tokenHistory.getNFT(respondNFTList[i], respondIdList[i]);
      await NftList.findOne({ nftAddress: respondNFTList[i].toLowerCase() })
        .then(async (whiteList) => {
          const curNFT = {
            tokenURI: tokenUri,
            tokenId: respondIdList[i],
            nftAddress: respondNFTList[i].toLowerCase(),
            projectName: whiteList.projectName,
            team: whiteList.team,
          };
          curRespondNFTList.push(curNFT);
        })
        .catch((err) => {
          console.log(err);
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
      offerAddress: offerAddress.toLowerCase(),
      respondAddress: respondAddress.toLowerCase(),
      offerNFTList: curOfferNFTList,
      respondNFTList: curRespondNFTList,
      offerPaidKlay: offerPaidKlay,
      respondPaidKlay: respondPaidKlay,
      status: getStatus(status), // "CREATED", CANCELLED, FINISHED
    });

    const tradeRes = await trade.save();
    if (tradeRes === null) {
      throw Error(`cannot save trade! check : ${tradeId}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const endTrade = async (data) => {
  try {
    const targetTradeId = caver.utils.hexToNumber(data.substr(0, 66));
    const tradeRes = await Trade.findOneAndUpdate(
      { tradeId: targetTradeId },
      { $set: { status: 'FINISHED' } }
    );
    if (tradeRes === null) {
      throw Error(`there is no trade! check : ${targetTradeId}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const failTrade = async (data) => {
  try {
    const targetTradeId = caver.utils.hexToNumber(data.substr(0, 66));
    const tradeRes = await Trade.findOneAndUpdate(
      { tradeId: targetTradeId },
      { $set: { status: 'CANCELLED' } }
    );
    if (tradeRes === null) {
      throw Error(`there is no trade! check : ${targetTradeId}`);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  startTrade,
  endTrade,
  failTrade,
};
