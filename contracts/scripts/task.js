const { task } = require("hardhat/config");
const { getContract } = require("./helpres.js");

task("deploy", "Deploys the Vote.sol contract").setAction(async function (
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
    "0x28A88C2d66F914A84eB042C2f4827F204141266b"
  );

  const owner = await contract.chairperson();

  console.log(`Contract chairperson is : ${owner}`);
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
