// SPDX-License-Identifier: MIT
pragma solidity =0.8.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IMarket.sol";
import "./IPool.sol";

contract PoolFactory {

    IPool[] public pools;

    function totalPools() public view returns (uint256) {
        return pools.length;
    }

    function create(IMarket market, IERC20 underlying, uint256 fee) public {
        // require(market != address(0), "Market address cannot be 0");
        // require(underlying != address(0), "Underlying address cannot be 0");
        // require(fee > 0, "Fee must be greater than 0");

        // Create pool

    }
}