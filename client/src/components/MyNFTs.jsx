import React from "react";
import styled from "styled-components";

const ListWrapper = styled.div`
  width: 85%;
  margin: auto;
`;

const Title = styled.div`
  font-size: 1.3rem;
`;

const Gallery = styled.div`
  margin-top: 1rem;
`;

const MyNFTs = () => {
  return (
    <ListWrapper>
      <Title>My Wallet</Title>
      <Gallery></Gallery>
    </ListWrapper>
  );
};

export default MyNFTs;
