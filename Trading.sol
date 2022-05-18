pragma solidity ^0.5.6;

import "./klay_contracts/token/KIP17/IERC721Receiver.sol";
import "./klay_contracts/token/KIP17/IKIP17Receiver.sol";

contract LoanFactory is IERC721Receiver, IKIP17Receiver {
    event Deploy(address addr);

    constructor() public {}

    // msg.sender는 돈을 빌리려는 사람
    // function deploy(IKIP17 _ikip17, uint256 _tokenId, uint256 _period, uint256 _amount, uint256 _rateAmount) 
    //     public 
    // {
    //     Loan loan = new Loan(msg.sender, _ikip17, _tokenId, _period, _amount, _rateAmount);
    //     _ikip17.safeTransferFrom(address(this), address(loan), _tokenId);

    //     emit Deploy(address(loan));
    // }
    function deploy(bytes memory _code, IKIP17 _ikip17, uint256 _tokenId) public payable returns (address addr) {
        assembly {
            // create(v, p, n)
            // v = amount of ETH to send
            // p = pointer in memory to start of code
            // n = size of code
            addr := create(callvalue(), add(_code, 0x20), mload(_code))
        }
        require(addr != address(0), "deploy failed");

        _ikip17.safeTransferFrom(address(this), addr, _tokenId);
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
library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     *
     * _Available since v2.4.0._
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     *
     * _Available since v2.4.0._
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts with custom message when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     *
     * _Available since v2.4.0._
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}
pragma solidity ^0.5.0;

/**
 * @title Counters
 * @author Matt Condon (@shrugs)
 * @dev Provides counters that can only be incremented or decremented by one. This can be used e.g. to track the number
 * of elements in a mapping, issuing ERC721 ids, or counting request ids.
 *
 * Include with `using Counters for Counters.Counter;`
 * Since it is not possible to overflow a 256 bit integer with increments of one, `increment` can skip the SafeMath
 * overflow check, thereby saving gas. This does assume however correct usage, in that the underlying `_value` is never
 * directly accessed.
 */
library Counters {
    using SafeMath for uint256;

    struct Counter {
        // This variable should never be directly accessed by users of the library: interactions must be restricted to
        // the library's function. As of Solidity v0.5.2, this cannot be enforced, though there is a proposal to add
        // this feature: see https://github.com/ethereum/solidity/issues/4637
        uint256 _value; // default: 0
    }

    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    function increment(Counter storage counter) internal {
        counter._value += 1;
    }

    function decrement(Counter storage counter) internal {
        counter._value = counter._value.sub(1);
    }
}

pragma solidity ^0.5.0;

interface IKIP13 {
    /**
     * @dev Returns true if this contract implements the interface defined by
     * `interfaceId`. See the corresponding
     * [KIP-13 section](http://kips.klaytn.com/KIPs/kip-13-interface_query_standard#how-interface-identifiers-are-defined)
     * to learn more about how these ids are created.
     *
     * This function call must use less than 30 000 gas.
     */
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}

// File: contracts\IKIP17.sol

pragma solidity ^0.5.0;

/**
 * @dev Required interface of an KIP17 compliant contract.
 */
contract IKIP17 is IKIP13 {
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    using Counters for Counters.Counter; // library 사용

    /**
     * @dev Returns the number of NFTs in `owner`'s account.
     */
    function balanceOf(address owner) public view returns (uint256 balance);

    /**
     * @dev Returns the owner of the NFT specified by `tokenId`.
     */
    function ownerOf(uint256 tokenId) public view returns (address owner);

    /**
     * @dev Transfers a specific NFT (`tokenId`) from one account (`from`) to
     * another (`to`).
     *
     * Requirements:
     * - `from`, `to` cannot be zero.
     * - `tokenId` must be owned by `from`.
     * - If the caller is not `from`, it must be have been allowed to move this
     * NFT by either `approve` or `setApproveForAll`.
     */
    function safeTransferFrom(address from, address to, uint256 tokenId) public;

    /**
     * @dev Transfers a specific NFT (`tokenId`) from one account (`from`) to
     * another (`to`).
     *
     * Requirements:
     * - If the caller is not `from`, it must be approved to move this NFT by
     * either `approve` or `setApproveForAll`.
     */
    function transferFrom(address from, address to, uint256 tokenId) public;
    function approve(address to, uint256 tokenId) public;
    function getApproved(uint256 tokenId) public view returns (address operator);

    function setApprovalForAll(address operator, bool _approved) public;
    function isApprovedForAll(address owner, address operator) public view returns (bool);


    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public;
}

contract IKIP17Receiver {
    /**
     * @notice Handle the receipt of an NFT
     * @dev The KIP17 smart contract calls this function on the recipient
     * after a `safeTransfer`. This function MUST return the function selector,
     * otherwise the caller will revert the transaction. The selector to be
     * returned can be obtained as `this.onKIP17Received.selector`. This
     * function MAY throw to revert and reject the transfer.
     * Note: the KIP17 contract address is always the message sender.
     * @param operator The address which called `safeTransferFrom` function
     * @param from The address which previously owned the token
     * @param tokenId The NFT identifier which is being transferred
     * @param data Additional data with no specified format
     * @return bytes4 `bytes4(keccak256("onKIP17Received(address,address,uint256,bytes)"))`
     */
    function onKIP17Received(address operator, address from, uint256 tokenId, bytes memory data)
    public returns (bytes4);
}

pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;


contract Trading is IKIP17{
    using Counters for Counters.Counter;

    struct offerList {
        uint256 offerId;
        address initializeOfferAddress;
        address counterAddress;

        address[] nftContractAddress;
        uint256[] myNftId;
        uint256 howMuchOfferKlay;
        bool offerIsConfirm;
    }

    mapping (uint256 => offerList) public storeOffer;
    Counters.Counter offerId; // counter로 수정 

    function initializeOffer(address counterAddress, address[] memory nftContractAddress, uint256[] memory myNftId) public payable {
        // 상대방 월렛 주소, 내nft 컨트랙트 주소, 내 nft tokenid
        require(nftContractAddress.length == myNftId.length);
        for (uint256 i=0; i<myNftId.length; i++) {
            require(msg.sender == IKIP17(nftContractAddress[i]).ownerOf(myNftId[i]));
        }

        offerList memory tempOffer = offerList(offerId.current(), msg.sender, counterAddress, nftContractAddress, myNftId, msg.value, false);
        storeOffer[offerId.current()] = tempOffer;
        offerId.increment();

        // 컨트랙트에 offer랑 klaytn보내야함
        // offerList memory tempOffer = storeOffer[__offerId];

        for (uint256 i=0; i<nftContractAddress.length; i++) {
            IKIP17(nftContractAddress[i]).safeTransferFrom(msg.sender, address(this), myNftId[i]);
        }
    }

    function checkOfferRecieve() public view returns (offerList[] memory) {
        offerList[] memory tempArray = new offerList[](offerId.current());

        uint256 filteredArrayCount = 0;
        for (uint256 i=0; i<offerId.current(); i++) {
            if (storeOffer[i].counterAddress == msg.sender) {
                // tempArray.push(storeOffer[i]); 왜안댐? struct때문 ?
                tempArray[filteredArrayCount] = storeOffer[i];
                filteredArrayCount++;
            }
        }
        return tempArray;
    }

    struct respondList {
        uint256 respondId;
        address initializeOfferAddress;
        address counterAddress;

        address[] respondNftContractAddress;
        uint256[] respondNftId;
        uint256 howMuchRespondKlay;
        bool respondIsConfirm;
    }

    mapping (uint256 => respondList) public storeRespond;
    Counters.Counter respondId; // 응답 시작 번호

    function offerRespond(uint256 _offerId, address[] memory respondNftContractAddress, uint256[] memory respondNftId) public payable {
        require(respondNftContractAddress.length == respondNftId.length);
        for (uint256 i=0; i<respondNftId.length; i++) {
            require(msg.sender == IKIP17(respondNftContractAddress[i]).ownerOf(respondNftId[i]));
        }

        respondList memory tempOffer = respondList(respondId.current(), storeOffer[_offerId].initializeOfferAddress, msg.sender, respondNftContractAddress, respondNftId, msg.value, false);
        storeRespond[respondId.current()] = tempOffer;
        respondId.increment();
    }
    function checkRespond() public view returns (respondList[] memory) {
        respondList[] memory tempArray = new respondList[](respondId.current());

        uint256 filteredRespondArrayCount = 0;
        for (uint256 i=0; i<respondId.current(); i++) {
            if (storeRespond[i].initializeOfferAddress == msg.sender) {
                tempArray[filteredRespondArrayCount] = storeRespond[i];
                filteredRespondArrayCount++;
            }
        }
        return tempArray;
    }
    function confirmAndTransfer(uint256 __offerId, uint256 _respondId) public payable {
        require(storeRespond[_respondId].respondId == _respondId); // 해당 respond값이 있는지 없는지
        require(storeOffer[__offerId].initializeOfferAddress == msg.sender);
        // confirm은 initialOfferAddress만 할 수 있게

        offerList memory tempOffer = storeOffer[__offerId];

        for (uint256 i=1; i<tempOffer.nftContractAddress.length; i++) {
            IKIP17(tempOffer.nftContractAddress[i]).safeTransferFrom(address(this), tempOffer.counterAddress, tempOffer.myNftId[i]);
        }

        tempOffer.counterAddress.transfer(tempOffer.howMuchOfferKlay); // 받는address.transfer(amount)
        
        
        respondList memory tempRespond = storeRespond[_respondId];

        for (uint256 i=1; i<tempRespond.respondNftContractAddress.length; i++) {
            IKIP17(tempRespond.respondNftContractAddress[i]).safeTransferFrom(tempRespond.counterAddress, tempRespond.initializeOfferAddress, tempRespond.respondNftId[i]);
        }

        tempRespond.initializeOfferAddress.transfer(tempRespond.howMuchRespondKlay);

        offerIsConfirm = true;
        respondIsConfirm = true;
    }
}