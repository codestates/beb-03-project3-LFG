import React from "react";
import styled from "styled-components";

const AttributeWrapper = styled.div`
  border-radius: 1rem;
  padding: 0.5rem;
  background-color: salmon;
`;

const Property = styled.div`
  color: gray;
  font-size: 0.75rem;
`;
const Value = styled.div``;

const AttributeCard = ({ property, value }) => {
  return (
    <AttributeWrapper>
      <Property>{property}</Property>
      <Value>{value}</Value>
    </AttributeWrapper>
  );
};

export default AttributeCard;
