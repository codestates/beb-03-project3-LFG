import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TradeWrapper, Button, TradeMain } from "../common";
import TradeDescription from "../components/TradeDescription";
import AddNFTs from "../components/AddNFTs";
import AddNFTsModal from "../components/AddNFTsModal";
import TradeNFT from "../components/TradeNFT";
import { useNavigate, useOutletContext } from "react-router-dom";

const Div = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const OfferMain = styled(TradeMain)`
  & > div {
    text-align: center;
  }

  & > div:first-child {
    font-size: 1.4rem;
  }

  & > div:nth-child(3) {
    font-size: 1.2rem;
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;
const KLAYInput = styled.input.attrs((props) => ({
  value: props.value,
  onChange: props.onChange,
  placeholder: "Enter amount..",
}))`
  width: 100%;
  outline: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  padding-left: 3rem;

  text-align: right;
`;

const KlayImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 2.2rem;

  height: 35px;
  width: 35px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const KlayImage = styled.img.attrs({
  src: "https://s2.coinmarketcap.com/static/img/coins/64x64/4256.png",
})`
  width: 24px;
  height: 24px;
  margin-right: 0.2rem;
`;

const Border = styled.div`
  width: 1px;
  border-right: 1px solid black;
  height: 20px;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const BalanceWrapper = styled.div`
  text-align: left;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const TradeNFTWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

const IOffer = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const {
    counterParty,
    receives,
    offers,
    setOffers,
    setNftModal,
    setShow,
    user,
  } = useOutletContext();

  useEffect(() => {
    if (!user || counterParty === "") {
      navigate("/");
    }

    if (receives.nfts.length === 0) {
      navigate("/");
    }
  });

  return (
    <Div>
      <TradeDescription />
      <TradeWrapper>
        <OfferMain>
          <div>What I Offer</div>
          <div>
            Select NFTs and/or KLAY that you offer. Your offered NFTs and tokens
            will go into escrow until the counterparty accepts. You can cancel
            and withdraw your offer any time from
          </div>

          <div>
            NFTs{" "}
            {offers.nfts.length === 0
              ? null
              : `(${offers.nfts.length}) selected`}
          </div>
          {offers.nfts.length === 0 ? (
            <AddNFTs setIsOpen={setIsOpen} />
          ) : (
            <>
              <TradeNFTWrapper>
                {offers.nfts.map((nft, idx) => (
                  <TradeNFT
                    key={idx}
                    nft={nft}
                    setNftModal={setNftModal}
                    setShow={setShow}
                    setReceives={setOffers}
                  />
                ))}
              </TradeNFTWrapper>
              <Button
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Edit NFT selection...
              </Button>
            </>
          )}
          <div>KLAY {offers.klay === "" ? null : `(${offers.klay} KLAY)`}</div>
          <InputWrapper>
            <KLAYInput
              value={offers.klay}
              onChange={(e) => {
                const regExp = /^[0-9]*\.?[0-9]*$/;
                if (!regExp.test(e.target.value)) return;
                setOffers((prev) => {
                  return {
                    ...prev,
                    klay: e.target.value,
                  };
                });
              }}
            />
            <KlayImageWrapper>
              <KlayImage />
              KLAY
              <Border />
            </KlayImageWrapper>
            <BalanceWrapper>Balance:</BalanceWrapper>
          </InputWrapper>
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
            onClick={() => {
              if (offers.nfts.length === 0 && offers.klay === "") {
                alert("choose your offer");
                return;
              }

              navigate("/trade-create/confirm-trade");
            }}
          >
            Proceed to Your Offer
          </Button>
        </ButtonWrapper>
      </TradeWrapper>
      {isOpen ? (
        <AddNFTsModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setConditions={setOffers}
          selectedNFTs={offers.nfts}
          user={user}
          counterParty={counterParty}
          isReceive={false}
        />
      ) : null}
    </Div>
  );
};

export default IOffer;
