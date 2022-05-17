import React, { useState, useEffect, useContext } from "react";
import LoanDescription from "../components/LoanDescription";
import Filter from "../components/Filter";
import NFTCards from "../components/NFTCards";
import { Rootdiv, getMetadata } from "../common";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";
import { UserContext } from "../App";

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
  const { user } = useContext(UserContext);

  const [nfts, setNfts] = useState([]);
  const [renderedNfts, setRenderedNFTs] = useState([]);
  const [tabs, setTabs] = useState(0);

  useEffect(() => {
    const db = [
      {
        objectId: "0",
        debtor: "0x24DaF1e6C925A61D9F186bF5232ed907Cfde15d9",
        creditor: "0xF5421BE9Ddd7f26a86a82A8ef7D4161F7d4461B6",
        startAt: 1652762741,
        period: 86400,
        amount: "1000000000000000000",
        rateAmount: "100000000000000000",
        state: 1,
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

  useEffect(() => {
    switch (tabs) {
      case 0:
        setRenderedNFTs((prev) => {
          return nfts.filter((data) => data.state === 0);
        });
        break;
      case 1:
        setRenderedNFTs((prev) => {
          return nfts.filter((data) => data.state !== 0);
        });
        break;
      case 2:
        setRenderedNFTs((prev) =>
          nfts.filter(
            (data) =>
              data.state === 0 &&
              data.debtor.toLowerCase() === user.toLowerCase()
          )
        );
        break;
      case 3:
        setRenderedNFTs((prev) =>
          nfts.filter(
            (data) =>
              data.state === 1 &&
              (data.debtor.toLowerCase() === user.toLowerCase() ||
                data.creditor.toLowerCase() === user.toLowerCase())
          )
        );
        break;
      case 4:
        setRenderedNFTs((prev) => []);
        break;
      default:
        break;
    }
  }, [tabs, nfts, user]);

  return (
    <Rootdiv>
      <LoanDescription tabs={tabs} setTabs={setTabs} />
      {nfts ? (
        <Gallery>
          <Filter />
          <NFTCards nfts={renderedNfts} />
        </Gallery>
      ) : (
        <LoadingSpinner />
      )}
    </Rootdiv>
  );
};

export default LoanList;
