import React, { useEffect } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import TradeDescription from "../../components/trade_detail/TradeDescription";
import TradeNFT from "../../components/trade_detail/TradeNFT";
import {
  TradeWrapper,
  TradeMain,
  Button,
  CancelTrade,
  AcceptTrade,
} from "../../common";

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
  const navigate = useNavigate();

  const renderButton = () => {
    if (status !== "CREATED") {
      return;
    } else {
      if (user.toLowerCase() === offerAddress.toLowerCase()) {
        return (
          <Button
            onClick={async () => {
              await CancelTrade(tradeId, user);
              navigate("/profile/wallet");
            }}
          >
            Cancel
          </Button>
        );
      } else if (user.toLowerCase() === respondAddress.toLowerCase()) {
        return (
          <Button
            onClick={async () => {
              await AcceptTrade(tradeId, user, respondNFTList, respondPaidKlay);
              navigate("/profile/wallet");
            }}
          >
            Accept Trade
          </Button>
        );
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

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    if (
      !(
        user?.toLowerCase() === respondAddress ||
        user?.toLowerCase() === offerAddress
      )
    ) {
      navigate("/");
    }
  }, [navigate, user, respondAddress, offerAddress]);

  return (
    <Div>
      <TradeDescription />
      {renderStatus()}
      <TradeWrapper>
        <OfferMain>
          <div>What I Receive</div>
          <div>What you will get</div>
          <div>
            NFTs Offered (
            {user.toLowerCase() === respondAddress.toLowerCase()
              ? offerNFTList.length
              : respondNFTList.length}
            )
          </div>
          <TradeNFTWrapper>
            {user.toLowerCase() === respondAddress.toLowerCase()
              ? offerNFTList.map((nft, idx) => (
                  <TradeNFT
                    key={idx}
                    nft={nft}
                    setNftModal={setNftModal}
                    setShow={setShow}
                  />
                ))
              : respondNFTList.map((nft, idx) => (
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
            {user.toLowerCase() === respondAddress.toLowerCase()
              ? offerPaidKlay === ""
                ? 0
                : offerPaidKlay
              : respondPaidKlay === ""
              ? 0
              : respondPaidKlay}
          </KlayWrapper>
        </OfferMain>
        <OfferMain>
          <div>What I offer</div>
          <div>What you will give</div>
          <div>
            NFTs Offered (
            {user.toLowerCase() === respondAddress.toLowerCase()
              ? respondNFTList.length
              : offerNFTList.length}
            )
          </div>
          <TradeNFTWrapper>
            {user.toLowerCase() === respondAddress.toLowerCase()
              ? respondNFTList.map((nft, idx) => (
                  <TradeNFT
                    key={idx}
                    nft={nft}
                    setNftModal={setNftModal}
                    setShow={setShow}
                  />
                ))
              : offerNFTList.map((nft, idx) => (
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
            {user.toLowerCase() === respondAddress.toLowerCase()
              ? respondPaidKlay === ""
                ? 0
                : respondPaidKlay
              : offerPaidKlay === ""
              ? 0
              : offerPaidKlay}
          </KlayWrapper>
        </OfferMain>
        <ButtonWrapper>{renderButton()}</ButtonWrapper>
      </TradeWrapper>
    </Div>
  );
};

export default CreatedTrade;
