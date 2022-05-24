import React from "react";
import styled from "styled-components";

const LogoWrapper = styled.div`
  font-size: 2rem;
  cursor: pointer;
`;

const LogoLink = styled.a.attrs((props) => ({
  href: "/",
}))`
  text-decoration: none;
  color: black;
`;

const Logo = () => {
  return (
    <LogoWrapper>
      <LogoLink>LFG</LogoLink>
    </LogoWrapper>
  );
};

export default Logo;
