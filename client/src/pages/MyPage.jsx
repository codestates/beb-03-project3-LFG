import React from "react";
import { Rootdiv } from "../common";
import Profile from "../components/Profile";
import MyNFTs from "../components/MyNFTs";

const MyPage = () => {
  return (
    <Rootdiv>
      <Profile />
      <MyNFTs />
    </Rootdiv>
  );
};

export default MyPage;
