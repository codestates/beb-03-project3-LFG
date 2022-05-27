import React from "react";
import styled, { keyframes } from "styled-components";

const move = keyframes`
    0% {
        transform: translateX(100%);
    }

    25% {
        transform: translateX(0%);
    }
`;

const AlertBox = styled.div`
  background-color: ${(props) => props.bg};
  border-radius: 0.5rem;
  width: 20rem;
  padding: 0.75rem;
  position: fixed;
  bottom: 1rem;
  right: 1rem;

  display: flex;
  justify-content: space-between;

  animation: ${move} 1s ease-in;

  & > span {
    cursor: pointer;
  }
`;

const Alert = ({ status, message, setShowAlert }) => {
  return (
    <AlertBox bg={status === "FAILED" ? "tomato" : "green"}>
      <div>{message}</div>
      <span
        onClick={() => {
          setShowAlert(false);
        }}
      >
        &times;
      </span>
    </AlertBox>
  );
};

export default Alert;
