import React from "react";
import styled from "styled-components";
import { HelpOutline } from "../common";

const RequestDiv = styled.div``;
const Property = styled.div`
  color: white;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  & > span {
    margin-right: 0.3rem;
  }
`;
const Value = styled.div`
  display: flex;
  align-items: center;

  & > img {
    margin-right: 0.3rem;
    width: 20px;
  }
`;

const Request = ({ property, value }) => {
  return (
    <RequestDiv>
      <Property>
        <span>{property}</span>
        <HelpOutline />
      </Property>
      <Value>
        {typeof value === "number"
          ? [
              <img
                key={0}
                src="https://s2.coinmarketcap.com/static/img/coins/64x64/4256.png"
                alt="klaytn"
              />,
              value,
            ]
          : value}
      </Value>
    </RequestDiv>
  );
};

export default Request;
