require('@nomicfoundation/hardhat-toolbox');
require('@nomicfoundation/hardhat-chai-matchers');
require('@nomiclabs/hardhat-ethers');

require('dotenv').config();
const INFURA_KEY = process.env.INFURA_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const POLYGON_API_KEY = process.env.POLYGON_API_KEY;
const PRIVATE_KEY1 = process.env.PRIVATE_KEY1;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_KEY}`,
      gas: 8000000,
      gasMultiplier: 2,
      accounts: PRIVATE_KEY1 !== undefined ? [PRIVATE_KEY1] : [],
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`,
      accounts: PRIVATE_KEY1 !== undefined ? [PRIVATE_KEY1] : [],
    },
  },
  solidity: {
    compilers: [
      { version: '0.8.0' },
      {
        version: '0.7.6',
        Setting: {
          optimizer: {
            enabled: true,
            runs: 1000,
            details: { yul: false },
          },
        },
      },
    ],
    overrides: {
      'contracts/GoldBar.sol': {
        version: '0.8.0',
      },
      'contracts/PugCoin.sol': {
        version: '0.8.0',
      },
      'contracts/GoldiCoin.sol': {
        version: '0.8.0',
      },
    },
  },
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN_API_KEY,
      polygonMumbai: POLYGON_API_KEY,
    },
  },
};
