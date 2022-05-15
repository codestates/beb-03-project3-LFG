import React from "react";
import styled from "styled-components";
import MyNFT from "./MyNFT";

const ListWrapper = styled.div`
  width: 85%;
  margin: auto;
`;

const Title = styled.div`
  font-size: 1.3rem;
`;

const Gallery = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
  margin-bottom: 3rem;

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

const MyNFTs = ({ setIsOpen }) => {
  return (
    <ListWrapper>
      <Title>My Wallet</Title>
      <Gallery>
        {Array(10)
          .fill(0)
          .map((_, idx) => (
            <MyNFT key={idx} setIsOpen={setIsOpen} />
          ))}
      </Gallery>
    </ListWrapper>
  );
};

export default MyNFTs;
