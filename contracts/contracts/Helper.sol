// SPDX-License-Identifier: MIT
pragma solidity ^0.5.6;

import "./LoanFactory.sol";

contract Helper {
    function getBytecode(address _debtor, IKIP17 _ikip17, uint256 _tokenId, uint256 _period, uint256 _amount, uint256 _rateAmount) external pure returns (bytes memory) {
        bytes memory bytecode = type(Loan).creationCode;
        return abi.encodePacked(bytecode, abi.encode(_debtor, _ikip17, _tokenId, _period, _amount, _rateAmount));
    }

    function getCalldata(address _owner) external pure returns (bytes memory) {
        return abi.encodeWithSignature("setOwner(address)", _owner);
    }
}