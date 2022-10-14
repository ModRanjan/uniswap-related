const hre = require('hardhat');
const {
  deployContract,
  writeTmpAddresses,
  VerifyContract,
} = require('../shared/helpers');

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const GoldiCoin = await deployContract('GoldiCoin', [], deployer);

  VerifyContract(GoldiCoin.address);
  // writeTmpAddresses({ GoldiCoin: GoldiCoin.address });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
