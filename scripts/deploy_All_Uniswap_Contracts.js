const { Contract, ContractFactory, utils, BigNumber } = require('ethers');
const { ethers } = require('hardhat');
const WETH9 = require('../util/WETH9.json');
const { linkLibraries } = require('../util/linkLibraries');
const bn = require('bignumber.js');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const INFURA_KEY = process.env.INFURA_KEY;

const artifacts = {
  UniswapV3Factory: require('@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json'),
  SwapRouter: require('@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json'),
  NFTDescriptor: require('@uniswap/v3-periphery/artifacts/contracts/libraries/NFTDescriptor.sol/NFTDescriptor.json'),
  NonfungibleTokenPositionDescriptor: require('@uniswap/v3-periphery/artifacts/contracts/NonfungibleTokenPositionDescriptor.sol/NonfungibleTokenPositionDescriptor.json'),
  NonfungiblePositionManager: require('@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json'),
  WETH9,
};

const uniswapV3Pool = require('@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json');

bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 });
function encodePriceSqrt(reserve1, reserve0) {
  return BigNumber.from(
    new bn(reserve1.toString())
      .div(reserve0.toString())
      .sqrt()
      .multipliedBy(new bn(2).pow(96))
      .toString(),
  );
}

const tmpAddressesFilepath = path.join(
  __dirname,
  '..',
  `.deployed-addresses.json`,
);
function readTmpAddresses() {
  if (fs.existsSync(tmpAddressesFilepath)) {
    return JSON.parse(fs.readFileSync(tmpAddressesFilepath));
  }
  return {};
}

function writeTmpAddresses(json) {
  const tmpAddresses = Object.assign(readTmpAddresses(), json);
  fs.writeFileSync(tmpAddressesFilepath, JSON.stringify(tmpAddresses));
}

async function main() {
  const [deployer, signer2] = await ethers.getSigners();

  // const PROVIDER = waffle.provider;
  const PROVIDER = new ethers.providers.JsonRpcProvider(
    `https://goerli.infura.io/v3/${INFURA_KEY}`,
  );

  const GoldBarCoin = await ethers.getContractFactory('GoldBar', deployer);
  const goldBar = await GoldBarCoin.deploy();
  await goldBar.deployed();
  console.log(`goldBar : ${goldBar.address}`);
  writeTmpAddresses({ goldBar: goldBar.address });

  const WETH9 = new ContractFactory(
    artifacts.WETH9.abi,
    artifacts.WETH9.bytecode,
    deployer,
  );

  const weth9 = await WETH9.deploy();
  await weth9.deployed();
  console.log(`weth9 : ${weth9.address}`);
  writeTmpAddresses({ weth9: weth9.address });

  const Factory = new ContractFactory(
    artifacts.UniswapV3Factory.abi,
    artifacts.UniswapV3Factory.bytecode,
    deployer,
  );
  const factory = await Factory.deploy();
  await factory.deployed();
  console.log(`factory : ${factory.address}`);
  writeTmpAddresses({ factory: factory.address });

  const SwapRouter = new ContractFactory(
    artifacts.SwapRouter.abi,
    artifacts.SwapRouter.bytecode,
    deployer,
  );
  const swapRouter = await SwapRouter.deploy(factory.address, weth9.address);
  await swapRouter.deployed();
  console.log(`swapRouter : ${swapRouter.address}`);
  writeTmpAddresses({ swapRouter: swapRouter.address });

  const NFTDescriptor = new ContractFactory(
    artifacts.NFTDescriptor.abi,
    artifacts.NFTDescriptor.bytecode,
    deployer,
  );
  const nftDescriptor = await NFTDescriptor.deploy();
  await nftDescriptor.deployed();
  console.log(`nftDescriptor : ${nftDescriptor.address}`);
  writeTmpAddresses({ nftDescriptor: nftDescriptor.address });

  const linkedByteCode = linkLibraries(
    {
      bytecode: artifacts.NonfungibleTokenPositionDescriptor.bytecode,
      linkReferences: {
        'NFTDescriptor.sol': {
          NFTDescriptor: [
            {
              length: 20,
              start: 1261,
            },
          ],
        },
      },
    },
    {
      NFTDescriptor: nftDescriptor.address,
    },
  );
  const NonfungibleTokenPositionDescriptor = new ContractFactory(
    artifacts.NonfungibleTokenPositionDescriptor.abi,
    linkedByteCode,
    deployer,
  );
  const nftPositionDescriptor = await NonfungibleTokenPositionDescriptor.deploy(
    weth9.address,
  );
  await nftPositionDescriptor.deployed();
  console.log(
    `NonfungibleTokenPositionDescriptor : ${nftPositionDescriptor.address}`,
  );
  writeTmpAddresses({ nftPositionDescriptor: nftPositionDescriptor.address });

  const NonfungiblePositionManager = new ContractFactory(
    artifacts.NonfungiblePositionManager.abi,
    artifacts.NonfungiblePositionManager.bytecode,
    deployer,
  );
  const nonfungiblePositionManager = await NonfungiblePositionManager.deploy(
    factory.address,
    weth9.address,
    nftPositionDescriptor.address,
  );
  await nonfungiblePositionManager.deployed();
  console.log(
    `NonfungiblePositionManager : ${nonfungiblePositionManager.address}`,
  );
  writeTmpAddresses({
    nonfungiblePositionManager: nonfungiblePositionManager.address,
  });

  const sqrtPrice = encodePriceSqrt(1, 1);
  console.log('sqrtPrice : ', sqrtPrice);

  // this will create the pool of weth9 and goldBarCoin, but this will not return poolAddress so, we have to
  // call the getPool() of v3-core repo.
  await nonfungiblePositionManager
    .connect(deployer)
    .createAndInitializePoolIfNecessary(
      weth9.address,
      goldBar.address,
      500,
      sqrtPrice,
      { gasLimit: 5000000 },
    );

  const poolAddress = await factory
    .connect(deployer)
    .getPool(weth9.address, GoldBarCoin.address, 500);

  console.log('poolAddress : ', poolAddress);

  const pool = new Contract(poolAddress, uniswapV3Pool.abi, PROVIDER);

  console.log('---------------');
  console.log('fee', pool.fee());
  console.log('slot0', pool.slot0());
  console.log('loquidity', pool.liquidity());
  console.log('---------------');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
