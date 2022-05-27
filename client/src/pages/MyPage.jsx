import React, { useEffect, useState, useContext } from "react";
import { Rootdiv, myPageAxios } from "../common";
import Profile from "../components/my_page/Profile";
import MyNFTs from "../components/my_page/MyNFTs";
import NFTAttributeModal from "../components/my_page/NFTAttributeModal";
import { UserContext } from "../App";
import TradeHistory from "../components/my_page/TradeHistory";
import NFTCards from "../components/loan_list/NFTCards";
import styled from "styled-components";
import LoadingSpinner from "../components/common/LoadingSpinner";

const CardsWrapper = styled.div`
  width: 85%;
  margin: auto;
  margin-bottom: 5rem;
`;

const Title = styled.div`
  font-size: 1.3rem;
`;

const MyPage = () => {
  const [modalData, setModalData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [trades, setTrades] = useState([]);
  const [loans, setLoans] = useState([]);
  const [tabs, setTabs] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  // 웹서버에서 내 소유 NFT를 전부 가져오고 MyNFTs에 넘겨준다
  //"https://dweb.link/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/0.png"

  useEffect(() => {
    setNfts((prev) => []);
    setTrades((prev) => []);
    if (!user);
    else {
      myPageAxios(user, tabs, setNfts, setTrades, setLoans, setLoading);
    }
  }, [user, tabs]);

  const renderData = () => {
    if (tabs === 0) {
      return (
        <>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <MyNFTs
                nfts={nfts}
                setIsOpen={setIsOpen}
                setModalData={setModalData}
              />
              {isOpen && <NFTAttributeModal data={modalData} />}
            </>
          )}
        </>
      );
    } else if (tabs === 1) {
      return (
        <CardsWrapper>
          <Title>My Wallet</Title>
          <NFTCards
            nfts={loans.filter(
              (data) =>
                data.state === "CREATED" &&
                data.debtor.toLowerCase() === user.toLowerCase()
            )}
          />
        </CardsWrapper>
      );
    } else if (tabs === 2) {
      return (
        <CardsWrapper>
          <Title>My Wallet</Title>
          <NFTCards
            nfts={loans.filter(
              (data) =>
                data.state === "FUNDED" &&
                (data.debtor.toLowerCase() === user.toLowerCase() ||
                  data.creditor.toLowerCase() === user.toLowerCase())
            )}
          />
        </CardsWrapper>
      );
    } else {
      return <TradeHistory tabs={tabs} nfts={trades} />;
    }
  };

  return (
    <Rootdiv
      onClick={() => {
        if (isOpen) {
          setIsOpen(false);
        }
      }}
    >
      <Profile tabs={tabs} setTabs={setTabs} />
      {renderData()}
    </Rootdiv>
  );
};

export default MyPage;
