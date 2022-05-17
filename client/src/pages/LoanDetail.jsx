import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NFTDetails from "../components/NFTDetails";
import LoanRequest from "../components/LoanRequest";
import { useLocation, useParams } from "react-router-dom";
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
  const params = useParams();

  useEffect(() => {
    if (location.state) {
      // create를 하려고 MyPage에서 정보를 받아온 경우
      setNft((prev) => location.state.data);
    } else {
      // 이미 만들어진 LoanRequest에 대해서 db에서 Loan데이터를 받아오는 경우 nftAddress, tokenId, debtor, state를 만족하는 것을 가지고 온다
      let data;
      if (params.hash === "0") {
        data = {
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
        };
      } else {
        data = {
          objectId: "1",
          debtor: "0x24DaF1e6C925A61D9F186bF5232ed907Cfde15d9",
          creditor: "",
          startAt: "",
          period: 86400 * 2,
          amount: "10000000000000000000",
          rateAmount: "1000000000000000000",
          state: 0,
          nftAddress: "0xaE0F3B010cEc518dB205F5BAf849b8865309BF52",
          tokenId: 1,
          loanAddress: "0xf365eeb3dcf6ba8e5a8c9957a27adf265340c5ce",
          projectName: "Azuki",
          tokenURI:
            "https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW/1",
        };
      }
      getMetadata(data.tokenURI).then((result) => {
        setNft((prev) => {
          return {
            ...data,
            ...result.data,
          };
        });
      });
    }
  }, [location.state, params.hash]);

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
