import React from "react";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Description = styled.div`
  padding: 1rem;
  margin-top: 95px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VoteWrapper = styled.div`
  padding: 2rem;
  background-color: whitesmoke;
  width: 800px;

  & > div:first-child {
    display: flex;
    gap: 3rem;
    justify-content: center;

    padding-bottom: 3rem;
    border-bottom: 1px solid gray;
  }
`;

const ProsCons = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 7px 1px rgba(0, 0, 0, 0.75);
  width: 50%;
  gap: 2rem;
  cursor: pointer;

  & > div:first-child {
    font-size: 1.2rem;
  }
`;

const VoteDescription = styled.div`
  margin-top: 3rem;
`;

const NFTHolderVote = () => {
  return (
    <Div>
      <Description>Fee Change</Description>
      <VoteWrapper>
        <div>
          <ProsCons>
            <div>Pros</div>
            <div>1</div>
          </ProsCons>
          <ProsCons>
            <div>Cons</div>
            <div>2</div>
          </ProsCons>
        </div>
        <VoteDescription></VoteDescription>
      </VoteWrapper>
    </Div>
  );
};

export default NFTHolderVote;
