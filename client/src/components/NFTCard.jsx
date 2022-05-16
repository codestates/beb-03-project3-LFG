import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AccessTimeIcon, CreditScoreIcon } from "../common";

const CardWrapper = styled.div`
  background-color: var(--main-theme);
  border-radius: 1.5rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;

  cursor: pointer;
`;
const FigureWrapper = styled.div`
  border-bottom: 1px solid tomato;
  padding-bottom: 0.75rem;
`;
const Figure = styled.img.attrs((props) => ({
  src: props.fig,
}))`
  width: 100%;
`;
const FigCaption = styled.div``;
const Title = styled.div`
  font-weight: bold;
`;
const Name = styled.div``;
const InformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;
const LoanInfo = styled.div`
  display: flex;
  align-items: center;

  & > span {
    color: white;
    margin-right: 0.5rem;
  }

  & > span:last-child {
    margin-left: 0.5rem;
  }

  & > svg {
    color: white;
    margin-right: 0.5rem;
  }

  & > svg:last-child {
    margin-left: 0.5rem;
  }
`;
const LoanReturnWrapper = styled.div`
  & > div:first-child {
    color: white;
  }

  & > div:last-child {
    display: flex;
    align-items: center;
  }

  & > div:last-child > img {
    margin-right: 0.5rem;
    width: 20px;
  }
  & > div:last-child > span {
    color: red;
    margin-left: 1rem;
  }
`;

const NFTCard = ({ nft }) => {
  const navigate = useNavigate();

  return (
    <CardWrapper
      onClick={() => {
        navigate(`/loans/${nft.nftAddress}/${nft.tokenId}`, { state: nft });
      }}
    >
      <FigureWrapper>
        <Figure fig={nft.image} />
        <FigCaption>
          <Title>Azuki</Title>
          <Name>{nft.name}</Name>
        </FigCaption>
      </FigureWrapper>
      <InformationWrapper>
        <LoanInfo>
          <AccessTimeIcon />
          9 Days
          <CreditScoreIcon />
          1.4%
        </LoanInfo>
        <LoanInfo>
          <span>APY</span> 58.3% <span>LTF</span> 74.1%
        </LoanInfo>
        <LoanReturnWrapper>
          <div>Loan + Return</div>
          <div>
            <img
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/4256.png"
              alt="solana"
            />
            125.2 + <span>1.8</span>
          </div>
        </LoanReturnWrapper>
      </InformationWrapper>
    </CardWrapper>
  );
};

export default NFTCard;
