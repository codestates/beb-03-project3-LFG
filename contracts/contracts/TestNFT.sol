// SPDX-License-Identifier: MIT
pragma solidity ^0.5.6;

import "./klay_contracts/token/KIP17/KIP17.sol";
import "./klay_contracts/token/KIP17/KIP17Metadata.sol";

contract TestNFT is KIP17, KIP17Metadata {
    address public owner;
    uint256 public idx;

    constructor() public KIP17Metadata("TEST NFT", "TFT") {
        owner = msg.sender;
        idx = 0;
    }

    function mint() public {
        _mint(owner, idx);
        idx++;
    }
}