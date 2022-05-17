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

const LoanDescription = (props) => {
  const navigate = useNavigate();

  return (
    <LDWrapper>
      <h3>NFT Collateralized Loans</h3>
      <p>
        Define your terms and collateralize NFTs at the P2P Loan Marketplace.
        <br /> Lenders can fund loans with a single click
      </p>
      <LFGButton
        onClick={() => {
          navigate("/profile/wallet");
        }}
      >
        <CalendarMonthIcon />
        Create a Loan Listing
      </LFGButton>
      <MenuTab {...props} />
    </LDWrapper>
  );
};

export default LoanDescription;
