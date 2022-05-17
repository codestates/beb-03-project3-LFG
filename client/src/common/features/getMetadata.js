import axios from "axios";

export const getMetadata = async (url) => {
  const result = await axios.get(url);

  return result;
};
