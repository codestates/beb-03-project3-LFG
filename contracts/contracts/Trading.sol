pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "@klaytn/contracts/token/KIP17/IKIP17Receiver.sol";
import "@klaytn/contracts/token/KIP17/IKIP17.sol";

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


contract Trading is IKIP17Receiver {
    using Counters for Counters.Counter;

    enum TradeStatus{
        CREATED,
        CANCELLED,
        FINISHED
    }

	struct Trade {
		uint256 tradeId;
        address payable offerAddress;
        address payable respondAddress;
        address[] offerNFTList;
        uint256[] offerIdList;
        address[] respondNFTList;
        uint256[] respondIdList;
        uint256 offerPaidKlay;
	    uint256 respondPaidKlay;
        TradeStatus status;
    }
	mapping(uint256 => Trade) public tradeList;
	Counters.Counter tradeId;

    event startTrade(uint256 tradeId);
    event endTrade(uint256 tradeId);
    event failTrade(uint256 tradeId);

    constructor() public {}

	function makeTrade(
        address payable respondAddress, 
        address[] memory offerNFTList, 
        uint256[] memory offerIdList, 
        address[] memory respondNFTList, 
        uint256[] memory respondIdList, 
        uint256 respondPaidKlay
        ) public payable{
		require(offerNFTList.length == offerIdList.length && respondNFTList.length == respondIdList.length, "list and ids length are not matched");
        
        Trade memory tempTrade = Trade(
            tradeId.current(), 
            msg.sender, 
            respondAddress, 
            offerNFTList,
            offerIdList,
            respondNFTList,
            respondIdList, 
            msg.value,
            respondPaidKlay, 
            TradeStatus.CREATED
        );
        tradeList[tradeId.current()] = tempTrade;

        for (uint256 i = 0; i < offerNFTList.length; i++){
            IKIP17(offerNFTList[i]).safeTransferFrom(msg.sender, address(this), offerIdList[i]);
        }
        emit startTrade(tradeId.current());
        tradeId.increment();
    }

	function acceptTrade(uint256 targetTradeId) public payable {
        Trade memory targetTrade = tradeList[targetTradeId];
    
        require(targetTrade.respondAddress == msg.sender, "msg.sender and respondAddress are not equal");
        require(targetTrade.respondPaidKlay == msg.value, "respondPaidKlay and msg.value are not equal");
        
        for (uint256 i = 0; i < targetTrade.offerNFTList.length; i++){
            IKIP17(targetTrade.offerNFTList[i]).safeTransferFrom(address(this), msg.sender, targetTrade.offerIdList[i]);
        }

        for (uint256 i = 0; i < targetTrade.respondNFTList.length; i++){
            IKIP17(targetTrade.respondNFTList[i]).safeTransferFrom(msg.sender, targetTrade.offerAddress, targetTrade.respondIdList[i]);
        }
        
        targetTrade.offerAddress.transfer(msg.value);
        tradeList[targetTradeId].respondPaidKlay = msg.value;
        targetTrade.respondAddress.transfer(targetTrade.offerPaidKlay);
        
        tradeList[targetTradeId].status = TradeStatus.FINISHED;
        emit endTrade(targetTradeId);
	}

	function cancelTrade(uint256 targetTradeId) public {

        Trade memory targetTrade = tradeList[targetTradeId];
		require(targetTrade.offerAddress == msg.sender, "only offer can cancel");
        
        for (uint256 i = 0; i < targetTrade.offerNFTList.length; i++){
            IKIP17(targetTrade.offerNFTList[i]).safeTransferFrom(address(this), msg.sender, targetTrade.offerIdList[i]);
        }

        targetTrade.offerAddress.transfer(targetTrade.offerPaidKlay); // 받는address.transfer(amount)
        tradeList[targetTradeId].status = TradeStatus.CANCELLED; // 해당 tradeId 는 트래이딩 되지 못하고 종료

        emit failTrade(targetTradeId);
	}

    function getTrade(uint256 targetTradeId) public view returns(Trade memory) {
        Trade memory targetTrade = tradeList[targetTradeId];
        return targetTrade;
    }

    function onKIP17Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes memory data
        ) public returns (bytes4) {
        return bytes4(keccak256("onKIP17Received(address,address,uint256,bytes)"));
    }
}
