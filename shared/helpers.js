const fs = require('fs');
const path = require('path');
const hre = require('hardhat');

async function deployContract(name, args, deployer, options) {
  const contractFactory = await ethers.getContractFactory(name, deployer);
  let contract;
  if (options) {
    contract = await contractFactory.deploy(...args, options);
  } else {
    contract = await contractFactory.deploy(...args);
  }

  const argStr = args.map((i) => `"${i}"`).join(' ');

  console.info(`${name} : ${contract.address} `);
  if (args.length) {
    console.info(`With these arguments\n ${argStr}`);
  }

  // wait for 1 block transactions to ensure deployment before verifying
  await contract.deployTransaction.wait(1);
  console.info('... Completed!');
  return contract;
}

async function contractAt(name, address, provider) {
  let contractFactory = await ethers.getContractFactory(name);
  if (provider) {
    contractFactory = contractFactory.connect(provider);
  }
  return await contractFactory.attach(address);
}

const tmpAddressesFilepath = path.join(__dirname, '..', `.tmp-addresses.json`);

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

async function VerifyContract(address, args) {
  //verify (source: https://hardhat.org/hardhat-runner/plugins/nomiclabs-hardhat-etherscan#using-programmatically)
  if (args) {
    await hre.run('verify:verify', {
      address: address,
      constructorArguments: [...args],
    });
  } else {
    await hre.run('verify:verify', {
      address: address,
    });
  }
}

module.exports = {
  deployContract,
  contractAt,
  writeTmpAddresses,
  readTmpAddresses,
  VerifyContract,
};
