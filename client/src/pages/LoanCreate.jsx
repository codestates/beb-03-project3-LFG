import React from "react";
import { Rootdiv } from "../common";
import LoanDescription from "../components/LoanDescription";
import MyNFTs from "../components/MyNFTs";

const LoanCreate = () => {
  return (
    <Rootdiv>
      <LoanDescription />
      <MyNFTs />
    </Rootdiv>
  );
};

export default LoanCreate;
