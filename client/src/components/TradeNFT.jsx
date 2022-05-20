import React from "react";
import styled from "styled-components";
import { VerifiedUserIcon, ClearIcon } from "../common";

const TradeNFTWrapper = styled.div`
  display: flex;
  padding: 0.2rem;
  background-color: tomato;
  width: 65%;
`;

const Img = styled.img.attrs((props) => ({
  src: props.fig,
}))`
  width: 7rem;
  height: 7rem;
  border-radius: 0.2rem;
  cursor: pointer;
`;

const InformationWrapper = styled.div`
  display: flex;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  text-align: left;
  & > div:first-child {
    display: flex;
    align-items: center;
    color: white;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 0;
  cursor: pointer;
  & > div {
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    transition: all 0.3s ease-in;

    &:hover {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
`;

const TradeNFT = ({ nft, setNftModal, setShow, setReceives }) => {
  return (
    <TradeNFTWrapper>
      <Img
        fig={nft.image}
        onClick={(e) => {
          setNftModal((prev) => nft);
          setShow(true);
        }}
      />
      <InformationWrapper>
        <Information>
          <div>
            <VerifiedUserIcon />
            LFG Verified
          </div>
          <div>{`${nft.projectName} #${nft.tokenId}`}</div>
          <div>{nft.team}</div>
        </Information>
      </InformationWrapper>
      {setReceives ? (
        <IconWrapper
          onClick={() => {
            setReceives((prev) => {
              let nfts = prev.nfts.filter(
                (val) =>
                  !(
                    val.tokenId === nft.tokenId &&
                    val.nftAddress === nft.nftAddress
                  )
              );

              return {
                ...prev,
                nfts: nfts,
              };
            });
          }}
        >
          <div>
            <ClearIcon />
          </div>
        </IconWrapper>
      ) : (
        ""
      )}
    </TradeNFTWrapper>
  );
};

export default TradeNFT;
