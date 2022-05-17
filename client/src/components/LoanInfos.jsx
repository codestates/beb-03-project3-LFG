import React from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Btn = styled(Button)`
  background-color: salmon;
  margin-top: 2rem;
`;

const LoanInfos = ({ user, data }) => {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <LoanInfosWrapper>
      <div>Fund the loan with this NFT as collateral</div>
      <Info>
        <Request property={"Period"} value={`${data.period} Days`} />
        <Request property={"To fund"} value={data.amount} />
        <Request property={"Floor"} value={5} />
        <Request property={"LTF"} value={"244%"} />
        <Request
          property={"APY"}
          value={`${(data.rateAmount / data.amount) * 100 * 365} %`}
        />
      </Info>
      <Info>
        <Request
          property={"Early Repayment"}
          value={data.amount + data.rateAmount * 0.3}
        />
        <Request property={"Min Return"} value={data.rateAmount * 0.3} />
      </Info>
      <Info>
        <Request
          property={"Maturity Repayment"}
          value={data.amount + data.rateAmount}
        />
        <Request property={"Max Return"} value={data.rateAmount} />
      </Info>
      <ButtonWrapper>
        <Btn
          onClick={() => {
            navigate(`/loans/${data.nftAddress}/${data.tokenId}/edit`, {
              state: data,
            });
          }}
        >
          Edit
        </Btn>
        <Btn>Cancel</Btn>
      </ButtonWrapper>

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
