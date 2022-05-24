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
    "0xae0f3b010cec518db205f5baf849b8865309bf52",
    0
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
    "0x9EE9474ADa6dd6308C7770c79f693AfE4050f53D"
  );

  const owner = await contract.chairperson();

  console.log(`Contract chairperson is : ${owner}`);
});
