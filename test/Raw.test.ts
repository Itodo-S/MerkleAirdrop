import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from 'chai';
import { ethers } from 'hardhat';
import merkle from "../merkle";
const { generateMerkleRoot, generateMerkleProof } = merkle;

describe('MerkleAirdrop', function () {
  async function deployTokenFixture() {
    const SmartDev = await ethers.getContractFactory("SmartDev");
    const token = await SmartDev.deploy();
    return { token };
  }

  async function deployMerkleAirdropFixture() {
    const { token } = await loadFixture(deployTokenFixture);
    const MerkleAirdrop = await ethers.getContractFactory("MerkleAirdrop");
    const signers = await ethers.getSigners();
    const [owner, user1, user2, user3, user4, user5, user6, user7] = signers;

    const userData = [
      { address: user1.address, amount: ethers.parseEther("1.0").toString() },
      { address: user2.address, amount: ethers.parseEther("2.0").toString() },
      { address: user3.address, amount: ethers.parseEther("3.0").toString() },
      { address: user4.address, amount: ethers.parseEther("4.0").toString() },
      { address: user5.address, amount: ethers.parseEther("5.0").toString() },
      { address: user6.address, amount: ethers.parseEther("6.0").toString() }

    ];
    // const hash = await generateMerkleRootFromArray(userData);
    const hash = await generateMerkleRoot();

    const merkleRoot = hash;
    const merkleAirdrop = await MerkleAirdrop.deploy(token, merkleRoot);
    const rewardAmount = ethers.parseEther("100.0");


    await token.transfer(await merkleAirdrop.getAddress(), rewardAmount);
    const contractBalance = await token.balanceOf(await merkleAirdrop.getAddress());
    // console.log(`Contract balance: ${contractBalance.toString()}`);

    return { token, merkleAirdrop, hash, userData, merkleRoot, owner, user1, user2, user3, user4, user5, user6, user7 };
  }


  it('Should deploy with the correct merkle root', async function () {
    const { merkleAirdrop, merkleRoot } = await loadFixture(deployMerkleAirdropFixture);
    expect(await merkleAirdrop.merkleRoot()).to.equal(merkleRoot);
  });

  it('Should allow valid claims', async function () {
    const { merkleAirdrop, hash, userData, user1, token } = await loadFixture(deployMerkleAirdropFixture);
    const amount = ethers.parseEther("100.0").toString();
    // const proof = await generateMerkleProofWithRoot(hash, user1.address, amount, userData);
    const proof = await generateMerkleProof(user1.address, amount);
    console.log(`Address: ${user1.address}`);
    console.log(`Amount: ${amount}`);
    console.log(`Proof: ${proof}`);
    await merkleAirdrop.connect(user1).claim(user1.address, amount, proof);

  });
});
