// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ModiCoin is ERC20 {
    constructor() ERC20("MDI", "Modi Coin") {
        _mint(msg.sender, 2500 * 10**18);
    }
}
