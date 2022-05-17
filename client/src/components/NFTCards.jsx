import React from "react";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";
import NFTCard from "./NFTCard";

const CardsWrapper = styled.div`
  flex: 1 1 0;

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (min-width: 1000px) {
    padding-left: 1rem;
    gap: 1rem;
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  @media (min-width: 1536px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;

const NFTCards = ({ nfts }) => {
  return (
    <CardsWrapper>
      {nfts ? (
        nfts.map((nft, idx) => <NFTCard key={idx} nft={nft} />)
      ) : (
        <LoadingSpinner />
      )}
    </CardsWrapper>
  );
};

export default NFTCards;
