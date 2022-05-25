import React from "react";
import styled from "styled-components";
import FilterListCollection from "./FilterListCollection";
import FilterListNumber from "./FilterListNumber";

const FilterWrapper = styled.section`
  display: flex;
  flex-direction: column;
  background-color: var(--main-theme);
  top: 85px;
  position: sticky;
  padding: 0.5rem;
  width: 20rem;

  @media (max-width: 1000px) {
    width: 100%;
    position: static;
  }
`;

const Filters = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 1000px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 700px) {
    display: flex;
  }
`;

const Filter = () => {
  const filterArr = [
    { name: "Amount (KLAY)" },
    { name: "Collections" },
    { name: "Total Interest Amount (KLAY)" },
    { name: "Loan Period (Days)" },
  ];

  return (
    <FilterWrapper>
      <h3>Filters</h3>
      <Filters>
        {filterArr.map((filter, idx) => {
          if (filter.name === "Collections") {
            return <FilterListCollection key={idx} title={filter.name} />;
          } else {
            return <FilterListNumber key={idx} title={filter.name} />;
          }
        })}
      </Filters>
    </FilterWrapper>
  );
};

export default Filter;
