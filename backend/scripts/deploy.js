const hre = require("hardhat");

async function main() {
  const TimeCapsule = await hre.ethers.getContractFactory("TimeCapsule");
  const timeCapsule = await TimeCapsule.deploy();

  await timeCapsule.deployed();

  console.log("TimeCapsule deployed to:", timeCapsule.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });