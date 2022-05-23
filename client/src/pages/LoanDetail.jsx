import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NFTDetails from "../components/loan_detail/NFTDetails";
import LoanRequest from "../components/loan_detail/LoanRequest";
import { useLocation, useParams } from "react-router-dom";
import { getMetadata } from "../common";
import LoadingSpinner from "../components/common/LoadingSpinner";
import axios from "axios";

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
      const get = async () => {
        const data = await axios.get(
          `http://127.0.0.1:4002/loan/${params.hash}`
        );
        getMetadata(data.data.loanInfo.tokenURI).then((result) => {
          setNft((prev) => {
            return {
              ...data.data.loanInfo,
              ...result.data,
            };
          });
        });
      };

      get();
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
