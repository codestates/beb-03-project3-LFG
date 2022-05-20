import React from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import TradeDescription from "../components/TradeDescription";
import TradeNFT from "../components/TradeNFT";
import { TradeWrapper, TradeMain, Button } from "../common";

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const OfferMain = styled(TradeMain)`
  & > div:first-child {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const TradeNFTWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

const KlayWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid tomato;
  padding: 0.75rem;
  justify-content: space-around;
  border-radius: 1rem;
  width: 7rem;
`;
const KlayIcon = styled.img.attrs({
  src: "https://s2.coinmarketcap.com/static/img/coins/64x64/4256.png",
})`
  width: 1.5rem;
  height: 1.5rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const Status = styled.div`
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const CreatedTrade = () => {
  const { setNftModal, setShow, user } = useOutletContext();
  const location = useLocation();
  const data = location.state.data;
  const {
    tradeId,
    offerAddress,
    respondAddress,
    offerNFTList,
    respondNFTList,
    offerPaidKlay,
    respondPaidKlay,
    status,
  } = data;

  const renderButton = () => {
    if (status !== "CREATED") {
      return;
    } else {
      if (user.toLowerCase() === offerAddress.toLowerCase()) {
        return <Button>Cancel</Button>;
      } else if (user.toLowerCase() === respondAddress.toLowerCase()) {
        return <Button>Accept Trade</Button>;
      }
    }
  };

  const renderStatus = () => {
    if (status === "CANCELLED") {
      return <Status>CANCELLED</Status>;
    } else if (status === "FINISHED") {
      return <Status>FINISHED</Status>;
    }
  };

  return (
    <Div>
      <TradeDescription />
      {renderStatus()}
      <TradeWrapper>
        <OfferMain>
          <div>What I Receive</div>
          <div>What you will get</div>
          <div>NFTs Offered ({respondNFTList.length})</div>
          <TradeNFTWrapper>
            {respondNFTList.map((nft, idx) => (
              <TradeNFT
                key={idx}
                nft={nft}
                setNftModal={setNftModal}
                setShow={setShow}
              />
            ))}
          </TradeNFTWrapper>
          <div>KLAY Offered</div>
          <KlayWrapper>
            <KlayIcon />
            {respondPaidKlay === "" ? 0 : respondPaidKlay}
          </KlayWrapper>
        </OfferMain>
        <OfferMain>
          <div>What I offer</div>
          <div>What you will give</div>
          <div>NFTs Offered ({offerNFTList.length})</div>
          <TradeNFTWrapper>
            {offerNFTList.map((nft, idx) => (
              <TradeNFT
                key={idx}
                nft={nft}
                setNftModal={setNftModal}
                setShow={setShow}
              />
            ))}
          </TradeNFTWrapper>
          <div>KLAY Offered</div>
          <KlayWrapper>
            <KlayIcon />
            {offerPaidKlay === "" ? 0 : offerPaidKlay}
          </KlayWrapper>
        </OfferMain>
        <ButtonWrapper>{renderButton()}</ButtonWrapper>
      </TradeWrapper>
    </Div>
  );
};

export default CreatedTrade;
