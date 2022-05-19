import React, { useState } from "react";
import styled from "styled-components";
import {
  VerifiedUserIcon,
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon,
} from "../common";

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;

  justify-content: space-between;

  padding: 0.75rem;
  background-color: tomato;
  border-radius: 1rem;
  cursor: pointer;

  & > div:first-child {
    display: flex;
    align-items: center;
  }
`;

const Img = styled.img.attrs((props) => ({
  src: props.fig,
}))`
  width: 7rem;
  height: 7rem;

  border-radius: 1rem;
`;

const SmallCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0.3rem;
  width: 8rem;

  border: 1px solid transparent;

  align-items: center;

  &:hover {
    border: 1px solid tomato;
  }

  &.clicked {
    border: 2px solid red;
  }
`;

const CollsDiv = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-wrap: wrap;
`;

const SmallNFTCard = ({ coll }) => {
  return (
    <SmallCardWrapper
      onClick={(e) => {
        e.currentTarget.classList.toggle("clicked");
      }}
    >
      <Img fig={coll.image} />
      <div>{`${coll.projectName} #${coll.tokenId}`}</div>
    </SmallCardWrapper>
  );
};

const CollectionList = ({ colls }) => {
  const [show, setShow] = useState(true);

  return (
    <div>
      <Title
        onClick={() => {
          setShow((prev) => !prev);
        }}
      >
        <div>
          <VerifiedUserIcon />
          {`${colls[0].team}`}
        </div>

        {show ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
      </Title>
      {show ? (
        <CollsDiv>
          {colls.map((coll, idx) => (
            <SmallNFTCard key={idx} coll={coll} />
          ))}
        </CollsDiv>
      ) : null}
    </div>
  );
};

export default CollectionList;
