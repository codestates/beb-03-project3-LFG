import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const Trade = (props) => {
  const [receives, setReceives] = useState({ nfts: [], klay: "" });
  const [offers, setOffers] = useState({ nfts: [], klay: "" });
  const [counterParty, setCounterParty] = useState("");

  return (
    <div>
      <Outlet
        context={{
          receives,
          setReceives,
          offers,
          setOffers,
          counterParty,
          setCounterParty,
        }}
      />
    </div>
  );
};

export default Trade;
