require('@nomicfoundation/hardhat-toolbox');
require('@nomicfoundation/hardhat-chai-matchers');
require('@nomiclabs/hardhat-ethers');

require('dotenv').config();
const ALCHMY_GOERLI_API_KEY = process.env.ALCHMY_GOERLI_API_KEY;
const ALCHMY_MUMBAI_API_KEY = process.env.ALCHMY_MUMBAI_API_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const POLYGON_API_KEY = process.env.POLYGON_API_KEY;
const PRIVATE_KEY1 = process.env.PRIVATE_KEY1;
console.log('ALCHMY_GOERLI_API_KEY :', ALCHMY_GOERLI_API_KEY);
console.log('ALCHMY_MUMBAI_API_KEY :', ALCHMY_MUMBAI_API_KEY);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHMY_GOERLI_API_KEY}`,
      gas: 8000000,
      gasMultiplier: 2,
      accounts: PRIVATE_KEY1 !== undefined ? [PRIVATE_KEY1] : [],
    },
    mumbai: {
      // url: `https://polygon-mumbai.infura.io/v3/${ALCHMY_MUMBAI_API_KEY}`,
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHMY_MUMBAI_API_KEY}`,
      accounts: [
        '468c3a5d4f5fa32e815365a57283b9fafc9f003095a783ac61a85cc2e3d64143',
      ],
    },
  },
  solidity: {
    compilers: [
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
      'contracts/PugCoin.sol': {
        version: '0.7.0',
      },
      'contracts/GoldiCoin.sol': {
        version: '0.7.0',
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
