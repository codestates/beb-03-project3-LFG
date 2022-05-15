import React from "react";
import styled from "styled-components";
import NFTDetails from "../components/NFTDetails";
import LoanRequest from "../components/LoanRequest";

const DetailRootDiv = styled.div`
  display: flex;
  margin: auto;
  gap: 5rem;
  margin-bottom: 1rem;

  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 0;
  }
`;

const LoanEdit = () => {
  return (
    <DetailRootDiv>
      <NFTDetails />
      <LoanRequest edit={true} />
    </DetailRootDiv>
  );
};

export default LoanEdit;
