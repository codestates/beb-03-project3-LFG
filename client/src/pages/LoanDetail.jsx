import React from "react";
import styled from "styled-components";
import NFTDetails from "../components/NFTDetails";
import LoanRequest from "../components/LoanRequest";
import { useLocation } from "react-router-dom";

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

const LoanDetail = ({ create, edit }) => {
  const location = useLocation();

  return (
    <DetailRootDiv>
      <NFTDetails data={location.state} />
      <LoanRequest create={create} edit={edit} />
    </DetailRootDiv>
  );
};

export default LoanDetail;
