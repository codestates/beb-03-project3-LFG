import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
  useEffect(() => {}, []);

  return (
    <Div>
      <Description>Vote List</Description>
      <List>
        <Item
          onClick={() => {
            navigate("/vote-list/random-nft/0");
          }}
        >
          vault0
        </Item>
        <Item
          onClick={() => {
            navigate("/vote-list/random-nft/1");
          }}
        >
          vault1
        </Item>
      </List>
      <Description>Vote List For NFT Holders</Description>
      <List>
        <Item
          onClick={() => {
            navigate("/vote-list/nft-holder/0");
          }}
        >
          vote0
        </Item>
        <Item
          onClick={() => {
            navigate("/vote-list/nft-holder/1");
          }}
        >
          vote1
        </Item>
      </List>
    </Div>
  );
};

export default VoteList;
