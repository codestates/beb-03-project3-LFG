import React, { useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { FilterList, FilterTitle } from "./FilterList";
import styled from "styled-components";

const FilterInfo = styled.div`
  display: flex;
  flex-direction: column;

  display: none;
`;

const SearchWrapper = styled.div``;
const Search = styled.input``;
const CollectionsWrapper = styled.div``;
const Collections = styled.ul`
  display: flex;
  flex-direction: column;
`;
const Collection = styled.li``;

const FilterListCollection = ({ title }) => {
  const [show, setShow] = useState(false);
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
  return (
    <FilterList>
      <FilterTitle onClick={filterTitleClick}>
        {title}
        {show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </FilterTitle>
      <FilterInfo ref={ref}>
        <SearchWrapper>
          <Search />
        </SearchWrapper>
        <CollectionsWrapper>
          <Collections>
            {collections.map((col, idx) => (
              <Collection key={idx}>{col.name}</Collection>
            ))}
          </Collections>
        </CollectionsWrapper>
      </FilterInfo>
    </FilterList>
  );
};

export default FilterListCollection;
