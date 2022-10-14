// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GoldBar is ERC20, Ownable {
    constructor() ERC20("GoldBar", "GBC") {}
}
