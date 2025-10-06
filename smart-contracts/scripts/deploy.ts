import { ethers } from "hardhat";

async function main() {
  console.log("Deploying contracts...");

  // Deploy GameToken
  const GameToken = await ethers.getContractFactory("GameToken");
  const gameToken = await GameToken.deploy();
  await gameToken.waitForDeployment();
  const gameTokenAddress = await gameToken.getAddress();
  console.log("GameToken deployed to:", gameTokenAddress);

  // Deploy GameManager
  const GameManager = await ethers.getContractFactory("GameManager");
  const gameManager = await GameManager.deploy(gameTokenAddress);
  await gameManager.waitForDeployment();
  const gameManagerAddress = await gameManager.getAddress();
  console.log("GameManager deployed to:", gameManagerAddress);

  console.log("\nDeployment Summary:");
  console.log("==================");
  console.log("GameToken:", gameTokenAddress);
  console.log("GameManager:", gameManagerAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
