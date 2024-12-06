const hre = require("hardhat");

async function main() {
  // This is a placeholder USDC address - replace with actual USDC address for your target network
  const USDC_ADDRESS = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"; // Polygon USDC address

  // Deploy Pricing contract
  const Pricing = await hre.ethers.getContractFactory("Pricing");
  const pricing = await Pricing.deploy(USDC_ADDRESS);

  await pricing.deployed();

  console.log("Pricing contract deployed to:", pricing.address);
  console.log("USDC address used:", USDC_ADDRESS);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
