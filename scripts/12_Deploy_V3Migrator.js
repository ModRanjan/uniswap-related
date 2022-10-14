const hre = require('hardhat');
const { ContractFactory } = require('ethers');
const { writeTmpAddresses, readTmpAddresses } = require('../shared/helpers');

const artifacts = {
  V3Migrator: require('@uniswap/v3-periphery/artifacts/contracts/V3Migrator.sol/V3Migrator.json'),
};

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const FACTORY_ADDRESS = readTmpAddresses().UniswapV3Factory;
  const WETH9_ADDRESS = readTmpAddresses().WETH9;
  const NonfungibleTokenPositionDescriptor_ADDRESS =
    readTmpAddresses().NonfungibleTokenPositionDescriptor;
  console.log(
    FACTORY_ADDRESS,
    WETH9_ADDRESS,
    NonfungibleTokenPositionDescriptor_ADDRESS,
  );

  const V3Migrator = new ContractFactory(
    artifacts.V3Migrator.abi,
    artifacts.V3Migrator.bytecode,
    deployer,
  );
  //   console.log(V3Migrator);

  const v3Migrator = await V3Migrator.deploy(
    FACTORY_ADDRESS,
    WETH9_ADDRESS,
    NonfungibleTokenPositionDescriptor_ADDRESS,
  );
  console.log('V3Migrator :', v3Migrator.address);

  await v3Migrator.deployed();
  console.log('complete!');

  // writeTmpAddresses({ V3Migrator: v3Migrator.address });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
