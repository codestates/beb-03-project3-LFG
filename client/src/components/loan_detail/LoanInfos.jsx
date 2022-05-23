import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HelpOutline, renderButton, timeStamp } from "../../common";
import Request from "./Request";
import Login from "../common/Login";

const LoanInfosWrapper = styled.div`
  padding: 1rem;

  & > div > div > span {
    color: white;
  }
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

const LoanInfos = ({ user, data }) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft(timeStamp(data.startAt, data.period));
    }, 1000);

    return () => clearInterval(countdown);
  }, [timeLeft, data.startAt, data.period]);

  const printState = () => {
    if (data.state === "CREATED") {
      return <div>Fund the loan with this NFT as collateral</div>;
    } else if (data.state === "FUNDED") {
      return (
        <div>
          <div>
            <span>Loan funded at:</span>{" "}
            {new Date(data.startAt * 1000).toUTCString()}
          </div>
          <div style={{ marginTop: "1rem" }}>
            <span>Time left</span> {timeLeft}
          </div>
        </div>
      );
    } else if (data.state === "CANCELED") {
      return <div>Cancelled</div>;
    } else if (data.state === "PAIDBACK") {
      return (
        <div>PaidBack: {new Date(data.paidBackTime * 1000).toUTCString()}</div>
      );
    } else if (data.state === "DEFAULTED") {
      return <div>DEFAULTED</div>;
    } else {
      return;
    }
  };

  return (
    <LoanInfosWrapper>
      {printState()}

      <Info>
        <Request property={"Period"} value={`${data.period / 86400} Days`} />
        <Request property={"To fund"} value={data.amount / 1e18} />
        <Request property={"Floor"} value={5} />
        <Request property={"LTF"} value={"244%"} />
        <Request
          property={"APY"}
          value={`${
            ((data.rateAmount / data.amount) * 100 * 365) /
            (data.period / 86400)
          } %`}
        />
      </Info>
      <Info>
        <Request
          property={"Early Repayment"}
          value={(Number(data.amount) + Number(data.rateAmount) * 0.3) / 1e18}
        />
        <Request
          property={"Min Return"}
          value={(data.rateAmount * 0.3) / 1e18}
        />
      </Info>
      <Info>
        <Request
          property={"Maturity Repayment"}
          value={(Number(data.amount) + Number(data.rateAmount)) / 1e18}
        />
        <Request property={"Max Return"} value={data.rateAmount / 1e18} />
      </Info>
      <ButtonWrapper>{renderButton(navigate, user, data)}</ButtonWrapper>

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
