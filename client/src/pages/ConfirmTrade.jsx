import React from "react";
import styled from "styled-components";
import TradeDescription from "../components/TradeDescription";

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const ConfirmTrade = () => {
  return (
    <Div>
      <TradeDescription />
    </Div>
  );
};

export default ConfirmTrade;
