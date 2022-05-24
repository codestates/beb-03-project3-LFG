// SPDX-License-Identifier: MIT
pragma solidity ^0.5.6;

import "./klay_contracts/token/KIP17/IKIP17.sol";
import "./klay_contracts/token/KIP17/IERC721Receiver.sol";
import "./klay_contracts/token/KIP17/IKIP17Receiver.sol";
import "./klay_contracts/math/SafeMath.sol";

contract Loan is IERC721Receiver, IKIP17Receiver {
    using SafeMath for uint256;

    event Edit(uint256 _period, uint256 _amount, uint256 _rateAmount);
    event Fund(address creditor, uint256 startAt);
    event Cancel();
    event Repay(uint endAt, uint amount, uint fee);
    event Defaulted(uint256 fee);

    struct Term {
        address payable debtor;
        address payable creditor;

        LoanState state;
        uint256 startAt;
        uint256 period;
        uint256 amount;
        uint256 rateAmount;

        IKIP17 ikip17;
        uint256 tokenId;
    }

    // CREATED, FUNDED, ON_GRACE, GRACED, DEFAULTED
    enum LoanState { CREATED, FUNDED, GRACED }

    uint256 public feeRate = 10;
    address payable public feeContract;

    Term public term;

    modifier checkState(LoanState _state) {
        require(term.state == _state, "invalid state");
        _;
    }

    modifier checkDebtor() {
        require(address(uint160(msg.sender)) == term.debtor, "invalid debtor");
        _;
    }

    constructor(address _debtor, IKIP17 _ikip17, uint256 _tokenId, uint256 _period, uint256 _amount, uint256 _rateAmount) 
        public 
    {
        term.debtor = address(uint160(_debtor));
        term.ikip17 = _ikip17;
        term.tokenId = _tokenId;
        term.state = LoanState.CREATED;
        term.period = _period;
        term.amount = _amount;
        term.rateAmount = _rateAmount;
    }

    function edit(uint256 _period, uint256 _amount, uint256 _rateAmount) 
        external checkState(LoanState.CREATED) checkDebtor
    {
        // Term memory tempTerm = term;
        if (term.period != _period) {
            term.period = _period;
        }
        if (term.amount != _amount) {
            term.amount = _amount;
        }
        if (term.rateAmount != _rateAmount) {
            term.rateAmount = _rateAmount;
        }

        emit Edit(_period, _amount, _rateAmount);
    }

    function cancel() 
        external checkState(LoanState.CREATED) checkDebtor
    {
        term.ikip17.safeTransferFrom(address(this), address(term.debtor), term.tokenId);
        emit Cancel();
        selfdestruct(feeContract);
    }

    function fund() 
        external payable checkState(LoanState.CREATED) 
    {
        require(address(uint160(msg.sender)) != term.debtor, "debtor attempt to be creditor");

        uint256 amount = term.amount + (term.rateAmount * feeRate / 100);
        require(msg.value >= amount, "Invliad amount to fund the loan");

        uint256 _startAt = block.timestamp;

        term.startAt = _startAt;
        term.state = LoanState.FUNDED;
        term.creditor = address(uint160(msg.sender));

        term.debtor.transfer(term.amount);
        term.creditor.transfer(msg.value - amount);

        emit Fund(msg.sender, _startAt);
    }

    function repay() 
        external payable checkState(LoanState.FUNDED) checkDebtor
    {
        Term memory _term = term;
        uint256 time = block.timestamp;
        require(time <= _term.startAt + _term.period, "time expired");

        if (time <= _term.startAt.add(_term.period.mul(3).div(10))) { // _term.startAt + (_term.period * 3 / 10)
            _repay(_term, msg.value, 30);
        } else {
            uint rate = (time.sub(_term.startAt)).mul(100).div(_term.period); // (time - _term.startAt) * 100 / _term.period;
            _repay(_term, msg.value, rate);
        }
    }

    function _repay(Term memory _term, uint256 value, uint256 rate)
        internal
    {
        uint fee = _term.rateAmount.mul(rate).div(100); // 축적된 이자
        uint amount = _term.amount.add(fee); // 상환해야하는 돈

        require(value >= amount, "klay < amount");
        _term.debtor.transfer(value - amount);

        require(rate <= 100, "invalid rate");
        uint returnedFee = _term.rateAmount.mul(100 - rate).div(100).div(10);
        _term.creditor.transfer(amount.add(returnedFee)); // 채권자가 돌려받는 돈

        _term.ikip17.safeTransferFrom(address(this), _term.debtor, _term.tokenId);

        emit Repay(block.timestamp, amount, address(this).balance);
        selfdestruct(feeContract);
    }

    function repay_on_graced()
        external payable checkState(LoanState.GRACED) checkDebtor
    {
    }

    function defaulted()
        external checkState(LoanState.FUNDED)
    {
        require(block.timestamp > term.startAt + term.period, "grace period not expired yet");
        require(address(uint160(msg.sender)) == term.creditor, "invalid creditor");

        _takeCollateralByCreditor();
    }

    function _takeCollateralByCreditor() 
        internal {
        term.ikip17.safeTransferFrom(address(this), term.creditor, term.tokenId);

        emit Defaulted(address(this).balance);
        selfdestruct(feeContract);
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