const { task } = require("hardhat/config");
const { getContract } = require("./helpers.js");

task("vote deploy", "Deploys the Vote.sol contract").setAction(async function (
  taskArguments,
  hre
) {
  const [deployer] = await ethers.getSigners();

  const voteContractFactory = await hre.ethers.getContractFactory(
    "Vote",
    deployer
  );
  const vote = await voteContractFactory.deploy(
    "0xe6f023036c06862d9a8e00cea169653f1cb1ab14",
    1
  );
  console.log(`Contract deployed to address: ${vote.address}`);
});

task("owner", "Get the chairperson of the vote").setAction(async function (
  taskArguments,
  hre
) {
  const contract = await getContract(
    "Vote",
    hre,
    "0x67b3d383559E2c3E00abDED3E9cDf13c485e02EF"
  );

  const owner = await contract.chairperson();

  console.log(`Contract chairperson is : ${owner}`);
});

task("vote", "vote").setAction(async function (taskArguments, hre) {
  const contract = await getContract(
    "Vote",
    hre,
    "0x67b3d383559E2c3E00abDED3E9cDf13c485e02EF"
  );

  const receipt = await contract.vote([5], 0);

  console.log(receipt);
});

task("isIdVoted", "check isVoted").setAction(async function (
  taskArguments,
  hre
) {
  const contract = await getContract(
    "Vote",
    hre,
    "0x67b3d383559E2c3E00abDED3E9cDf13c485e02EF"
  );

  const receipt = await contract.isIdVoted(5);

  console.log(receipt);
});

task("close", "close the vote").setAction(async function (taskArguments, hre) {
  const contract = await getContract(
    "Vote",
    hre,
    "0x1a92b5f978a2391d7a6d9b5c0084b96e667bcadb"
  );

  const receipt = await contract.closeVote();
  console.log(receipt);
});
