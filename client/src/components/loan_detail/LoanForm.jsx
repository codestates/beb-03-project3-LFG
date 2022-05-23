import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../App";
import { Button, HelpOutline } from "../../common";

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

const LoanForm = ({ edit, create, data }) => {
  const navigate = useNavigate();
  const { user, helperContract } = useContext(UserContext);
  const [inputData, setInputData] = useState({ days: 0, price: 0, rate: 0 });

  const onChange = (e) => {
    const regExp = /^[0-9]*\.?[0-9]*$/;

    if (!regExp.test(e.target.value)) {
      return;
    } else {
      setInputData((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  const handleSubmit = async () => {
    if (!inputData.days || !inputData.price || !inputData.rate) return false;

    const formData = {
      days: "0x" + (Number(inputData.days) * 86400).toString(16),
      price: "0x" + (Number(inputData.price) * 1e18).toString(16),
      rate: "0x" + (Number(inputData.rate) * 1e18).toString(16),
    };

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
        [formData.days, formData.price, formData.rate]
      );

      await window.caver.klay.sendTransaction({
        type: "SMART_CONTRACT_EXECUTION",
        from: user,
        to: data.loanAddress,
        data: editEncoded,
        gas: "10000000",
      });

      return true;
    }

    if (create) {
      const bytecode = await helperContract.methods
        .getBytecode(
          user,
          data.nftAddress,
          data.tokenId,
          formData.days,
          formData.price,
          formData.rate
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
        [
          user,
          process.env.REACT_APP_LOAN_FACTORY_CONTRACT_ADDRESS,
          data.tokenId,
        ]
      );

      await window.caver.klay.sendTransaction({
        type: "SMART_CONTRACT_EXECUTION",
        from: user,
        to: data.nftAddress,
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
        [bytecode, data.nftAddress, data.tokenId]
      );

      await window.caver.klay.sendTransaction({
        type: "SMART_CONTRACT_EXECUTION",
        from: user,
        to: process.env.REACT_APP_LOAN_FACTORY_CONTRACT_ADDRESS,
        data: deployEncoded,
        gas: "10000000",
      });

      return true;
    }
  };

  return (
    <LoanFormWrapper>
      <div>Fund the loan with this NFT as collateral</div>
      <Form>
        <InputWrapper>
          <Label>Days</Label>
          <Input
            name="days"
            value={inputData["days"] === 0 ? "" : inputData["days"]}
            placeholder="Days"
            onChange={onChange}
            autoComplete="off"
          />
          <Label>Price</Label>
          <Input
            name="price"
            value={inputData["price"] === 0 ? "" : inputData["price"]}
            placeholder="KLAY"
            onChange={onChange}
            autoComplete="off"
          />
          <Label>Rate</Label>
          <Input
            name="rate"
            value={inputData["rate"] === 0 ? "" : inputData["rate"]}
            placeholder="KLAY"
            onChange={onChange}
            autoComplete="off"
          />
        </InputWrapper>

        <ButtonWrapper>
          <Back
            onClick={() => {
              if (edit) {
                navigate(`/loans/${data.objectId}`);
              } else {
                navigate(`/profile/wallet`);
              }
            }}
          >
            Back
          </Back>
          <Submit
            onClick={async () => {
              const ok = await handleSubmit();
              // 만들어진 Loan에대한 ObjectId를 가져와서 바로 Detail페이지로 가는 것도 좋을듯 (OpenRequest 상태인 걸로 가져와야함)
              if (ok) navigate(`/loans/listings`);
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
