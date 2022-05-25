const { task } = require("hardhat/config");
const { getContract } = require("./helpers.js");

task("test nft deploy", "Deploy the test nft")
  .addPositionalParam("name")
  .addPositionalParam("symbol")
  .addPositionalParam("baseTokenURI")
  .setAction(async function (taskArguments, hre) {
    const [deployer] = await ethers.getSigners();
    const nftContractFactory = await hre.ethers.getContractFactory(
      "TestNFT",
      deployer
    );

    const { name, symbol, baseTokenURI } = taskArguments;
    const nftContract = await nftContractFactory.deploy(
      name,
      symbol,
      baseTokenURI
    );

    console.log(`Contract deployed to address: ${nftContract.address}`);
  });

task("tokenURI", "Get TokenURI of id")
  .addPositionalParam("contractAddress")
  .addPositionalParam("contractName")
  .addPositionalParam("id")
  .setAction(async function (taskArguments, hre) {
    const { contractAddress, id, contractName } = taskArguments;
    const contract = await getContract(contractName, hre, contractAddress);

    const uri = await contract.tokenURI(id);
    console.log(uri);
  });
task("mint", "Mint the test nft")
  .addPositionalParam("contractAddress")
  .addPositionalParam("contractName")
  .addPositionalParam("recipient")
  .setAction(async function (taskArguments, hre) {
    const { contractAddress, recipient, contractName } = taskArguments;
    const contract = await getContract(contractName, hre, contractAddress);

    const receipt = await contract.mint(recipient);
    console.log(receipt);
  });

// baseURI candidate
// https://themetakongz.com/kongz/metadata
// https://miya.sunmiya.club/
// https://grilla-data.by-syl.com/json/
