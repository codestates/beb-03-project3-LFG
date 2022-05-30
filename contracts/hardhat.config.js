/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-ethers");
require("./scripts/deploy.js");
require("./scripts/voteTask.js");
require("./scripts/nftTask.js");
require("./scripts/mainnet");
require("dotenv").config();

module.exports = {
  defaultNetwork: "baobab",
  networks: {
    cypress: {
      url: "https://public-node-api.klaytnapi.com/v1/cypress",
      chainId: 8217,
      accounts: [process.env.MAINNET_PRIVATE_KEY],
      gasPrice: 250000000000,
    },
    ganache: {
      url: "http://127.0.0.1:8545",
    },
    baobab: {
      url: "https://kaikas.baobab.klaytn.net:8651",
      chainId: 1001,
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 250000000000,
    },
  },
  solidity: "0.5.12",
};
