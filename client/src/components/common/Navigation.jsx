import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Close, MenuIcon, KeyboardArrowDownIcon } from "../../common";
import Logo from "./Logo";
import Login from "./Login";

const NavBarWrapper = styled.nav`
  background-color: var(--main-theme);
  position: fixed;
  top: 0;
  left: 0;
  height: var(--nav-bar-height);
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

const LoginWrapper = styled.div`
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

const Navigation = ({ dropdown, handleDropDown }) => {
  const navigate = useNavigate();

  return (
    <NavBarWrapper>
      <NavBar>
        <Logo>LFG</Logo>
        <Navs>
          <Nav
            onClick={() => {
              navigate("/loans/listings");
            }}
          >
            LOANS
          </Nav>
          <Nav
            onClick={() => {
              navigate("/trade-create");
            }}
          >
            TRADE
          </Nav>
          <Nav
            onClick={() => {
              navigate("/vote-list");
            }}
          >
            VOTE
          </Nav>
          <Nav>STAKE</Nav>
          <Nav>
            <KeyboardArrowDownIcon />
            MORE
          </Nav>
        </Navs>
        <LoginWrapper>
          <Login />
        </LoginWrapper>
        <Menu onClick={handleDropDown}>
          Menu
          {dropdown ? <Close /> : <MenuIcon />}
        </Menu>
      </NavBar>
    </NavBarWrapper>
  );
};

export default Navigation;
