import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../App";
import LoanInfos from "./LoanInfos";
import LoanForm from "./LoanForm";

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

const LoanRequest = ({ edit, create, data }) => {
  // 0 is not started
  // 1 is Open Loan Request
  // 2 is Funded Loan
  // 3 is Finished
  const [loanStatus, setLoanStatus] = useState(0);
  const { user } = useContext(UserContext);

  const renderLoanComponent = () => {
    if (edit) {
      return <LoanForm edit data={data} />;
    }
    if (create) {
      return <LoanForm create data={data} />;
    }
    return <LoanInfos user={user} data={data} />;
  };

  return (
    <RequestWrapper>
      {/* // loanStatus에 따라 다른 TEXT가 들어가야함 */}
      <TitleWrapper>
        <Title>Open Loan Request</Title>
      </TitleWrapper>
      {renderLoanComponent()}
    </RequestWrapper>
  );
};

export default LoanRequest;
