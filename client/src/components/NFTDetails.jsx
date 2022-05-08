import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Rootdiv, VerifiedUserIcon } from "../common";
import AttributeCard from "./AttributeCard";

const DetailDiv = styled(Rootdiv)`
  align-items: center;
`;
const TitleWrapper = styled.div`
  padding-top: 90px;
  text-align: center;
  & > * {
    margin-bottom: 1rem;
  }
`;
const Title = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
`;
const Name = styled.div``;
const Verified = styled.div`
  display: flex;
  align-itmes: center;
`;
const NFTImage = styled.img.attrs({
  src: "/test/lfgcard.png",
})`
  width: 375px;
  height: 375px;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
`;

const Attributes = styled.div`
  width: 768px;
  margin: auto;
  background-color: var(--main-theme);
  padding: 0.5rem 2rem 0.5rem 0.5rem;
`;
const AttributeDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const ScannerWrapper = styled.div`
  width: 768px;
  margin: 2rem auto 2rem auto;

  display: flex;
  justify-content: center;
`;
const Scanner = styled.a.attrs({
  href: "https://scope.klaytn.com/",
  target: "blank",
})`
  outline: none;
  border: 1px solid salmon;
  border-radius: 2rem;
  padding: 1rem 5rem 1rem 5rem;
  background-color: transparent;
  transition: all 0.3s ease-in;
  font-family: "Times new Roman";
  cursor: pointer;
  font-size: 0.8rem;

  &: hover {
    background-color: gray;
  }
`;

const NFTDetails = () => {
  const { hash } = useParams();

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
    <DetailDiv>
      <TitleWrapper>
        <Title>LFGTrader #{hash}</Title>
        <Name>LFGTrader</Name>
        <Verified>
          <VerifiedUserIcon />
          LFG Verified
        </Verified>
      </TitleWrapper>
      <NFTImage />
      <Attributes>
        <div>Attributes (9)</div>
        <AttributeDiv>
          {attributes.map((attr, idx) => (
            <AttributeCard
              key={idx}
              property={attr.property}
              value={attr.value}
            />
          ))}
        </AttributeDiv>
      </Attributes>
      <ScannerWrapper>
        <Scanner>View on Klaytnscope</Scanner>
      </ScannerWrapper>
    </DetailDiv>
  );
};

export default NFTDetails;
