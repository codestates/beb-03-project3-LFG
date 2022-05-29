const { task } = require("hardhat/config");

task("deploy", "Helper, LoanFactory deploy").setAction(async function (
  taskArguments,
  hre
) {
  const [deployer] = await ethers.getSigners();
  const helperContractFactory = await hre.ethers.getContractFactory(
    "Helper",
    deployer
  );
  const loanFactory_Factory = await hre.ethers.getContractFactory(
    "LoanFactory",
    deployer
  );

  const helperContract = await helperContractFactory.deploy();
  const loanFactoryContract = await loanFactory_Factory.deploy();

  console.log(`Helper Contract deployed to address: ${helperContract.address}`);
  console.log(
    `LoanFactory deployed to address: ${loanFactoryContract.address}`
  );
});

/**
 * Helper Contract deployed to address: 0xdE8f4743F036BC8F6C8bAd19EB624E78B5bd5A33
 * LoanFactory deployed to address: 0x39fc2b6e139C7EbE17eaD8a9508fC2dA460aB08b
 */
