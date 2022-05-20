import React from "react";
import styled from "styled-components";
import Table from "./Table";

const Wrapper = styled.div`
  width: 85%;
  margin: auto;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TableWrapper = styled.div`
  width: 100%;
  text-align: center;

  & > div:first-child {
    font-size: 1.2rem;
    font-weight: bold;
  }

  & > div:nth-child(3) {
    margin-top: 2rem;
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const TradeHistory = ({ tabs, nfts }) => {
  return (
    <Wrapper>
      <TableWrapper>
        <div>{tabs === 3 ? "Created Trades" : "Incoming Trades"}</div>
        <Table nfts={nfts.filter((nft) => nft.status === "CREATED")} />
        <div>Historical Trades</div>
        <Table nfts={nfts.filter((nft) => nft.status !== "CREATED")} />
      </TableWrapper>
    </Wrapper>
  );
};

export default TradeHistory;
