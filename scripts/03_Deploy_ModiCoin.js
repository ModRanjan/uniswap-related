const hre = require('hardhat');
const {
  deployContract,
  writeTmpAddresses,
  VerifyContract,
} = require('../shared/helpers');

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const ModiCoin = await deployContract('ModiCoin', [], deployer);

  VerifyContract(ModiCoin.address);
  // writeTmpAddresses({ ModiCoin: ModiCoin.address });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
