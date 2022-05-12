import * as CaverExtKAS from 'caver-js-ext-kas';
import * as dotenv from 'dotenv';
dotenv.config();

// Cypress : 8217
// Baobab : 1001
const chainId: Number = 1001;
const caver = new CaverExtKAS(chainId, process.env.accessKeyId, process.env.secretAccessKey);
caver.initKASAPI(chainId, process.env.accessKeyId, process.env.secretAccessKey);
caver.initTokenHistoryAPI(chainId, process.env.accessKeyId, process.env.secretAccessKey);

export const getBlockNumber = async () => {
  const blockNumber: Number = await caver.rpc.klay.getBlockNumber();
  return blockNumber;
};

interface nftInfo {
  tokenId: Number;
  tokenUri: string;
}

export const getNFT = async (contractAddress: String, ownerAddress: String) => {
  //   const contractAddress: String = '0x1b0e9a44a4d7e1fa1e321bb6feadeb3ed6a9843a';
  //   const ownerAddress: String = '0xBEc3ccA3AbF992Ea770671E568BA8c2C90db271b';

  const result = await caver.kas.tokenHistory.getNFTListByOwner(contractAddress, ownerAddress);
  const arr: nftInfo[] = [];
  for (const elem of result.items) {
    const { tokenId, tokenUri } = elem;
    const temp: nftInfo = { tokenId: parseInt(tokenId, 16), tokenUri };
    arr.push(temp);
  }
  return arr;
};
