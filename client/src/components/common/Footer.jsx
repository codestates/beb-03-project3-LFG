import React from "react";
import { useNavigate } from "react-router-dom";
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
const Right = styled(FooterElems)`
  & > li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const Footer = () => {
  const navigate = useNavigate();

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
        </Left>
        <Middle>
          <h3>Main</h3>
          <li
            onClick={() => {
              navigate("/loans/listings");
            }}
          >
            Loan Listings
          </li>
          <li
            onClick={() => {
              navigate("/trade-create");
            }}
          >
            Open Trades
          </li>
        </Middle>
        <Right>
          <h3>Resources</h3>
          <li
            onClick={() => {
              window.location.href =
                "https://github.com/codestates/beb-03-project3-LFG";
            }}
          >
            <Link>
              <GitHub />
            </Link>
            Github
          </li>
          <li
            onClick={() => {
              window.location.href =
                "https://codestates.notion.site/2-20b061ab1aa04567828b8ae1feab1a5e";
            }}
          >
            Notion
          </li>
        </Right>
      </FooterDiv>
    </FooterWrapper>
  );
};

export default Footer;
