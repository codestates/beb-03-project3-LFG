import React from "react";
import Footer from "../components/common/Footer";
import styled from "styled-components";
import HomeCard from "../components/common/HomeCard";

const Main = styled.div`
  flex: 1 1 0;
  padding: 12rem 15rem 3rem 15rem;
  z-index: -1;
`;

const MainDescription = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  gap: 5rem;
  justify-content: center;

  @media (max-width: 1450px) {
    flex-direction: column;
    justify-content: stretch;
  }
`;

const Description = styled.div`
  & > p {
    font-size: 2.6rem;
  }

  & > p > span {
    color: var(--main-theme);
  }

  & > span {
    font-size: 1.5rem;
  }
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
              <span>Klaytn NFTs</span>
              <br />
            </p>
            <span>
              The safest place on Klaytn to Collateralize & Trade your NFTs
            </span>
          </Description>
          <HomeCard />
        </MainDescription>
      </Main>
      <Footer />
    </>
  );
};

export default Home;
