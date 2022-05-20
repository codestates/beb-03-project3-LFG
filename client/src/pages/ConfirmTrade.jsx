import React, { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import {
  TradeMain,
  TradeWrapper,
  Button,
  ConfirmTrade as Confirm,
} from "../common";
import TradeDescription from "../components/TradeDescription";
import TradeNFT from "../components/TradeNFT";

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

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
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

const ConfirmTrade = () => {
  const { counterParty, receives, offers, setNftModal, setShow, user } =
    useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || counterParty === "") {
      navigate("/trade-create");
    }

    if (
      receives.nfts.length === 0 ||
      (offers.nfts.length === 0 && offers.nfts.klay === "")
    ) {
      navigate("/trade-create");
    }
  });

  return (
    <Div>
      <TradeDescription />
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        The counterparty will be able to see the offer at Incoming Offers
      </div>
      <TradeWrapper>
        <OfferMain>
          <div>What I Receive</div>
          <div>What you will get</div>
          <div>NFTs Offered ({receives.nfts.length})</div>
          <TradeNFTWrapper>
            {receives.nfts.map((nft, idx) => (
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
            {receives.klay === "" ? 0 : receives.klay}
          </KlayWrapper>
        </OfferMain>
        <OfferMain>
          <div>What I offer</div>
          <div>What you will give</div>
          <div>NFTs Offered ({offers.nfts.length})</div>
          <TradeNFTWrapper>
            {offers.nfts.map((nft, idx) => (
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
            {offers.klay === "" ? 0 : offers.klay}
          </KlayWrapper>
        </OfferMain>
        <ButtonWrapper>
          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
          <Button
            onClick={async () => {
              await Confirm(user, counterParty, offers, receives);
              navigate("/profile/wallet");
            }}
          >
            Confirm Offer
          </Button>
        </ButtonWrapper>
      </TradeWrapper>
    </Div>
  );
};

export default ConfirmTrade;
