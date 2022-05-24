import axios from "axios";
import CID from "cids";

export const checkIpfs = (url) => {
  if (url.startsWith("ipfs")) {
    let str = url.slice(7).split("/");
    let cid0 = str[0];
    let cid1 = new CID(cid0).toV1().toString("base32");

    return "https://dweb.link/ipfs/" + cid1 + "/" + str.slice(1).join("/");
  } else {
    return url;
  }
};

export const getMetadata = async (url) => {
  let fixed_url = checkIpfs(url);

  const result = await axios.get(fixed_url);

  return result;
};
