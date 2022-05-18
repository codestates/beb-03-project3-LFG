import React from "react";
import styled from "styled-components";
import { TradeWrapper, Button } from "../common";

const Div = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

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

const OfferMain = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--main-theme);
  justify-content: center;
  align-items: center;
`;

const InputWrapper = styled.div``;

const TradeDescription = () => {
  return (
    <Div>
      <DescriptionWrapper>
        <DescMain>
          <div>P2P NFT Trading App</div>
          <div>The safest place on Klaytn to trade verifid NFTs</div>
          <div>Counterparty, Their Offer, Your Offer, Confirmation</div>
        </DescMain>
      </DescriptionWrapper>
      <TradeWrapper>
        <OfferMain>
          <div>What I Receive</div>
          <div>
            Select NFTs and/or KLAY that you would like to receive from the
            counterparty
          </div>
          <div>NFTs</div>
          <div>
            <div>
              NFTs will appear here. Press the button below to browse and add
              NFTs
            </div>
            <Button>Add NFTs..</Button>
          </div>
          <div>KLAY</div>
          <InputWrapper>
            <div>Balance:</div>
          </InputWrapper>
        </OfferMain>
        <div>
          <Button>Back</Button>
          <Button>Proceed to Your Offer</Button>
        </div>
      </TradeWrapper>
    </Div>
  );
};

export default TradeDescription;
