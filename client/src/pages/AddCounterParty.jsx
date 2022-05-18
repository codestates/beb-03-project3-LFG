import React from "react";
import styled from "styled-components";
import TradeDescription from "../components/TradeDescription";

const Div = styled.div`
  height: 100vh;
`;

const AddCounterParty = () => {
  return (
    <Div>
      <TradeDescription />
    </Div>
  );
};

export default AddCounterParty;
