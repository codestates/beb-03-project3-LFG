import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NFTDetails from "../components/NFTDetails";
import LoanRequest from "../components/LoanRequest";
import { useLocation } from "react-router-dom";
import { getMetadata } from "../common";
import LoadingSpinner from "../components/LoadingSpinner";

const DetailRootDiv = styled.div`
  display: flex;
  margin: auto;
  gap: 5rem;
  margin-bottom: 1rem;

  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 0;
  }
`;

const LoanDetail = ({ create, edit }) => {
  const [nft, setNft] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      // create를 하려고 MyPage에서 정보를 받아온 경우
      setNft((prev) => location.state.data);
    } else {
      // 이미 만들어진 LoanRequest에 대해서 db에서 Loan데이터를 받아오는 경우
      const data = {
        debtor: "0x24DaF1e6C925A61D9F186bF5232ed907Cfde15d9",
        creditor: "",
        period: 1,
        amount: 1,
        rateAmount: 1,
        state: 0,
        nftAddress: "0xaE0F3B010cEc518dB205F5BAf849b8865309BF52",
        tokenId: 0,
        loanAddress: "0x545a3eAb3b0e7906DaAB8d4846865e90EACBc40e",
        projectName: "Azuki",
        tokenURI:
          "https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW/0",
      };

      getMetadata(data.tokenURI).then((result) => {
        setNft((prev) => {
          return {
            ...data,
            ...result.data,
          };
        });
      });
    }
  }, [location.state]);

  return (
    <DetailRootDiv>
      {nft ? (
        <>
          <NFTDetails data={nft} />
          <LoanRequest create={create} edit={edit} data={nft} />
        </>
      ) : (
        <LoadingSpinner />
      )}
    </DetailRootDiv>
  );
};

export default LoanDetail;
