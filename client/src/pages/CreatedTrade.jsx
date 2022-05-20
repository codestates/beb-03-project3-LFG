import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
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

const CreatedTrade = () => {
  const { setNftModal, setShow, user } = useOutletContext();
  const location = useNavigate();
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
      if (user.toLowercase() === offerAddress.toLowercase()) {
        return <Button>Cancel</Button>;
      } else if (user.toLowercase() === respondAddress.toLowercase()) {
        return <Button>Accept Trade</Button>;
      }
    }
  };

  return (
    <Div>
      <TradeDescription />
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
