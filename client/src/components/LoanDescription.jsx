import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, CalendarMonthIcon } from "../common";
import MenuTab from "./MenuTab";

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

const LFGButton = styled(Button)`
  background-color: gray;
`;

const LoanDescription = ({ user, tabs, setTabs }) => {
  const navigate = useNavigate();

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
      <LFGButton
        onClick={() => {
          if (!user) return;
          navigate("/profile/wallet");
        }}
      >
        <CalendarMonthIcon />
        Create a Loan Listing
      </LFGButton>
      <MenuTab menus={tabArr} tabs={tabs} setTabs={setTabs} />
    </LDWrapper>
  );
};

export default LoanDescription;
