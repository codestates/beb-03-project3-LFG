import React from "react";
import LoanDescription from "../components/LoanDescription";
import Filter from "../components/Filter";
import NFTCards from "../components/NFTCards";
import { Rootdiv } from "../common/styles";
import styled from "styled-components";

const Gallery = styled.div`
  display: flex;
  padding-top: 3rem;
  padding-left: 10rem;
  padding-right: 5rem;
  gap: 4rem;

  @media (max-width: 1000px) {
    flex-direction: column;
    padding-left: 3rem;
    padding-right: 3rem;
  }
`;

const LoanList = () => {
  return (
    <Rootdiv>
      <LoanDescription />
      <Gallery>
        <Filter />
        <NFTCards />
      </Gallery>
    </Rootdiv>
  );
};

export default LoanList;
