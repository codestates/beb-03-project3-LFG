import React, { useState } from "react";
import styled from "styled-components";
import { Button, HelpOutline } from "../common";

const LoanFormWrapper = styled.div`
  padding: 1rem;
`;

const Help = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: start;
  & > span {
    margin-right: 0.6rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 1rem;
  gap: 1rem;
`;

const Label = styled.div``;

const Input = styled.input`
  outline: none;
  padding: 0.5rem;
  border-radius: 1rem;
  width: 60%;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const Submit = styled(Button)`
  background-color: salmon;
`;

const Back = styled(Button)`
  background-color: salmon;
  margin-right: 1rem;
`;

const Form = styled.div``;

const LoanForm = ({ handleEdit }) => {
  const [data, setData] = useState({});
  const onChange = (e) => {
    if (!e.target.value) {
      setData((prev) => {
        return {
          ...prev,
          [e.target.name]: 0,
        };
      });
    }
    if (!Number(e.target.value)) {
      return;
    } else
      setData((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
  };

  return (
    <LoanFormWrapper>
      <div>Fund the loan with this NFT as collateral</div>
      <Form>
        <InputWrapper>
          <Label>Days</Label>
          <Input name="days" value={data["days"] || 0} onChange={onChange} />
          <Label>Price</Label>
          <Input name="price" value={data["price"] || 0} onChange={onChange} />
          <Label>Rate</Label>
          <Input name="rate" value={data["rate"] || 0} onChange={onChange} />
        </InputWrapper>

        <ButtonWrapper>
          <Back
            onClick={() => {
              handleEdit(false);
            }}
          >
            Back
          </Back>
          <Submit
            onClick={() => {
              handleEdit(false);
            }}
          >
            Submit
          </Submit>
        </ButtonWrapper>
      </Form>
      <Help>
        <span>
          <HelpOutline />
        </span>
        Loans can be paid back early with minimum of 30% of total interest.
        Loans have 24h grace after loan period ends.
      </Help>
    </LoanFormWrapper>
  );
};

export default LoanForm;
