export const ConfirmTrade = async (
  offerAddress,
  respondAddress,
  offers,
  receives
) => {
  for (const nft of offers.nfts) {
    const approveEncoded = window.caver.abi.encodeFunctionCall(
      {
        name: "approve",
        type: "function",
        inputs: [
          { type: "address", name: "to" },
          { type: "uint256", name: "tokenId" },
        ],
      },
      [process.env.REACT_APP_TRADE_CONTRACT_ADDRESS, nft.tokenId]
    );

    await window.caver.klay.sendTransaction({
      type: "SMART_CONTRACT_EXECUTION",
      from: offerAddress,
      to: nft.nftAddress,
      data: approveEncoded,
      gas: "10000000",
    });
  }

  let offerNFTList = offers.nfts.map((nft) => nft.nftAddress);
  let offerIdList = offers.nfts.map((nft) => nft.tokenId);
  let respondNFTList = receives.nfts.map((nft) => nft.nftAddress);
  let respondIdList = receives.nfts.map((nft) => nft.tokenId);
  let offerPaidKlay = "0x" + (Number(offers.klay) * 1e18).toString(16);
  let respondPaidKlay = "0x" + (Number(receives.klay) * 1e18).toString(16);
  // console.log(
  //   offerNFTList,
  //   offerIdList,
  //   respondNFTList,
  //   respondIdList,
  //   offerPaidKlay,
  //   respondPaidKlay
  // );

  const makeTradeEncoded = window.caver.abi.encodeFunctionCall(
    {
      name: "makeTrade",
      type: "function",
      inputs: [
        { type: "address", name: "respondAddress" },
        { type: "address[]", name: "offerNFTList" },
        { type: "uint256[]", name: "offerIdList" },
        { type: "address[]", name: "respondNFTList" },
        { type: "uint256[]", name: "respondIdList" },
        { type: "uint256", name: "respondPaidKlay" },
      ],
    },
    [
      respondAddress,
      offerNFTList,
      offerIdList,
      respondNFTList,
      respondIdList,
      respondPaidKlay,
    ]
  );

  await window.caver.klay.sendTransaction({
    type: "SMART_CONTRACT_EXECUTION",
    from: offerAddress,
    to: process.env.REACT_APP_TRADE_CONTRACT_ADDRESS,
    value: offerPaidKlay,
    data: makeTradeEncoded,
    gas: "10000000",
  });
};

export const CancelTrade = async (id, user) => {
  const cancelTradeEncoded = window.caver.abi.encodeFunctionCall(
    {
      name: "cancelTrade",
      type: "function",
      inputs: [{ type: "uint256", name: "targetTradeId" }],
    },
    [id]
  );

  await window.caver.klay.sendTransaction({
    type: "SMART_CONTRACT_EXECUTION",
    from: user,
    to: process.env.REACT_APP_TRADE_CONTRACT_ADDRESS,
    data: cancelTradeEncoded,
    gas: "10000000",
  });
};
export const AcceptTrade = async (id, user, offers, klay) => {
  for (const nft of offers) {
    const approveEncoded = window.caver.abi.encodeFunctionCall(
      {
        name: "approve",
        type: "function",
        inputs: [
          { type: "address", name: "to" },
          { type: "uint256", name: "tokenId" },
        ],
      },
      [process.env.REACT_APP_TRADE_CONTRACT_ADDRESS, nft.tokenId]
    );

    await window.caver.klay.sendTransaction({
      type: "SMART_CONTRACT_EXECUTION",
      from: user,
      to: nft.nftAddress,
      data: approveEncoded,
      gas: "10000000",
    });
  }

  const acceptTradeEncoded = window.caver.abi.encodeFunctionCall(
    {
      name: "acceptTrade",
      type: "function",
      inputs: [{ type: "uint256", name: "targetTradeId" }],
    },
    [id]
  );

  let respondPaidKlay = "0x" + (Number(klay) * 1e18).toString(16);

  await window.caver.klay.sendTransaction({
    type: "SMART_CONTRACT_EXECUTION",
    from: user,
    to: process.env.REACT_APP_TRADE_CONTRACT_ADDRESS,
    value: respondPaidKlay,
    data: acceptTradeEncoded,
    gas: "10000000",
  });
};
