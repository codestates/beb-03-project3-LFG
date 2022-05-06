import React from "react";
import styled from "styled-components";

const Main = styled.div`
  flex: 1 1 0;
  padding: 12rem 20rem 3rem 20rem;
`;

const MainDescription = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
`;

const Description = styled.div``;

const Home = () => {
  return (
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
      </MainDescription>
    </Main>
  );
};

export default Home;
