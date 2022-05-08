import React, { useRef, useState } from "react";
import {
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon,
  FilterList,
  FilterTitle,
} from "../common";
import Collection from "./Collection";
import styled from "styled-components";

const FilterInfo = styled.div`
  display: flex;
  flex-direction: column;
  background-color: red;
  padding: 0.3rem 0.6rem 0.3rem 0.6rem;

  display: none;
`;

const SearchWrapper = styled.div`
  width: 100%;
  padding: 0.5rem;
`;
const Search = styled.input.attrs((props) => ({
  value: props.value,
  onChange: props.onChange,
}))`
  width: 100%;
  outline: none;
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 0.3rem;
`;
const CollectionsWrapper = styled.div``;
const Collections = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
`;

const FilterListCollection = ({ title }) => {
  const [show, setShow] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const ref = useRef();

  const collections = [
    { name: "Astrals" },
    { name: "Aurory" },
    { name: "Best Buds" },
  ];

  const filterTitleClick = (event) => {
    ref.current.classList.toggle("active");
    setShow((prev) => !prev);
  };

  const filterCollections = (input) => {
    return collections.filter((c) => c.name.includes(input));
  };

  return (
    <FilterList>
      <FilterTitle onClick={filterTitleClick} show={show}>
        {title}
        {show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </FilterTitle>
      <FilterInfo ref={ref}>
        <SearchWrapper>
          <Search
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
        </SearchWrapper>
        <CollectionsWrapper>
          <Collections>
            {filterCollections(searchInput).map((col, idx) => {
              return <Collection key={idx} name={col.name} />;
            })}
          </Collections>
        </CollectionsWrapper>
      </FilterInfo>
    </FilterList>
  );
};

export default FilterListCollection;
