import React from "react";
import styled from "styled-components";

const DescriptionWrapper = styled.div`
  padding-top: var(--nav-bar-height);

  border-bottom: 1px solid black;
`;

const DescMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.75rem;
  gap: 1rem;

  & > div:first-child {
    font-size: 1.3rem;
    font-weight: bold;
  }
`;

const TradeDescription = () => {
  return (
    <DescriptionWrapper>
      <DescMain>
        <div>P2P NFT Trading App</div>
        <div>The safest place on Klaytn to trade verifid NFTs</div>
        <div>Counterparty, Their Offer, Your Offer, Confirmation</div>
      </DescMain>
    </DescriptionWrapper>
  );
};

export default TradeDescription;
