import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAgendas, getVaults } from "../../common";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Description = styled.div`
  padding: 1rem;
  margin-top: 95px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  background-color: var(--main-theme);
  width: 800px;
  padding: 1rem;
  gap: 0.75rem;
  border-radius: 1rem;
`;

const Item = styled.div`
  cursor: pointer;
  background-color: tomato;
  padding: 0.75rem;
`;

const VoteList = () => {
  const navigate = useNavigate();
  const [vaultList, setVaultList] = useState([]);
  const [agendaList, setAgendaList] = useState([]);
  useEffect(() => {
    getVaults(setVaultList);
    getAgendas(setAgendaList);
  }, []);

  return (
    <Div>
      <Description>Vote List</Description>
      <List>
        {vaultList.map((vault, idx) => (
          <Item
            key={idx}
            onClick={() => {
              navigate(`/vote-list/random-nft/${vault._id}`);
            }}
          >
            {vault.title}
          </Item>
        ))}
      </List>
      <Description>Vote List For NFT Holders</Description>
      <List>
        {agendaList.map((agenda, idx) => (
          <Item
            key={agenda.agendaId}
            onClick={() => {
              navigate(`/vote-list/nft-holder/${agenda.agendaId}`);
            }}
          >
            {agenda.title}
          </Item>
        ))}
      </List>
    </Div>
  );
};

export default VoteList;
