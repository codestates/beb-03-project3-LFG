import React from "react";
import styled from "styled-components";

const DropDownWrapper = styled.div`
  height: 100vh;
  padding: 14rem 2rem 0 2rem;
`;
const DropDown = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
const DropDownMenu = styled.li`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: tomato;
  border-radius: 4rem;
  padding-top: 1.8rem;
  padding-bottom: 1.8rem;
`;

const MenuDropDown = () => {
  return (
    <DropDownWrapper>
      <DropDown>
        <DropDownMenu>Loans</DropDownMenu>
        <DropDownMenu>Trades</DropDownMenu>
        <DropDownMenu>Trade App</DropDownMenu>
        <DropDownMenu>Stake</DropDownMenu>
        <DropDownMenu>My Account</DropDownMenu>
        <DropDownMenu>Contact</DropDownMenu>
      </DropDown>
    </DropDownWrapper>
  );
};

export default MenuDropDown;
