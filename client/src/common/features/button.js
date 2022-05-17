import styled from "styled-components";
import Button from "../styles/Button";

const Btn = styled(Button)`
  background-color: salmon;
  margin-top: 2rem;
`;

export const renderButton = (navigate, user, data) => {
  if (data.state === 0) {
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
              await handleCancelClick(user, data.loanAddress);
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
            await handleFundClick(user, data);
            navigate(`/loans/${data.objectId}`);
          }}
        >
          Fund
        </Btn>
      );
    }
  } else if (data.state === 1) {
    if (user.toLowerCase() === data.debtor.toLowerCase()) {
      return (
        <Btn
          onClick={async () => {
            await handleRepayClick(user, data);
            navigate(`/loans/${data.objectId}`);
          }}
        >
          Repay
        </Btn>
      );
    } else if (user.toLowerCase() === data.creditor.toLowerCase()) {
      return (
        <Btn
          onClick={async () => {
            await handleTakeCollateralClick();
            navigate(`/loans/${data.objectId}`);
          }}
        >
          Take Collateral
        </Btn>
      );
    } else {
      return;
    }
  } else {
    return;
  }
};

const handleTakeCollateralClick = async (user, data) => {
  const defaultedEncoded = window.caver.abi.encodeFunctionCall(
    {
      name: "defaulted",
      type: "function",
      inputs: [],
    },
    []
  );

  await window.caver.klay.sendTransaction({
    type: "SMART_CONTRACT_EXECUTION",
    from: user,
    to: data.loanAddress,
    data: defaultedEncoded,
    gas: "10000000",
  });
};

const handleRepayClick = async (user, data) => {
  const repayEncoded = window.caver.abi.encodeFunctionCall(
    {
      name: "repay",
      type: "function",
      inputs: [],
    },
    []
  );

  let loanAmount;

  await window.caver.klay.sendTransaction({
    type: "SMART_CONTRACT_EXECUTION",
    from: user,
    value: loanAmount,
    to: data.loanAddress,
    data: repayEncoded,
    gas: "10000000",
  });
};

const handleCancelClick = async (user, loanAddress) => {
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
    to: loanAddress,
    data: cancelEncoded,
    gas: "10000000",
  });
};

const handleFundClick = async (user, data) => {
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
