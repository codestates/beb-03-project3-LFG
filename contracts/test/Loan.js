const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Loan Factory", function () {
  let testNFTContract, loanFactoryContract, loanContract;
  let byteCode;
  let addr1, addr2, addr3, debtor, creditor;
  let addrs;
  beforeEach(async function () {
    [debtor, creditor, addr1, addr2, addr3, ...addrs] =
      await ethers.getSigners();

    let testNFTFactory = await ethers.getContractFactory("TestNFT");
    testNFTContract = await testNFTFactory.deploy();

    let loanFactory_Factory = await ethers.getContractFactory("LoanFactory");
    loanFactoryContract = await loanFactory_Factory.deploy();

    let loanFactory = await ethers.getContractFactory("Loan");

    let abiCoder = new ethers.utils.AbiCoder();
    let byte = abiCoder.encode(
      ["address", "address", "uint256", "uint256", "uint256", "uint256"],
      [
        debtor.address,
        testNFTContract.address,
        0,
        60,
        10000000000000000000n,
        1000000000000000000n,
      ]
    );

    byteCode = ethers.utils.solidityPack(
      ["bytes", "bytes"],
      [loanFactory.bytecode, byte]
    );

    await testNFTContract.mint();
    await testNFTContract["safeTransferFrom(address,address,uint256)"](
      debtor.address,
      loanFactoryContract.address,
      0
    );

    let tx = await loanFactoryContract.deploy(
      byteCode,
      testNFTContract.address,
      0
    );

    let receipt = await tx.wait();
    let loanContractAddress = receipt.events?.filter((x) => {
      return x.event === "Deploy";
    })[0].args.addr;

    loanContract = await ethers.getContractAt("Loan", loanContractAddress);
  });

  describe("Deploy Loan Contract", async function () {
    it("Deployed", async function () {
      let term = await loanContract.term();

      expect(term.state).to.equal(0);
    });

    it("Cancel", async function () {
      let tx = await loanContract.cancel();
      let receipt = await tx.wait();

      let cancelled = receipt.events?.some((x) => {
        return x.event === "Cancel";
      });

      expect(cancelled).to.equal(true);
    });

    it("Edit", async function () {
      let tx = await loanContract.edit(
        50,
        10000000000000000000n,
        1000000000000000000n
      );
      await tx.wait();

      let term = await loanContract.term();

      expect(term.period.toString()).to.equal("50");
    });

    it("Fund", async function () {
      let tx = await loanContract
        .connect(creditor)
        .fund({ value: 10100000000000000000n });
      await tx.wait();

      let term = await loanContract.term();

      expect(term.creditor).to.equal(creditor.address);
    });

    it("Repay", async function () {
      let tx = await loanContract
        .connect(creditor)
        .fund({ value: 10100000000000000000n });
      await tx.wait();

      tx = await loanContract.repay({ value: 10300000000000000000n });

      let owner = await testNFTContract.ownerOf(0);

      expect(owner).to.equal(debtor.address);
    });

    it("To On_Grace", async function () {
      this.timeout(80000);

      let tx = await loanContract
        .connect(creditor)
        .fund({ value: 10100000000000000000n });
      await tx.wait();

      const sleep = (ms) => new Promise((r) => setTimeout(r, ms)); // 60초 대기
      await sleep(61000);

      tx = await loanContract.on_grace();

      let term = await loanContract.term();
      expect(term.state).to.equal(2);
    });
  });
});
