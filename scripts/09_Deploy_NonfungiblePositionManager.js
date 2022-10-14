const hre = require('hardhat');
const { ContractFactory } = require('ethers');
const { writeTmpAddresses, readTmpAddresses } = require('../shared/helpers');

const artifacts = {
  NonfungiblePositionManager: require('@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json'),
};

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const UniswapV3Factory_ADDRESS = readTmpAddresses().UniswapV3Factory;
  const WETH9_ADDRESS = readTmpAddresses().WETH9;
  const NonfungibleTokenPositionDescriptor_ADDRESS =
    readTmpAddresses().NonfungibleTokenPositionDescriptor;

  const NonfungiblePositionManager = new ContractFactory(
    artifacts.NonfungiblePositionManager.abi,
    artifacts.NonfungiblePositionManager.bytecode,
    deployer,
  );
  const nonfungiblePositionManager = await NonfungiblePositionManager.deploy(
    UniswapV3Factory_ADDRESS,
    WETH9_ADDRESS,
    NonfungibleTokenPositionDescriptor_ADDRESS,
  );

  console.log(
    `NonfungiblePositionManager : ${nonfungiblePositionManager.address}`,
  );

  await nonfungiblePositionManager.deployed();
  console.log('completed');

  // writeTmpAddresses({
  //   NonfungiblePositionManager: nonfungiblePositionManager.address,
  // });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
