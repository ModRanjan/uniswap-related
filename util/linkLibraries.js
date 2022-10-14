/*
This is needed because there's currently no way in ethers.js to link a
library when you're working with the contract ABI/bytecode.
See https://github.com/ethers-io/ethers.js/issues/195
*/
const { utils } = require('ethers');

function linkLibraries({ bytecode, linkReferences }, libraries) {
  Object.keys(linkReferences).forEach((fileName) => {
    Object.keys(linkReferences[fileName]).forEach((contractName) => {
      if (!libraries.hasOwnProperty(contractName)) {
        throw new Error(`Missing link library name ${contractName}`);
      }
      const address = utils
        .getAddress(libraries[contractName])
        .toLowerCase()
        .slice(2);
      linkReferences[fileName][contractName].forEach(({ start, length }) => {
        const start2 = 2 + start * 2;
        const length2 = length * 2;
        bytecode = bytecode
          .slice(0, start2)
          .concat(address)
          .concat(bytecode.slice(start2 + length2, bytecode.length));
      });
    });
  });
  return bytecode;
}

module.exports = {
  linkLibraries,
};
