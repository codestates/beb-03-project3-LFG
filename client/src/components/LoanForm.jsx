import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../App";
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

const LoanForm = ({ edit, create }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { user, helperContract } = useContext(UserContext);

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

  const handleSubmit = async () => {
    if (edit) {
      const editEncoded = window.caver.abi.encodeFunctionCall(
        {
          name: "edit",
          type: "function",
          inputs: [
            { type: "uint256", name: "_period" },
            { type: "uint256", name: "_amount" },
            { type: "uint256", name: "_rateAmount" },
          ],
        },
        [data.days, data.price, data.rate]
      );

      let receipt = await window.caver.klay.sendTransaction({
        type: "SMART_CONTRACT_EXECUTION",
        from: user,
        to: "0x3ee7a03f6d9adcb1e0c7d00af242a73885b37d56",
        data: editEncoded,
        gas: "10000000",
      });

      console.log(receipt);
    }

    if (create) {
      const bytecode = await helperContract.methods
        .getBytecode(
          user,
          "0xe6f023036c06862d9a8e00cea169653f1cb1ab14",
          2,
          data.days,
          data.price,
          data.rate
        )
        .call();

      const safeTransferEncoded = window.caver.abi.encodeFunctionCall(
        {
          name: "safeTransferFrom",
          type: "function",
          inputs: [
            { type: "address", name: "from" },
            { type: "address", name: "to" },
            { type: "uint256", name: "tokenId" },
          ],
        },
        [user, process.env.REACT_APP_LOAN_FACTORY_CONTRACT_ADDRESS, 3]
      );

      let receipt = await window.caver.klay.sendTransaction({
        type: "SMART_CONTRACT_EXECUTION",
        from: user,
        to: "0xe6f023036c06862d9a8e00cea169653f1cb1ab14",
        data: safeTransferEncoded,
        gas: "10000000",
      });

      const deployEncoded = window.caver.abi.encodeFunctionCall(
        {
          name: "deploy",
          type: "function",
          inputs: [
            { type: "bytes", name: "_code" },
            { type: "address", name: "_ikip17" },
            { type: "uint256", name: "_tokenId" },
          ],
          outputs: [{ type: "address", name: "addr" }],
        },
        [bytecode, "0xe6f023036c06862d9a8e00cea169653f1cb1ab14", 3]
      );

      receipt = await window.caver.klay.sendTransaction({
        type: "SMART_CONTRACT_EXECUTION",
        from: user,
        to: process.env.REACT_APP_LOAN_FACTORY_CONTRACT_ADDRESS,
        data: deployEncoded,
        gas: "10000000",
      });

      console.log(receipt);
    }
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
              if (edit) {
                navigate(`/loans/${params.hash}`);
              } else {
                navigate(`/profile/wallet`);
              }
            }}
          >
            Back
          </Back>
          <Submit
            onClick={async () => {
              await handleSubmit();
              navigate(`/loans/${params.hash}`);
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
