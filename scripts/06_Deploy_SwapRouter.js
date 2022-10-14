const hre = require('hardhat');
const { ContractFactory } = require('ethers');
const { writeTmpAddresses, readTmpAddresses } = require('../shared/helpers');

const WETH9 = require('../util/WETH9.json');
const artifacts = {
  UniswapV3Factory: require('@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json'),
  SwapRouter: require('@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json'),
  NFTDescriptor: require('@uniswap/v3-periphery/artifacts/contracts/libraries/NFTDescriptor.sol/NFTDescriptor.json'),
  NonfungibleTokenPositionDescriptor: require('@uniswap/v3-periphery/artifacts/contracts/NonfungibleTokenPositionDescriptor.sol/NonfungibleTokenPositionDescriptor.json'),
  NonfungiblePositionManager: require('@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json'),
  WETH9,
};

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const FACTORY_ADDRESS = readTmpAddresses().UniswapV3Factory;
  const WETH9_ADDRESS = readTmpAddresses().WETH9;

  const SwapRouter = new ContractFactory(
    artifacts.SwapRouter.abi,
    artifacts.SwapRouter.bytecode,
    deployer,
  );
  const swapRouter = await SwapRouter.deploy(FACTORY_ADDRESS, WETH9_ADDRESS);

  console.log(`swapRouter : ${swapRouter.address}`);

  await swapRouter.deployed();
  console.log('completed!');

  // writeTmpAddresses({ SwapRouter: swapRouter.address });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
