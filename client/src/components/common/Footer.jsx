import React from "react";
import styled from "styled-components";
import { GitHub } from "../../common";
import Logo from "./Logo";

const FooterWrapper = styled.footer`
  width: 100%;
  height: 20rem;
  background-color: var(--main-theme);

  padding: 4rem 20rem 3rem 20rem;

  @media (max-width: 1000px) {
    padding: 3rem 3rem 4rem 3rem;
  }
`;

const FooterDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FooterElems = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-right: 8rem;
  font-size: 1rem;
`;

const Desciription = styled.div``;
const Link = styled.div`
  cursor: pointer;
`;

const Left = styled(FooterElems)``;
const Middle = styled(FooterElems)``;
const Right = styled(FooterElems)``;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterDiv>
        <Left>
          <Logo />
          <Desciription>
            Collateralization Platform
            <br />
            for Klaytn NFTs
          </Desciription>
          <Link
            onClick={() => {
              window.location.href =
                "https://github.com/codestates/beb-03-project3-LFG";
            }}
          >
            <GitHub />
          </Link>
        </Left>
        <Middle>
          <h3>My Account</h3>
          <li>Open Trades</li>
          <li>Trade Listings</li>
          <li>Loan Listings</li>
        </Middle>
        <Right>
          <h3>Resources</h3>
          <li>Help & Support</li>
          <li>Contact Us</li>
          <li>Our Blog</li>
          <li>Community</li>
        </Right>
      </FooterDiv>
    </FooterWrapper>
  );
};

export default Footer;
