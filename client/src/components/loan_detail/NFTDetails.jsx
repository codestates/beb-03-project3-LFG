import React from "react";
import styled from "styled-components";
import { renderContent, Rootdiv, VerifiedUserIcon } from "../../common";
import AttributeCard from "./AttributeCard";

const DetailDiv = styled(Rootdiv)`
  align-items: center;
  justify-content: center;
`;
const TitleWrapper = styled.div`
  padding-top: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
const NFTImage = styled.img.attrs((props) => ({
  src: props.fig,
}))`
  width: 375px;
  height: 375px;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
`;

const Video = styled.video`
  width: 375px;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
`;

const Attributes = styled.div`
  width: 768px;
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

const NFTDetails = ({ data }) => {
  return (
    <DetailDiv>
      <TitleWrapper>
        <Title>{`${data.projectName} #${data.tokenId}`}</Title>
        <Name>{data.team}</Name>
        <Verified>
          <VerifiedUserIcon />
          Oasis Verified
        </Verified>
      </TitleWrapper>
      {renderContent(data, Video, NFTImage)}
      <Attributes>
        <div>Attributes ({data.attributes.length})</div>
        <AttributeDiv>
          {data.attributes.map((attr, idx) => (
            <AttributeCard
              key={idx}
              property={attr.trait_type}
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
