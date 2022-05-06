import React from "react";
import styled from "styled-components";
import { Logo } from "../common/styles";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const NavBarWrapper = styled.nav`
  background-color: var(--main-theme);
  position: fixed;
  top: 0;
  left: 0;
  height: 79px;
  width: 100%;
  padding: 1rem 1.25rem 1rem 1.25rem;

  box-shadow: 0px 4px 9px 0px rgba(0, 0, 0, 0.75);
  user-select: none;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const Navs = styled.ul`
  display: flex;
`;

const Nav = styled.li`
  margin-right: 3rem;
  font-size: var(--nav-font-size);
  cursor: pointer;
  display: flex;
  align-items: center;

  &: last-child {
    margin-right: 0;
  }

  @media (max-width: 1000px) {
    display: none;
  }
`;

const Login = styled.div`
  cursor: pointer;
  @media (max-width: 1000px) {
    display: none;
  }
`;

const Menu = styled.div`
  display: none;
  @media (max-width: 1000px) {
    display: flex;
    align-itmes: center;
    gap: 1rem;
    cursor: pointer;
    font-size: var(--nav-font-size);
  }
`;

const Navigation = () => {
  return (
    <NavBarWrapper>
      <NavBar>
        <Logo>LFG</Logo>
        <Navs>
          <Nav>LOANS</Nav>
          <Nav>TRADES</Nav>
          <Nav>TRADE APP</Nav>
          <Nav>STAKE</Nav>
          <Nav>
            <KeyboardArrowDownIcon />
            MORE
          </Nav>
        </Navs>
        <Login>Login</Login>
        <Menu>
          Menu
          <MenuIcon />
        </Menu>
      </NavBar>
    </NavBarWrapper>
  );
};

export default Navigation;
