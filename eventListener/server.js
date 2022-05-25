const caver = require('./caver');
const { DBinit } = require('./db/mongodb');
DBinit();

const {
  deployTopic,
  cancelTopic,
  editTopic,
  fundTopic,
  repayTopic,
  defaultTopic,
} = require('./config/topics/loan');

const { startTopic, endTopic, failTopic } = require('./config/topics/trading');

const {
  deployLoan,
  cancelLoan,
  editLoan,
  fundLoan,
  repayLoan,
  liquidateLoan,
} = require('./service/loanListenService');

const { startTrade, endTrade, failTrade } = require('./service/tradingListenService');

// db 연결 지속 위해 사용
setInterval(async () => {
  try {
    const blockNumber = await caver.rpc.klay.getBlockNumber();
  } catch (e) {
    // console.log(e);
  }
}, 30000);

const loanSubscrpition = caver.rpc.klay.subscribe(
  'logs',
  {
    topics: [[deployTopic, cancelTopic, editTopic, fundTopic, repayTopic, defaultTopic]],
  },
  (err, res) => {
    try {
      switch (res.topics[0]) {
        case deployTopic:
          console.log(res);
          deployLoan(res.data);
          break;
        case cancelTopic:
          console.log(res);
          cancelLoan(res.address.toLowerCase());
          break;
        case editTopic:
          console.log(res);
          editLoan(res.address.toLowerCase(), res.data);
          break;
        case fundTopic:
          console.log(res);
          fundLoan(res.address.toLowerCase(), res.data);
          break;
        case repayTopic:
          console.log(res);
          repayLoan(res.address.toLowerCase(), res.data);
          break;
        case defaultTopic:
          console.log(res);
          liquidateLoan(res.address.toLowerCase(), res.data);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }
);

const tradeSubscription = caver.rpc.klay.subscribe(
  'logs',
  {
    topics: [[startTopic, endTopic, failTopic]],
  },
  (err, res) => {
    try {
      switch (res.topics[0]) {
        case startTopic:
          console.log(res);
          startTrade(res.address.toLowerCase(), res.data);
          break;
        case endTopic:
          console.log(res);
          endTrade(res.data);
          break;
        case failTopic:
          console.log(res);
          failTrade(res.data);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }
);
