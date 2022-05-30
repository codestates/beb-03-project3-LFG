const { task } = require("hardhat/config");
const Caver = require("caver-js");

task("getBalance", "get Signer of Mainnet").setAction(async function (
  taskArguments,
  hre
) {
  const caver = new Caver("https://public-node-api.klaytnapi.com/v1/cypress");
  // const wallet = caver.wallet.newKeyring(
  //   "0xAD3A9AB47Add4702Eb329C76eAA053927832057D",
  //   process.env.MAINNET_PRIVATE_KEY
  // );

  const balance = await caver.klay.getBalance(
    "0xAD3A9AB47Add4702Eb329C76eAA053927832057D"
  );

  console.log(balance);
});
