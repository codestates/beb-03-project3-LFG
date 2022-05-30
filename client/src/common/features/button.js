import styled from "styled-components";
import Button from "../styles/Button";

const Btn = styled(Button)`
  background-color: salmon;
  margin-top: 2rem;
`;

export const renderButton = (navigate, user, data) => {
  if (!user) {
    return;
  }

  if (data.state === "CREATED") {
    if (user.toLowerCase() === data.debtor.toLowerCase()) {
      return (
        <>
          <Btn
            onClick={() => {
              navigate(`/loans/${data._id}/edit`);
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
            window.location.reload();
          }}
        >
          Fund
        </Btn>
      );
    }
  } else if (data.state === "FUNDED") {
    if (user.toLowerCase() === data.debtor.toLowerCase()) {
      return (
        <Btn
          onClick={async () => {
            await handleRepayClick(user, data);
            window.location.reload();
          }}
        >
          Repay
        </Btn>
      );
    } else if (user.toLowerCase() === data.creditor.toLowerCase()) {
      return (
        <Btn
          onClick={async () => {
            await handleTakeCollateralClick(user, data);
            window.location.reload();
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

  let { amount, rateAmount, period, startAt } = data;
  let loanAmount = (() => {
    const time = parseInt((Date.now() + 1800) / 1000) - startAt;
    const rate = time / period > 1 ? 1 : time / period;

    if (rate <= 0.3) {
      return (
        "0x" + (parseInt(amount) + parseInt(rateAmount) * 0.3).toString(16)
      );
    } else {
      return (
        "0x" + (parseInt(amount) + parseInt(rateAmount) * rate).toString(16)
      );
    }
  })();

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
    value:
      "0x" + (Number(data.amount) + Number(data.rateAmount) * 0.1).toString(16),
    data: fundEncoded,
    gas: "10000000",
  });
};
