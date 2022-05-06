import React from "react";
import styled from "styled-components";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Button = styled.button`
  outline: none;
  background-color: tomato;
  border: 1px solid white;
  padding: 0.3rem 1rem 0.3rem 1rem;
  border-radius: 1rem;
  font-family: "Times new Roman";
  display: flex;
  align-items: center;

  &: hover {
    background-color: #ff6347b5;
  }
`;

const LoanListingBtn = () => {
  return (
    <Button>
      <CalendarMonthIcon />
      Create a Loan Listing
    </Button>
  );
};

export default LoanListingBtn;
