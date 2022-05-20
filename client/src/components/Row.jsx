import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../common";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr 2fr 2fr 8fr;
  opacity: ${(props) => (props.status === "CANCELLED" ? 0.5 : 1)};
  & > div {
    display: flex;
    align-items: center;
    justify-self: start;
    overflow: hidden;
    width: 90%;
  }
`;

const RecNfts = styled.div`
  grid-column: 1 / span 1;
  padding-left: 0.2rem;
`;

const RecKlay = styled.div`
  grid-column: 2 / span 1;
  padding-left: 0.2rem;
`;

const OffNfts = styled.div`
  grid-column: 3 / 4;
  padding-left: 0.3rem;
`;

const OffKlay = styled.div`
  grid-column: 4 / 5;
  padding-left: 0.3rem;
`;

const From = styled.div`
  grid-column: 5 / 6;
  padding-left: 0.2rem;
  justify-content: space-between;
  width: 100%;
  padding-right: 3rem;
`;

const Img = styled.img.attrs((props) => ({
  src: props.fig,
}))`
  width: 2.5rem;
  height: 2.5rem;
  margin-left: -5px;
  border-radius: 0.5rem;
`;

const KlayIcon = styled.img.attrs((props) => ({
  src: props.fig,
}))`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.3rem;
`;

const Row = ({ data }) => {
  const navigate = useNavigate();
  return (
    <Wrapper status={data.status}>
      <RecNfts>
        {data.respondNFTList.map((metadata, idx) => (
          <Img key={idx} fig={metadata.image} />
        ))}
      </RecNfts>
      <RecKlay>
        <KlayIcon fig="https://s2.coinmarketcap.com/static/img/coins/64x64/4256.png" />
        {data.respondPaidKlay}
      </RecKlay>
      <OffNfts>
        {data.offerNFTList.map((metadata, idx) => (
          <Img key={idx} fig={metadata.image} />
        ))}
      </OffNfts>
      <OffKlay>
        <KlayIcon fig="https://s2.coinmarketcap.com/static/img/coins/64x64/4256.png" />
        {data.offerPaidKlay}
      </OffKlay>
      <From>
        {data.offerAddress}
        <Button
          style={{ backgroundColor: "transparent" }}
          onClick={() => {
            navigate("/trade-create/created", { state: { data } });
          }}
        >
          View
        </Button>
      </From>
    </Wrapper>
  );
};

export default Row;
