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
  const voteEncoded = window.caver.abi.encodeFunctionCal(
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
