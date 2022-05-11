/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "baobab",
  networks: {
    baobab: {
      url: "https://kaikas.baobab.klaytn.net:8651",
      chainId: 1001,
    },
  },
  solidity: "0.5.12",
};
