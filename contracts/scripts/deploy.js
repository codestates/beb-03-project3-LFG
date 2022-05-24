async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(`Deploying contracts with the account: ${deployer.address}`);
  console.log(`Account balance: ${(await deployer.getBalance()).toString()}`);

  const Vote = await ethers.getContractFactory("Vote");
  const vote = await Vote.deploy(
    "0xe6f023036c06862d9a8e00cea169653f1cb1ab14",
    1
  );

  console.log(`Contract deployed to address: ${vote.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
