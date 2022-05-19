import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NFTAttributeModal from "../components/NFTAttributeModal";

const Trade = (props) => {
  const [receives, setReceives] = useState({ nfts: [], klay: "" });
  const [offers, setOffers] = useState({ nfts: [], klay: "" });
  const [counterParty, setCounterParty] = useState("");
  const [show, setShow] = useState(false);
  const [nftModal, setNftModal] = useState({});

  return (
    <div
      onClick={(e) => {
        if (show) setShow(false);
      }}
    >
      <Outlet
        context={{
          receives,
          setReceives,
          offers,
          setOffers,
          counterParty,
          setCounterParty,
          setNftModal,
          setShow,
        }}
      />
      {show ? <NFTAttributeModal data={nftModal} /> : null}
    </div>
  );
};

export default Trade;
