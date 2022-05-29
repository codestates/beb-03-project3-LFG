// SPDX-License-Identifier: MIT
pragma solidity ^0.5.6;

import "./klay_contracts/token/KIP17/IKIP17.sol";
import "./klay_contracts/token/KIP17/IERC721Receiver.sol";
import "./klay_contracts/token/KIP17/IKIP17Receiver.sol";

contract LoanFactory is IERC721Receiver, IKIP17Receiver {
    event Deploy(address addr);

    constructor() public {}

    function deploy(bytes memory _code, IKIP17 _ikip17, uint256 _tokenId) public payable returns (address addr) {
        assembly {
            // create(v, p, n)
            // v = amount of ETH to send
            // p = pointer in memory to start of code
            // n = size of code
            addr := create(callvalue(), add(_code, 0x20), mload(_code))
        }
        require(addr != address(0), "deploy failed");

        _ikip17.safeTransferFrom(msg.sender, addr, _tokenId);
        emit Deploy(addr);
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes memory
    ) public returns (bytes4) {
        return this.onERC721Received.selector;
    }

    function onKIP17Received(
        address,
        address,
        uint256,
        bytes memory
    ) public returns (bytes4) {
        return this.onKIP17Received.selector;
    }
}