import React, { useEffect, useState, useContext } from "react";
import { Rootdiv, myPageAxios } from "../common";
import Profile from "../components/Profile";
import MyNFTs from "../components/MyNFTs";
import NFTAttributeModal from "../components/NFTAttributeModal";
import { UserContext } from "../App";
import TradeHistory from "../components/TradeHistory";

const MyPage = () => {
  const [modalData, setModalData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [trades, setTrades] = useState([]);
  const [tabs, setTabs] = useState(0);
  const { user } = useContext(UserContext);

  // 웹서버에서 내 소유 NFT를 전부 가져오고 MyNFTs에 넘겨준다
  //"https://dweb.link/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/0.png"

  useEffect(() => {
    // const db = [
    //   {
    //     projectName: "Azuki",
    //     teamName: "",
    //     floorPrice: "",
    //     nftAddress: "0xaE0F3B010cEc518dB205F5BAf849b8865309BF52",
    //     tokenId: 0,
    //     tokenURI:
    //       "https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW/0",
    //   },
    //   {
    //     projectName: "Azuki",
    //     teamName: "",
    //     floorPrice: "",
    //     nftAddress: "0xaE0F3B010cEc518dB205F5BAf849b8865309BF52",
    //     tokenId: 1,
    //     tokenURI:
    //       "https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW/1",
    //   },
    //   {
    //     projectName: "Azuki",
    //     team: "",
    //     nftAddress: "0xaE0F3B010cEc518dB205F5BAf849b8865309BF52",
    //     tokenId: 2,
    //     tokenURI:
    //       "https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW/2",
    //   },
    // ];

    setNfts((prev) => []);
    setTrades((prev) => []);
    myPageAxios(user, tabs, setNfts, setTrades);
  }, [user, tabs]);

  const renderData = () => {
    if (tabs === 0 || tabs === 1 || tabs === 2) {
      return (
        <>
          <MyNFTs
            nfts={nfts}
            setIsOpen={setIsOpen}
            setModalData={setModalData}
          />
          {isOpen && <NFTAttributeModal data={modalData} />}
        </>
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
