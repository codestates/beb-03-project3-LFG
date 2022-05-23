import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { Rootdiv, Button, TradeWrapper, TradeMain } from "../../common";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TradeDescription from "../../components/trade_detail/TradeDescription";

const Div = styled(Rootdiv)`
  height: 100vh;
`;

const WalletMain = styled(TradeMain)`
  & > div:first-child {
    font-size: 1.2rem;
    font-weight: bold;
  }

  & > div:nth-child(2) {
    text-align: center;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 32rem;

  display: flex;
  justify-content: center;

  & > div {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const WalletInput = styled.input.attrs((props) => ({
  value: props.value,
  onChange: props.onChange,
}))`
  width: 100%;
  outline: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  padding-left: 2.5rem;
`;

const IconWrapper = styled.div`
  height: 35px;
  width: 35px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const TradeApp = () => {
  const navigate = useNavigate();
  const { counterParty, setCounterParty, user } = useOutletContext();

  return (
    <Div>
      <TradeDescription />
      <TradeWrapper>
        <WalletMain>
          <div>Start a New P2P Trade</div>
          <div>
            Welcome to the Safest place on Solana to trade NFTs P2P. Each trade
            can contain up to 6 NFTs in verified collections. To start a P2P
            trade, enter the counterparty Solana wallet address below.
          </div>
          <div>Enter the Counterparty Wallet Address</div>
          <InputWrapper>
            <WalletInput
              value={counterParty}
              onChange={(e) => {
                setCounterParty(e.target.value);
              }}
            />
            <IconWrapper>
              <AccountBalanceWalletIcon />
            </IconWrapper>
          </InputWrapper>
        </WalletMain>
        <Button
          onClick={() => {
            if (!user) {
              alert("please login!");
              return;
            }

            try {
              if (
                window.caver.utils.isAddress(
                  window.caver.utils.toChecksumAddress(counterParty)
                )
              )
                navigate("/trade-create/add-counterparty-wallet");
            } catch (err) {
              alert(err);
            }
          }}
        >
          Start a Trade
        </Button>
      </TradeWrapper>
    </Div>
  );
};

export default TradeApp;
