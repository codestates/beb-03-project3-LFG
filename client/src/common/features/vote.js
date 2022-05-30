export const getVotes = async (voteAddr, setProsCons) => {
  const proposalABI = [
    {
      name: "proposal",
      type: "function",
      inputs: [],
      outputs: [
        { type: "uint256", name: "id" },
        { type: "uint256", name: "pros" },
        { type: "uint256", name: "cons" },
      ],
    },
  ];

  const voteContract = new window.caver.klay.Contract(proposalABI, voteAddr);
  const proposal = await voteContract.methods.proposal().call();

  setProsCons((prev) => {
    return { pros: parseInt(proposal.pros), cons: parseInt(proposal.cons) };
  });
};

export const vote = async (tokenIds, voteAddr, pc, user) => {
  const voteEncoded = window.caver.abi.encodeFunctionCall(
    {
      name: "vote",
      type: "function",
      inputs: [
        { type: "uint256[]", name: "tokenIds" },
        { type: "uint8", name: "pc" },
      ],
    },
    [tokenIds, pc]
  );

  await window.caver.klay.sendTransaction({
    type: "SMART_CONTRACT_EXECUTION",
    from: user,
    to: voteAddr,
    data: voteEncoded,
    gas: "10000000",
  });
};

export const checkClosed = async (voteAddr, setIsClosed) => {
  const closeABI = [
    {
      name: "isClosed",
      type: "function",
      inputs: [],
      outputs: [{ type: "bool", name: "" }],
    },
  ];

  const voteContract = new window.caver.klay.Contract(closeABI, voteAddr);
  const isClosed = await voteContract.methods.isClosed().call();

  setIsClosed((prev) => !isClosed);
};

export const getPossibleTokenIdToVote = async (
  ids,
  voteAddr,
  setPossibleTokenIds
) => {
  const votedABI = [
    {
      name: "isIdVoted",
      type: "function",
      inputs: [{ type: "uint256", name: "id" }],
      outputs: [{ type: "bool", name: "" }],
    },
  ];

  const voteContract = new window.caver.klay.Contract(votedABI, voteAddr);
  let possibleIds = [];

  for (let id of ids) {
    let ok = await voteContract.methods.isIdVoted(id).call();
    if (!ok) {
      possibleIds.push(id);
    }
  }
  setPossibleTokenIds((prev) => possibleIds);
};
