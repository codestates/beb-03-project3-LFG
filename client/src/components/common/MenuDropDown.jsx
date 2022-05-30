import React from "react";
import { useNavigate } from "react-router-dom";
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

const MenuDropDown = ({ handleDropDown }) => {
  const navigate = useNavigate();

  return (
    <DropDownWrapper onClick={handleDropDown}>
      <DropDown>
        <DropDownMenu
          onClick={(e) => {
            navigate("/loans/listings");
            handleDropDown();
            e.stopPropagation();
          }}
        >
          Loans
        </DropDownMenu>
        <DropDownMenu
          onClick={() => {
            navigate("/trade-create");
          }}
        >
          Trade
        </DropDownMenu>
        <DropDownMenu
          onClick={() => {
            navigate("/vote-list");
          }}
        >
          Vote
        </DropDownMenu>
        <DropDownMenu
          onClick={() => {
            navigate("/profile/wallet");
          }}
        >
          My Account
        </DropDownMenu>
        <DropDownMenu>Contact</DropDownMenu>
      </DropDown>
    </DropDownWrapper>
  );
};

export default MenuDropDown;
