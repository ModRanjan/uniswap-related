const hre = require('hardhat');
const { ContractFactory } = require('ethers');
const { writeTmpAddresses } = require('../shared/helpers');

const artifacts = {
  UniswapV3Factory: require('@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json'),
};

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const UniswapV3Factory = new ContractFactory(
    artifacts.UniswapV3Factory.abi,
    artifacts.UniswapV3Factory.bytecode,
    deployer,
  );
  const uniswapV3Factory = await UniswapV3Factory.deploy();

  console.log(`uniswapV3Factory : ${uniswapV3Factory.address}`);

  await uniswapV3Factory.deployed();
  console.log('completed!');

  // writeTmpAddresses({ UniswapV3Factory: uniswapV3Factory.address });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
