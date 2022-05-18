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

const MyNFT = ({ data, setIsOpen, setModalData }) => {
  const navigate = useNavigate();

  const onCreateLoanClick = (event) => {
    navigate("/loans/create", { state: { data } });
  };

  const openModal = () => {
    setIsOpen(true);
    setModalData((prev) => data);
  };

  return (
    <CardWrapper>
      <FigureWrapper onClick={openModal}>
        <Figure fig={data.image} />
        <FigCaption>
          <Title>{`${data.projectName} #${data.tokenId}`}</Title>
          <Name>{data.team}</Name>
        </FigCaption>
      </FigureWrapper>
      <ButtonWrapper>
        <Button onClick={onCreateLoanClick}>Create a loan</Button>
      </ButtonWrapper>
    </CardWrapper>
  );
};

export default MyNFT;
