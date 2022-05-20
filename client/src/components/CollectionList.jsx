import React, { useEffect, useRef, useState } from "react";
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
  gap: 0.5rem;

  &.selected {
    display: none;
  }
`;

const SmallNFTCard = ({ coll, setSelected, selectedNFTs }) => {
  const ref = useRef();

  useEffect(() => {
    let ok = selectedNFTs.some(
      (nft) =>
        nft.nftAddress === coll.nftAddress && nft.tokenId === coll.tokenId
    );

    if (ok) {
      ref.current.classList.add("clicked");
      setSelected((prev) => {
        if (
          !prev.some(
            (nft) =>
              nft.nftAddress === coll.nftAddress && nft.tokenId === coll.tokenId
          )
        )
          return [...prev, coll];
        return prev;
      });
    }
  }, [selectedNFTs, coll, setSelected]);

  return (
    <SmallCardWrapper
      ref={ref}
      onClick={(e) => {
        if (e.currentTarget.classList.contains("clicked")) {
          e.currentTarget.classList.remove("clicked");
          setSelected((prev) =>
            prev.filter(
              (elem) =>
                !(
                  elem.tokenId === coll.tokenId &&
                  elem.nftAddress === coll.nftAddress
                )
            )
          );
        } else {
          e.currentTarget.classList.add("clicked");
          setSelected((prev) => [...prev, coll]);
        }
      }}
    >
      <Img fig={coll.image} />
      <div>{`${coll.projectName} #${coll.tokenId}`}</div>
    </SmallCardWrapper>
  );
};

const CollectionList = ({ setSelected, colls, selectedNFTs }) => {
  const [show, setShow] = useState(true);
  const ref = useRef();

  return (
    <div>
      <Title
        onClick={() => {
          setShow((prev) => !prev);
          ref.current.classList.toggle("selected");
        }}
      >
        <div>
          <VerifiedUserIcon />
          {`${colls[0].team}`}
        </div>

        {show ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
      </Title>
      <CollsDiv ref={ref}>
        {colls.map((coll, idx) => (
          <SmallNFTCard
            key={idx}
            coll={coll}
            setSelected={setSelected}
            selectedNFTs={selectedNFTs}
          />
        ))}
      </CollsDiv>
    </div>
  );
};

export default CollectionList;
