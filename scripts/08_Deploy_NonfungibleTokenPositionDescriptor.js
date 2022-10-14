const { ContractFactory } = require('ethers');
const { writeTmpAddresses, readTmpAddresses } = require('../shared/helpers');
const { linkLibraries } = require('../util/linkLibraries');

const artifacts = {
  NFTDescriptor: require('@uniswap/v3-periphery/artifacts/contracts/libraries/NFTDescriptor.sol/NFTDescriptor.json'),
  NonfungibleTokenPositionDescriptor: require('@uniswap/v3-periphery/artifacts/contracts/NonfungibleTokenPositionDescriptor.sol/NonfungibleTokenPositionDescriptor.json'),
};

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const WETH9_ADDRESS = readTmpAddresses().WETH9;
  const NFTDescriptor_ADDRESS = readTmpAddresses().NFTDescriptor;

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
      NFTDescriptor: NFTDescriptor_ADDRESS,
    },
  );

  const NonfungibleTokenPositionDescriptor = new ContractFactory(
    artifacts.NonfungibleTokenPositionDescriptor.abi,
    linkedByteCode,
    deployer,
  );
  const nftPositionDescriptor = await NonfungibleTokenPositionDescriptor.deploy(
    WETH9_ADDRESS,
  );

  console.log(
    `NonfungiblePositionDescriptor : ${nftPositionDescriptor.address}`,
  );

  await nftPositionDescriptor.deployed();
  console.log('completed');

  // writeTmpAddresses({
  //   NonfungiblePositionDescriptor: nftPositionDescriptor.address,
  // });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
