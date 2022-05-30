// SPDX-License-Identifier: MIT
pragma solidity ^0.5.6;

import "./klay_contracts/token/KIP17/KIP17.sol";
import "./klay_contracts/token/KIP17/KIP17Metadata.sol";
import "./klay_contracts/drafts/Counters.sol";

contract TestNFT is KIP17, KIP17Metadata {
    using Counters for Counters.Counter;
    address public owner;

    Counters.Counter private currentTokenId;
    string public baseTokenURI;

    constructor(string memory name, string memory symbol, string memory _baseTokenURI) public KIP17Metadata(name, symbol) {
        owner = msg.sender;
        baseTokenURI = _baseTokenURI;
    }

    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len - 1;
        while (_i != 0) {
            bstr[k--] = byte(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(bstr);
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, "/", uint2str(tokenId))) : "";
    }

    function _baseURI() internal view returns (string memory) {
        return baseTokenURI;
    }

    function mint(address recipient) public {
        require(msg.sender == owner, "not the owner");

        uint256 newItemId = currentTokenId.current();
        currentTokenId.increment();
        _mint(recipient, newItemId);
    }
}