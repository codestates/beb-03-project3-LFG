async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(`Deploying contracts with the account: ${deployer.address}`);
  console.log(`Account balance: ${(await deployer.getBalance()).toString()}`);
  const Vote = await ethers.getContractFactory("Vote");
  const vote = await Vote.deploy(
    "0xae0f3b010cec518db205f5baf849b8865309bf52",
    0
  );

  console.log(`Contract deployed to address: ${vote.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
