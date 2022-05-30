import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AccessTimeIcon, renderContent } from "../../common";

const CardWrapper = styled.div`
  background-color: var(--main-theme);
  border-radius: 1.5rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;

  cursor: pointer;
`;

const State = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
`;

const FigureWrapper = styled.div`
  border-bottom: 1px solid tomato;
  padding-bottom: 0.75rem;
  flex: 1 1 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > div:first-child {
    height: 100%;
    display: flex;
    align-items: center;
  }
`;
const Figure = styled.img.attrs((props) => ({
  src: props.fig,
}))`
  width: 100%;
`;

const Video = styled.video`
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
  margin-top: 0.5rem;

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

  const loanState = () => {
    switch (nft.state) {
      case "CREATED":
        return "Open Loan Request";

      case "FUNDED":
        return "Funded Loan";

      case "PAIDBACK":
        return "Paidback Loan";

      case "DEFAULTED":
        return "Defaulted Loan";

      default:
        return "CANCELLED";
    }
  };

  return (
    <CardWrapper>
      <State>{loanState()}</State>
      <FigureWrapper
        onClick={() => {
          navigate(`/loans/${nft._id}`);
        }}
      >
        <div>{renderContent(nft, Video, Figure)}</div>
        <FigCaption>
          <Title>{nft.projectName}</Title>
          <Name>{nft.name}</Name>
        </FigCaption>
      </FigureWrapper>
      <InformationWrapper>
        <LoanInfo>
          <AccessTimeIcon />
          {nft.period / 86400} Days
          {/* <CreditScoreIcon />
          {(nft.rateAmount / nft.amount) * 100} % */}
        </LoanInfo>
        {/* <LoanInfo>
          <span>APY</span>{" "}
          {((nft.rateAmount / nft.amount) * 100 * 365) / (nft.period / 86400)} %
          <span>LTF</span> 74.1%
        </LoanInfo> */}
        <LoanReturnWrapper>
          <div>Loan + Return</div>
          <div>
            <img
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/4256.png"
              alt="solana"
            />
            {nft.amount / 1e18} + <span>{nft.rateAmount / 1e18}</span>
          </div>
        </LoanReturnWrapper>
      </InformationWrapper>
    </CardWrapper>
  );
};

export default NFTCard;
