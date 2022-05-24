/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-ethers");
require("./scripts/task.js");

module.exports = {
  defaultNetwork: "ganache",
  networks: {
    ganache: {
      url: "http://127.0.0.1:8545",
    },
    baobab: {
      url: "https://kaikas.baobab.klaytn.net:8651",
      chainId: 1001,
      accounts: [
        "0xb54670eaa14c403526fb71441acd1cbed2e82b79d950509f2e7bc6b6e998f2ea",
      ],
      gasPrice: 250000000000,
    },
  },
  solidity: "0.5.12",
};
