import React from "react";
import styled from "styled-components";
import { HelpOutline } from "../common";
import Request from "./Request";
import Login from "./Login";

const RequestWrapper = styled.div`
  width: 768px;
  margin: auto;
  background-color: var(--main-theme);
`;

const TitleWrapper = styled.div`
  margin-right: 1rem;
  margin-left: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid salmon;
`;
const Title = styled.div`
  font-size: 1.2rem;
  color: white;
`;
const Listing = styled.button`
  background-color: salmon;
  border-radius: 1rem;
  outline: none;
  border: none;
  padding: 0.5rem;
  font-family: "Times new Roman";
`;

const LoanInfos = styled.div`
  padding: 1rem;
`;

const Info = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Help = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: start;
  & > span {
    margin-right: 0.6rem;
  }
`;
const Connect = styled.div`
  margin-top: 1rem;
`;

const LoanRequest = () => {
  return (
    <RequestWrapper>
      <TitleWrapper>
        <Title>Open Loan Request</Title>
        <Listing>Loan Listing</Listing>
      </TitleWrapper>
      <LoanInfos>
        <div>Fund the loan with this NFT as collateral</div>
        <Info>
          <Request property={"Period"} value={"21 Days"} />
          <Request property={"To fund"} value={12.2} />
          <Request property={"Floor"} value={5} />
          <Request property={"LTF"} value={"244%"} />
          <Request property={"APY"} value={"256.4%"} />
        </Info>
        <Info>
          <Request property={"Early Repayment"} value={12.74} />
          <Request property={"Min Return"} value={0.54} />
        </Info>
        <Info>
          <Request property={"Maturity Repayment"} value={14} />
          <Request property={"Max Return"} value={1.8} />
        </Info>
        <Help>
          <span>
            <HelpOutline />
          </span>
          Loans can be paid back early with minimum of 30% of total interest.
          Loans have 24h grace after loan period ends.
        </Help>
        <Connect>
          <p>
            Connect your wallet to fund, pay back, claim or cancel this Loan
          </p>
          <Login />
        </Connect>
      </LoanInfos>
    </RequestWrapper>
  );
};

export default LoanRequest;
