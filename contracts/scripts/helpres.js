const { getContractAt } = require("@nomiclabs/hardhat-ethers/internal/helpers");

const getContract = async (contractName, hre, address) => {
  const [deployer] = await ethers.getSigners();
  return getContractAt(hre, contractName, address, deployer);
};

module.exports = { getContract };
