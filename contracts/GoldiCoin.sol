// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract GoldiCoin is ERC20 {
    constructor() ERC20("GLD", "Goldi Coin") {
        _mint(msg.sender, 3500 * 10**18);
    }
}
