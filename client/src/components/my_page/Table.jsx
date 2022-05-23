import React from "react";
import styled from "styled-components";
import Row from "./Row";

const Wrapper = styled.section`
  margin-top: 1rem;
  background-color: var(--main-theme);
  border-radius: 1rem;

  display: grid;
  grid-template-columns: 3fr 2fr 2fr 2fr 8fr;

  & > div {
    padding-left: 1rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    display: flex;
    align-items: center;
  }
`;

const RecTitle = styled.div`
  grid-column: 1 / span 2;
  background-color: tomato;
  border-top-left-radius: 1rem;
`;

const OffTitle = styled.div`
  grid-column: 3 / span 3;
  background-color: #e4a598;
  border-top-right-radius: 1rem;
`;

const RecNfts = styled.div`
  grid-column: 1 / span 1;
  background-color: tomato;
`;

const RecKlay = styled.div`
  grid-column: 2 / span 1;
  background-color: tomato;
`;

const OffNfts = styled.div`
  grid-column: 3 / 4;
  background-color: #e4a598;
`;

const OffKlay = styled.div`
  grid-column: 4 / 5;
  background-color: #e4a598;
`;

const From = styled.div`
  grid-column: 5 / 6;
  background-color: #e4a598;
`;

const NoTrade = styled.div`
  grid-column: 1 / 6;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TradeDataWraper = styled.div`
  grid-column: 1 / 6;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  & > div {
    width: 100%;
  }
`;

const Table = ({ nfts }) => {
  return (
    <Wrapper>
      <RecTitle>What I Receive</RecTitle>
      <OffTitle>What I Offer</OffTitle>
      <RecNfts>NFT(s)</RecNfts>
      <RecKlay>KLAY</RecKlay>
      <OffNfts>NFT(s)</OffNfts>
      <OffKlay>KLAY</OffKlay>
      <From>OfferFrom</From>
      {nfts.length === 0 ? (
        <NoTrade>No trades found</NoTrade>
      ) : (
        <TradeDataWraper>
          {nfts.map((data, idx) => (
            <Row key={idx} data={data} />
          ))}
        </TradeDataWraper>
      )}
    </Wrapper>
  );
};

export default Table;
