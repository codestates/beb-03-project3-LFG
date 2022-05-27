import axios from "axios";
import { checkClosed, getPossibleTokenIdToVote, getVotes } from "./vote";

export const getVaults = async (setVaultList) => {
  const response = await axios.get(
    "http://ec2-3-101-79-116.us-west-1.compute.amazonaws.com:4002/vote/season"
  );

  if (response.data.message === "succeed") {
    setVaultList((prev) => response.data.list);
  } else {
    return;
  }
};

export const getVault = async (id, setSeason) => {
  const response = await axios.get(
    `http://ec2-3-101-79-116.us-west-1.compute.amazonaws.com:4002/vote/season/${id}`
  );

  if (response.data.message === "succeed") {
    setSeason((prev) => response.data.season);
  }
};

export const voteToCandid = async (id, addr, user) => {
  await axios.post(
    `http://ec2-3-101-79-116.us-west-1.compute.amazonaws.com:4002/vote/season/${id}`,
    {
      userAddress: user.toLowerCase(),
      nftAddress: addr,
    }
  );
};

export const getAgendas = async (setAgendaList) => {
  const response = await axios.get(
    "http://ec2-3-101-79-116.us-west-1.compute.amazonaws.com:4002/vote/agenda"
  );

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
  setIsClosed,
  setPossibleTokenIds
) => {
  const response = await axios.post(
    `http://ec2-3-101-79-116.us-west-1.compute.amazonaws.com:4002/vote/agenda/${id}`,
    {
      userAddress: user,
    }
  );

  if (response.data.message === "succeed") {
    setAgenda((prev) => response.data.agenda);
    setTokenIds((prev) => response.data.tokenList);

    getVotes(response.data.agenda.agendaAddress, setProsCons);
    checkClosed(response.data.agenda.agendaAddress, setIsClosed);
    getPossibleTokenIdToVote(
      response.data.tokenList,
      response.data.agenda.agendaAddress,
      setPossibleTokenIds
    );
  } else {
    return;
  }
};
