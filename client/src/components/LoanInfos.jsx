import React from "react";
import { useNavigate } from "react-router-dom";
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

  const handleCancelClick = async () => {
    const cancelEncoded = window.caver.abi.encodeFunctionCall(
      {
        name: "cancel",
        type: "function",
        inputs: [],
      },
      []
    );

    await window.caver.klay.sendTransaction({
      type: "SMART_CONTRACT_EXECUTION",
      from: user,
      to: data.loanAddress,
      data: cancelEncoded,
      gas: "10000000",
    });
  };

  const handleFundClick = async () => {
    const fundEncoded = window.caver.abi.encodeFunctionCall(
      {
        name: "fund",
        type: "function",
        inputs: [],
      },
      []
    );

    await window.caver.klay.sendTransaction({
      type: "SMART_CONTRACT_EXECUTION",
      from: user,
      to: data.loanAddress,
      value: "0x" + ((data.amount + data.rateAmount * 0.1) * 1e18).toString(16),
      data: fundEncoded,
      gas: "10000000",
    });
  };

  const renderButton = () => {
    if (user.toLowerCase() === data.debtor.toLowerCase()) {
      return (
        <>
          <Btn
            onClick={() => {
              navigate(`/loans/${data.objectId}/edit`);
            }}
          >
            Edit
          </Btn>
          <Btn
            onClick={async () => {
              await handleCancelClick();
              navigate(`/loans/listings`);
            }}
          >
            Cancel
          </Btn>
        </>
      );
    } else {
      return (
        <Btn
          onClick={async () => {
            await handleFundClick();
            navigate(`/loans/${data.objectId}`);
          }}
        >
          Fund
        </Btn>
      );
    }
  };

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
      <ButtonWrapper>{renderButton()}</ButtonWrapper>

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
