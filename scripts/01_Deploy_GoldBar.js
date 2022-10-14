const hre = require('hardhat');
const {
  deployContract,
  writeTmpAddresses,
  VerifyContract,
} = require('../shared/helpers');

async function main() {
  const [deployer] = await ethers.getSigners();

  const GoldBarCoin = await deployContract('GoldBar', [], deployer);

  VerifyContract(GoldBarCoin.address);
  // writeTmpAddresses({ GoldBarCoin: GoldBarCoin.address });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
