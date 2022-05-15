import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  CardWrapper,
  FigureWrapper,
  Figure,
  FigCaption,
  Title,
  Name,
  Button,
} from "../common";

const ButtonWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MyNFT = ({ setIsOpen }) => {
  const navigate = useNavigate();

  const onCreateLoanClick = (event) => {
    navigate("/loans/0/create");
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <CardWrapper>
      <FigureWrapper onClick={openModal}>
        <Figure />
        <FigCaption>
          <Title>LFGTrader #0</Title>
          <Name>LFGTrader</Name>
        </FigCaption>
      </FigureWrapper>
      <ButtonWrapper>
        <Button onClick={onCreateLoanClick}>Create a loan</Button>
      </ButtonWrapper>
    </CardWrapper>
  );
};

export default MyNFT;
