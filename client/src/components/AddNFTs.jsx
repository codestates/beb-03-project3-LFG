import React from "react";
import styled from "styled-components";
import { Button } from "../common";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: salmon;
  padding: 0.75rem;
  padding-top: 2rem;
  padding-bottom: 2rem;

  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
`;

const AddNFTs = ({ setIsOpen }) => {
  const handleAddNFTClick = (e) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  return (
    <Wrapper>
      <div>
        NFTs will appear here. Press the button below to browse and add NFTs
      </div>
      <Button onClick={handleAddNFTClick}>Add NFTs..</Button>
    </Wrapper>
  );
};

export default AddNFTs;
