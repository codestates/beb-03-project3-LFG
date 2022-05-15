import React from "react";
import styled from "styled-components";
import { CardWrapper, Title, Name } from "../common";
import AttributeCard from "./AttributeCard";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(255, 255, 255, 0.7);
`;

const Modal = styled(CardWrapper)`
  width: 50%;
  height: 50%;

  display: flex;
  flex-direction: column;
`;

const ModalCaption = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const FigureWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
  overflow: auto;
  flex: 1 1 0;

  justify-content: center;
  align-items: center;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;
const ModalFigure = styled.img.attrs({
  src: "/test/lfgcard.png",
})`
  width: 300px;
  height: 300px;

  @media (max-width: 1000px) {
    width: 200px;
    height: 200px;
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

const AttributeDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
  overflow: auto;
`;

const NFTAttributeModal = () => {
  const attributes = [
    {
      property: "SUIT COLOR",
      value: "Solana",
    },
    {
      property: "VISOR COLOR",
      value: "White",
    },
    {
      property: "ENVIRONMENT",
      value: "Solana",
    },
    {
      property: "ORIENTATION",
      value: "Right",
    },
    {
      property: "RANK PACTH",
      value: "Commander",
    },
    {
      property: "SPECIAL PATCH",
      value: "Solana",
    },
    {
      property: "SECONDARY COLOR",
      value: "Stock",
    },
    {
      property: "MATCH TYPE",
      value: "None",
    },
    {
      property: "RANK",
      value: "116",
    },
  ];

  return (
    <Wrapper>
      <Modal>
        <ModalCaption>
          <Title>LFGTrader #0</Title>
          <Name>LFGTrader</Name>
        </ModalCaption>
        <FigureWrapper>
          <ModalFigure />
          <AttributeDiv>
            {attributes.map((attr, idx) => (
              <AttributeCard
                key={idx}
                property={attr.property}
                value={attr.value}
              />
            ))}
          </AttributeDiv>
        </FigureWrapper>
      </Modal>
    </Wrapper>
  );
};

export default NFTAttributeModal;
