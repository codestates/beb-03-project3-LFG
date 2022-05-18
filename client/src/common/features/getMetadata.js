import axios from "axios";

export const getMetadata = async (url) => {
  if (url.startsWith("ipfs")) {
    let left = url.slice(7);
    let fixed_url = "https://dweb.link/ipfs/" + left;

    const result = await axios.get(fixed_url);

    return result;
  } else {
    const result = await axios.get(url);

    return result;
  }
};
