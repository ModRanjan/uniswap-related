require('@nomicfoundation/hardhat-toolbox');
require('@nomiclabs/hardhat-waffle');
// require('@uniswap/hardhat-v3-deploy');
// require('uniswap-v3-deploy-plugin');

const INFURA_API_KEY = process.env.INFURA_API_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const PRIVATE_KEY1 = process.env.PRIVATE_KEY1;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
      accounts: PRIVATE_KEY1 !== undefined ? [PRIVATE_KEY1] : [],
      chainId: 4,
    },
    goerli: {
      // url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
      url: `https://goerli.infura.io/v3/de79749c782346629008855c40be3129`,
      accounts: [
        '468c3a5d4f5fa32e815365a57283b9fafc9f003095a783ac61a85cc2e3d64143',
      ],
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_API_KEY}`,
    },
    arbitrumRinkeby: {
      url: `https://arbitrum-rinkeby.infura.io/v3/${INFURA_API_KEY}`,
    },
    arbitrum: {
      url: `https://arbitrum-mainnet.infura.io/v3/${INFURA_API_KEY}`,
    },
    optimismKovan: {
      url: `https://optimism-kovan.infura.io/v3/${INFURA_API_KEY}`,
    },
    optimism: {
      url: `https://optimism-mainnet.infura.io/v3/${INFURA_API_KEY}`,
    },
    mumbai: {
      // url: `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`,
      url: 'https://polygon-mumbai.g.alchemy.com/v2/S8MmyJT8DGlIAYUHi5WUZUfbin3G8_tp',
      accounts: [
        '468c3a5d4f5fa32e815365a57283b9fafc9f003095a783ac61a85cc2e3d64143',
      ],
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${INFURA_API_KEY}`,
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
      goerli: '9VINF6ZIZ7X66N8XGHAZENWC5J9BW81HY6',
      polygonMumbai: 'AETY2VSRTTDKXYUJXMFUXPQETTPP338WH8',
    },
  },
};
