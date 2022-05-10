import React, { useRef, useState } from "react";
import {
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon,
  FilterList,
  FilterTitle,
} from "../common";
import styled from "styled-components";

const FilterInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: red;
  padding: 0.6rem 0.3rem 0.6rem 0.3rem;

  display: none;
`;
const InputWraper = styled.div`
  padding: 0.5rem;
`;
const FilterInput = styled.input.attrs((props) => ({
  value: props.value,
}))`
  width: 100%;
  border-radius: 1rem;
  outline: none;
  border: none;
  padding: 0.5rem;
`;

const FilterListNumber = ({ title }) => {
  const [show, setShow] = useState(false);
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const ref = useRef();

  const filterTitleClick = (event) => {
    ref.current.classList.toggle("active");
    setShow((prev) => !prev);
  };

  const handleChange = (value, callback) => {
    if (isNaN(Number(value))) {
      return;
    }

    callback((prev) => value);
  };
  return (
    <FilterList>
      <FilterTitle onClick={filterTitleClick} show={show}>
        {title}
        {show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </FilterTitle>

      <FilterInfo ref={ref}>
        <InputWraper>
          <FilterInput
            value={fromValue}
            onChange={(e) => handleChange(e.target.value, setFromValue)}
          />
        </InputWraper>
        <span>TO</span>
        <InputWraper>
          <FilterInput
            value={toValue}
            onChange={(e) => handleChange(e.target.value, setToValue)}
          />
        </InputWraper>
      </FilterInfo>
    </FilterList>
  );
};

export default FilterListNumber;
