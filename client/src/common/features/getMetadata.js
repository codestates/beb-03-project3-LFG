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

  let uri = tokenURI.startsWith("ipfs") ? ipfsToHttp(tokenURI) : tokenURI;

  const metadataResponse = await axios.get(uri);

  let contentURI = metadataResponse.data.image.startsWith("ipfs")
    ? ipfsToHttp(metadataResponse.data.image)
    : metadataResponse.data.image;

  const contentResponse = await axios.get(contentURI);

  let type = contentResponse.headers["content-type"];
  return {
    ...metadataResponse.data,
    image: contentURI,
    type,
  };
};
