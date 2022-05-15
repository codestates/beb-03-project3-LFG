import React, { useState } from "react";
import { Rootdiv } from "../common";
import Profile from "../components/Profile";
import MyNFTs from "../components/MyNFTs";
import NFTAttributeModal from "../components/NFTAttributeModal";

const MyPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Rootdiv
      onClick={() => {
        if (isOpen) {
          setIsOpen(false);
        }
      }}
    >
      <Profile />
      <MyNFTs setIsOpen={setIsOpen} />
      {isOpen && <NFTAttributeModal />}
    </Rootdiv>
  );
};

export default MyPage;
