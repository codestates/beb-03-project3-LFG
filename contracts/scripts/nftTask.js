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
// https://themetakongz.com/kongz/metadata -> CORS ERROR
// https://miya.sunmiya.club
// https://grilla-data.by-syl.com/json
// ipfs://QmbAeKg7RuWW1YaoADLRmnd2trX6xebjqMeEECd8SHLsqE

// 재영 0x958e4125a195374104b92F97d3f0211aE98C8FC5
// 보성 0xF5421BE9Ddd7f26a86a82A8ef7D4161F7d4461B6
// 영준 0xBEc3ccA3AbF992Ea770671E568BA8c2C90db271b
// 민권 0xd5792936d4230b575342e08E3D5406029487Ee48

// 메타콩즈 0x4f0aeD3e4c6192250b1b1a3c275Fd9F1Ef81974D
// 선미야 0xB8d71235403a3d762812548898704452B62b4234
// Grilla 0xEdFC9fa2287FB153fFf1e9c26B297b9638759ff4
// Oasis 0xc62Cd15Da898E7c9145f30d2D1311C8c9cB45b9A
