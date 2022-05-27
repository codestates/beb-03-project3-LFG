import React from "react";
import styled from "styled-components";

const LogoWrapper = styled.div`
  font-size: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const LogoLink = styled.a.attrs((props) => ({
  href: "/",
}))`
  text-decoration: none;
  color: black;
`;

const Img = styled.img.attrs((props) => ({
  src: props.fig,
}))`
  width: 3rem;
  height: 3rem;
  margin-right: 0.3rem;
`;

const Logo = () => {
  return (
    <LogoWrapper>
      <Img fig="/logo.png" />
      <LogoLink>Oasis</LogoLink>
    </LogoWrapper>
  );
};

export default Logo;
