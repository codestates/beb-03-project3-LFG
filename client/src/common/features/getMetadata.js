import axios from "axios";

export const checkIpfs = async (url) => {
  if (url.startsWith("ipfs")) {
    let woIpfs = url.slice(7);
    return "https://dweb.link/ipfs/" + woIpfs;
  } else {
    return url;
  }
};

export const getMetadata = async (url) => {
  let fixed_url = await checkIpfs(url);

  const result = await axios.get(fixed_url);

  return result;
};
