const hre = require('hardhat');
const { ContractFactory } = require('ethers');
const { writeTmpAddresses, readTmpAddresses } = require('../shared/helpers');

const artifacts = {
  Quoter: require('@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json'),
};

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const UniswapV3Factory_ADDRESS = readTmpAddresses().UniswapV3Factory;
  const WETH9_ADDRESS = readTmpAddresses().WETH9;

  const Quoter = new ContractFactory(
    artifacts.Quoter.abi,
    artifacts.Quoter.bytecode,
    deployer,
  );
  const quoter = await Quoter.deploy(UniswapV3Factory_ADDRESS, WETH9_ADDRESS);

  console.log(`Quoter : ${quoter.address}`);

  await quoter.deployed();
  console.log('completed!');

  // writeTmpAddresses({ Quoter: quoter.address });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
