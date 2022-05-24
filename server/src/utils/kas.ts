import * as CaverExtKAS from 'caver-js-ext-kas';
import * as dotenv from 'dotenv';
dotenv.config();

const chainId: Number = Number(process.env.CHAIN_ID);
export const caver = new CaverExtKAS(chainId, process.env.accessKeyId, process.env.secretAccessKey);
caver.initKASAPI(chainId, process.env.accessKeyId, process.env.secretAccessKey);
caver.initTokenHistoryAPI(chainId, process.env.accessKeyId, process.env.secretAccessKey);

export const getBlockNumber = async () => {
  const blockNumber: Number = await caver.rpc.klay.getBlockNumber();
  return blockNumber;
};

interface nftInfo {
  tokenId: Number;
  tokenURI: string;
  nftAddress: string;
}

export const getNFT = async (contractAddress: String, ownerAddress: String) => {
  const arr: nftInfo[] = [];
  try {
    const result = await caver.kas.tokenHistory.getNFTListByOwner(contractAddress, ownerAddress);
    for (const elem of result.items) {
      const { tokenId, tokenUri } = elem;
      const temp: nftInfo = { tokenId: parseInt(tokenId, 16), tokenURI: tokenUri, nftAddress: '' };
      arr.push(temp);
    }
    return arr;
  } catch (error) {
    return arr;
  }
};
