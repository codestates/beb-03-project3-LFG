import styled from "styled-components";

const FilterList = styled.div`
  .active {
    display: flex;
  }
`;

const FilterTitle = styled.div`
  background-color: tomato;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  align-items: center;

  border-radius: 0.5rem;
  padding: 0.5rem 0.5rem 0.7rem 0.5rem;

  border-bottom-left-radius: ${(props) => (props.show ? "0rem" : "0.5rem")};
  border-bottom-right-radius: ${(props) => (props.show ? "0rem" : "0.5rem")};
`;

export { FilterList, FilterTitle };
