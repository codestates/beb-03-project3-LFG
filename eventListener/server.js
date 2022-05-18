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
} = require('./config/topics');
const {
  openLoanRequest,
  cancelLoan,
  editLoan,
  fundLoan,
  repayLoan,
  liquidateLoan,
} = require('./service/listenService');

// db 연결 지속 위해 사용
setInterval(async () => {
  try {
    const blockNumber = await caver.rpc.klay.getBlockNumber();
    // console.log(blockNumber);
  } catch (e) {
    console.log(e);
  }
}, 30000);

const subscrpition = caver.rpc.klay.subscribe(
  'logs',
  {
    topics: [[deployTopic, cancelTopic, editTopic, fundTopic, repayTopic, defaultTopic]],
  },
  (err, res) => {
    try {
      switch (res.topics[0]) {
        case deployTopic:
          console.log(res);
          openLoanRequest(res.data);
          break;
        case cancelTopic:
          console.log(res);
          cancelLoan(res.address);
          break;
        case editTopic:
          console.log(res);
          editLoan(res.address, res.data);
          break;
        case fundTopic:
          console.log(res);
          fundLoan(res.address, res.data);
          break;
        case repayTopic:
          console.log(res);
          repayLoan(res.address, res.data);
          break;
        case defaultTopic:
          console.log(res);
          liquidateLoan(res.address);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(err);
      return;
    }
  }
);
