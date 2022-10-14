const hre = require('hardhat');
const { ContractFactory } = require('ethers');
const { writeTmpAddresses, VerifyContract } = require('../shared/helpers');

const artifacts = {
  NFTDescriptor: require('@uniswap/v3-periphery/artifacts/contracts/libraries/NFTDescriptor.sol/NFTDescriptor.json'),
};

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const NFTDescriptor = new ContractFactory(
    artifacts.NFTDescriptor.abi,
    artifacts.NFTDescriptor.bytecode,
    deployer,
  );
  const nftDescriptor = await NFTDescriptor.deploy();

  console.log(`NFTDescriptor : ${nftDescriptor.address}`);

  await nftDescriptor.deployed();
  console.log('completed');

  // verify
  // await VerifyContract('nftDescriptor.address');

  // writeTmpAddresses({ NFTDescriptor: nftDescriptor.address });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
