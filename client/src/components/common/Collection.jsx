import React from "react";
import styled from "styled-components";

const CollectionDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover > * {
    color: white;
  }
`;

const CollectionList = styled.input.attrs((props) => ({
  type: "checkbox",
  id: props.name,
  name: props.name,
}))`
  margin-right: 1rem;
`;

const Collection = ({ name }) => {
  return (
    <CollectionDiv>
      <CollectionList name={name} />
      <label htmlFor={name}>{name}</label>
    </CollectionDiv>
  );
};

export default Collection;
