import React from "react";
import Footer from "../components/Footer";
import styled from "styled-components";

const Main = styled.div`
  flex: 1 1 0;
  padding: 12rem 20rem 3rem 20rem;
`;

const MainDescription = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  gap: 5rem;
  justify-content: center;

  @media (max-width: 1000px) {
    flex-direction: column;
    justify-content: stretch;
  }
`;

const Description = styled.div``;
const NFT = styled.div`
  width: 20rem;
  height: 20rem;
  background-image: url("/test/azukimain.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  transform: rotate(15deg);
  z-index: -100;
`;

const Home = () => {
  return (
    <>
      <Main>
        <MainDescription>
          <Description>
            <p>
              Collateralize
              <br />
              & Trade
              <br />
              Klaytn NFTs
              <br />
            </p>
            The safest place on Klaytn to Collateralize & Trade your NFTs
          </Description>
          <NFT />
        </MainDescription>
      </Main>
      <Footer />
    </>
  );
};

export default Home;
