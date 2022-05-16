import React, { useEffect, useState } from "react";
import { Rootdiv, getMetadata } from "../common";
import Profile from "../components/Profile";
import MyNFTs from "../components/MyNFTs";
import NFTAttributeModal from "../components/NFTAttributeModal";

const MyPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nfts, setNfts] = useState(null);
  const [modalData, setModalData] = useState(null);
  // 웹서버에서 내 소유 NFT를 전부 가져오고 MyNFTs에 넘겨준다
  //"https://dweb.link/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/0.png"

  useEffect(() => {
    Promise.all([
      getMetadata(
        "https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW/0"
      ),
      getMetadata(
        "https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW/1"
      ),
    ]).then((result) =>
      setNfts((prev) =>
        result.map((r, idx) => {
          return {
            nftAddress: "0xaE0F3B010cEc518dB205F5BAf849b8865309BF52",
            tokenId: idx,
            loanAddress: "",
            ...r.data,
          };
        })
      )
    );
  }, []);

  return (
    <Rootdiv
      onClick={() => {
        if (isOpen) {
          setIsOpen(false);
        }
      }}
    >
      <Profile />
      <MyNFTs nfts={nfts} setIsOpen={setIsOpen} setModalData={setModalData} />
      {isOpen && <NFTAttributeModal data={modalData} />}
    </Rootdiv>
  );
};

export default MyPage;
