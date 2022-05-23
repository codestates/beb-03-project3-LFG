import React from "react";
import styled, { keyframes } from "styled-components";

const move = keyframes`
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
`;
const Wrapper = styled.div`
  margin: auto;
  margin-top: 500px;
  position: relative;

  & > div:first-child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Spinner = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 5px solid whitesmoke;
  border-top-color: var(--main-theme);
  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${move} 1s ease-in infinite;
`;

const LoadingSpinner = () => {
  return (
    <Wrapper>
      <div>Loading...</div>
      <Spinner></Spinner>
    </Wrapper>
  );
};

export default LoadingSpinner;
