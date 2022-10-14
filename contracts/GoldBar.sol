// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GoldBar is ERC20, Ownable {
    constructor() ERC20("GoldBar", "GBC") {
        _mint(msg.sender, 3500 * 10**18);
    }
}
