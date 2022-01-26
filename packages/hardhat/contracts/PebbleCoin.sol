// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PebbleCoin is ERC20 {
    constructor() ERC20("PebbleCoin", "PBL") {
        _mint(msg.sender, 1000000000 * 10 ** decimals());
    }
}
