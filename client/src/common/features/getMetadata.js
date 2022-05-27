import axios from "axios";
import CID from "cids";

export const ipfsToHttp = (uri) => {
  let str = uri.slice(7).split("/");
  let cid0, cid1;

  cid0 = str[0];
  cid1 = new CID(cid0).toV1().toString("base32");

  return "https://dweb.link/ipfs/" + cid1 + "/" + str.slice(1).join("/");
};

export const getMetadata = async (uri) => {
  if (uri.startsWith("ipfs")) {
    uri = ipfsToHttp(uri);
  }

  const result = await axios.get(uri);

  return result;
};

export const setNFTData = async (tokenURI) => {
  if (tokenURI.startsWith("ipfs")) {
    tokenURI = ipfsToHttp(tokenURI);
  }

  const metadataResponse = await axios.get(tokenURI);
  const contentResponse = await axios.get(metadataResponse.data.image);

  let type = contentResponse.headers["content-type"];
  return {
    ...metadataResponse.data,
    type,
  };
};
