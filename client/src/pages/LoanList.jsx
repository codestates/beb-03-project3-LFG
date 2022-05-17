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
    const db = [
      {
        objectId: "0",
        debtor: "0x24DaF1e6C925A61D9F186bF5232ed907Cfde15d9",
        creditor: "",
        startAt: 1,
        period: 86400,
        amount: "1000000000000000000",
        rateAmount: "100000000000000000",
        state: 0,
        nftAddress: "0xaE0F3B010cEc518dB205F5BAf849b8865309BF52",
        tokenId: 0,
        loanAddress: "0x545a3eAb3b0e7906DaAB8d4846865e90EACBc40e",
        projectName: "Azuki",
        tokenURI:
          "https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW/0",
      },
    ];
    const promises = db.map((d) => getMetadata(d.tokenURI));
    Promise.all(promises).then((result) => {
      setNfts((prev) =>
        result.map((data, idx) => {
          return {
            ...data.data,
            ...db[idx],
          };
        })
      );
    });
  }, []);

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
