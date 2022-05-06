import React from "react";
import styled from "styled-components";
import NFTCard from "./NFTCard";

const CardsWrapper = styled.div`
  flex: 1 1 0;
`;

const NFTCards = () => {
  return (
    <CardsWrapper>
      {new Array(50).fill(0).map((card, idx) => (
        <NFTCard key={idx} />
      ))}
    </CardsWrapper>
  );
};

export default NFTCards;
