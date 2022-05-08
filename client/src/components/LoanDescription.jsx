import React from "react";
import styled from "styled-components";
import { LoanListingBtn, MenuTab } from "../common/styles";

const LDWrapper = styled.div`
  width: 100%;
  height: 25rem;
  padding-top: var(--nav-bar-height);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
`;

const LoanDescription = () => {
  const tabArr = [
    { name: "LISTINGS" },
    { name: "HISTORY" },
    { name: "MY LISTED LOANS" },
    { name: "MY FUNDED LOANS" },
    { name: "HELP / FAQ" },
  ];
  return (
    <LDWrapper>
      <h3>NFT Collateralized Loans</h3>
      <p>
        Define your terms and collateralize NFTs at the P2P Loan Marketplace.
        <br /> Lenders can fund loans with a single click
      </p>
      <LoanListingBtn />
      <MenuTab menus={tabArr} />
    </LDWrapper>
  );
};

export default LoanDescription;
