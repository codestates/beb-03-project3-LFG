import axios from "axios";

export const getVaults = async (setVaultList) => {
  const response = await axios.get("http://127.0.0.1:4002/vote/season");

  if (response.data.message === "succeed") {
    setVaultList((prev) => response.data.list);
  } else {
    return;
  }
};

export const getVault = async (id, setSeason) => {
  const response = await axios.get(`http://127.0.0.1:4002/vote/season/${id}`);

  if (response.data.message === "succeed") {
    setSeason((prev) => response.data.season);
  }
};

export const voteToCandid = async (id, addr, user) => {
  await axios.post(`http://127.0.0.1:4002/vote/season/${id}`, {
    userAddress: user.toLowerCase(),
    nftAddress: addr,
  });
};
