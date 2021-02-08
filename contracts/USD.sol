// SPDX-License-Identifier: MIT
//pragma solidity >=0.4.22 <0.8.0;
pragma solidity >=0.6.0;

//import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Code for ERC20 can be found here:
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol

contract USD is ERC20 {

    address public admin;

    modifier restricted() {
        require(
        msg.sender == admin,
        "This function is restricted to the administrator"
        );
        _;
    }

    constructor (string memory name, string memory symbol)
        ERC20(name, symbol)
        public
    {
        admin = msg.sender;

        // Mint 100 tokens to msg.sender
        // Similar to how
        // 1 dollar = 100 cents
        // 1 token = 1 * (10 ** decimals)
        _mint(admin, 100 * 10 ** uint(decimals()));
    }

    // Destroy contract and reclaim leftover funds.
    function kill() public {
        require(msg.sender == admin);
        selfdestruct(msg.sender);
    }

}