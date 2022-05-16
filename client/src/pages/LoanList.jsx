import React, { useState, useEffect } from "react";
import LoanDescription from "../components/LoanDescription";
import Filter from "../components/Filter";
import NFTCards from "../components/NFTCards";
import { Rootdiv, getMetadata } from "../common";
import styled from "styled-components";

const Gallery = styled.div`
  display: flex;
  padding-top: 3rem;
  padding-left: 10rem;
  padding-right: 5rem;
  gap: 4rem;
  align-items: start;

  @media (max-width: 1000px) {
    flex-direction: column;
    padding-left: 3rem;
    padding-right: 3rem;
  }
`;

const LoanList = () => {
  const [nfts, setNfts] = useState(null);

  useEffect(() => {
    Promise.all([
      getMetadata(
        "https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW/0"
      ),
    ]).then((result) =>
      setNfts((prev) =>
        result.map((r, idx) => {
          return {
            nftAddress: "0xaE0F3B010cEc518dB205F5BAf849b8865309BF52",
            tokenId: idx,
            state: "Open Loan Request",
            loanAddress: "0x545a3eab3b0e7906daab8d4846865e90eacbc40e",
            ...r.data,
          };
        })
      )
    );
  });

  return (
    <Rootdiv>
      <LoanDescription />
      <Gallery>
        <Filter />
        <NFTCards nfts={nfts} />
      </Gallery>
    </Rootdiv>
  );
};

export default LoanList;
