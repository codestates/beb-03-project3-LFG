import axios from "axios";
import { checkClosed, getVotes } from "./vote";

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

export const getAgendas = async (setAgendaList) => {
  const response = await axios.get("http://127.0.0.1:4002/vote/agenda");

  if (response.data.message === "succeed") {
    setAgendaList((prev) => response.data.list);
  } else {
    return;
  }
};

export const getAgendaInformation = async (
  id,
  user,
  setAgenda,
  setTokenIds,
  setProsCons,
  setIsClosed
) => {
  const response = await axios.post(`http://127.0.0.1:4002/vote/agenda/${id}`, {
    userAddress: user,
  });

  if (response.data.message === "succeed") {
    setAgenda((prev) => response.data.agenda);
    setTokenIds((prev) => response.data.tokenList);

    getVotes(response.data.agenda.agendaAddress, setProsCons);
    checkClosed(response.data.agenda.agendaAddress, setIsClosed);
  } else {
    return;
  }
};
