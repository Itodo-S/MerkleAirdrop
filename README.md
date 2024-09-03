## Merkle Airdrop Project

## Project Overview

This project offers a solution for distributing tokens through a Merkle Airdrop contract. It includes a `merkle.ts` script for generating Merkle proofs and a `MerkleAirdrop` smart contract to manage the airdrop process.

## Setup and Execution

To set up and execute the project, follow these instructions:

1. Install the necessary dependencies:
`npm install`

2. Execute the script: 
`node merkle.ts`

## Contract Deployment

To deploy the MerkleAirdrop contract, proceed with these steps:

1. Compile the Solidity contract using your preferred compiler.
2. Deploy the contract to your chosen blockchain network.
3. Supply the ERC20 token address and the Merkle root when initializing the contract.

## Generating Merkle Proofs

To create a Merkle proof for claiming tokens, follow these steps:

1. Create a CSV file named addresses.csv that includes the addresses and corresponding token amounts for the airdrop.
2. Run the merkle.ts script, providing the address and amount as input parameters.
3. The script will generate and display the proof in the console.

## Functions of MerkleAirdrop.sol

The MerkleAirdrop contract includes the following functions:

* constructor: Sets up the contract with the ERC20 token address and the Merkle root.
* claim: Allows users to claim their tokens by presenting their address, the claim amount, and a valid Merkle proof.
* merkleRoot: Returns the current Merkle root used for verifying claims.
token: Provides the address of the ERC20 token used for the airdrop.

## Assumptions and Constraints

* It is assumed that the addresses and amounts for the airdrop are listed in a file named `addresses.csv`.
* The `MerkleAirdrop` contract presumes that the ERC20 token has been deployed and that the airdrop tokens have been allocated to the contract.
Both the script and contract assume that the Merkle root is a valid 32-byte hash.

## Implementation Details

The `merkle.ts` script generates the Merkle tree and proofs using the `MerkleTree` class from the `merkletreejs` library. The MerkleAirdrop contract is written in Solidity and utilizes Merkle proofs to verify claim eligibility.

## Testing the Contract

To test the application, utilize the test files located in the test directory. These tests address various scenarios, including contract deployment with the correct Merkle root, successful claims, invalid claims, and prevention of double claims.

Run the tests with the following command:
`npx hardhat test`