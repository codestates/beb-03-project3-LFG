import React from "react";
import styled from "styled-components";
import { HelpOutline, Button } from "../common";
import Request from "./Request";
import Login from "./Login";

const LoanInfosWrapper = styled.div`
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

const Fund = styled(Button)`
  background-color: salmon;
  margin-top: 2rem;
`;

const LoanInfos = ({ user }) => {
  return (
    <LoanInfosWrapper>
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
      {/* // to Open Loan Request, not owner */}
      <Fund>Funded the Loan</Fund>
      <Help>
        <span>
          <HelpOutline />
        </span>
        Loans can be paid back early with minimum of 30% of total interest.
        Loans have 24h grace after loan period ends.
      </Help>
      <Connect>
        {user === null ? (
          <>
            <p>
              Connect your wallet to fund, pay back, claim or cancel this Loan
            </p>
            <Login />
          </>
        ) : null}
      </Connect>
    </LoanInfosWrapper>
  );
};

export default LoanInfos;
