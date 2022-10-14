const hre = require('hardhat');
const {
  deployContract,
  writeTmpAddresses,
  VerifyContract,
} = require('../shared/helpers');

async function main() {
  const [deployer] = await ethers.getSigners();

  const WETH9 = await deployContract('WETH9', [], deployer);

  VerifyContract(WETH9.address);
  // writeTmpAddresses({ WETH9: WETH9.address });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
