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
    event Repay(uint rate);
    event On_Grace();
    event Graced();
    event Defaulted();
    event TakeCollateral();

    struct Term {
        LoanState state;
        uint256 startAt;
        uint256 period;
        uint256 amount;
        uint256 rateAmount;
    }

    // CREATED, FUNDED, ON_GRACE, GRACED, DEFAULTED
    enum LoanState { CREATED, FUNDED, ON_GRACE, GRACED, DEFAULTED }

    uint256 public feeRate = 10;
    address payable public feeContract;

    address payable public debtor;
    address payable public creditor;
    IKIP17 public ikip17;
    uint256 public tokenId;

    Term public term;

    modifier checkState(LoanState _state) {
        require(term.state == _state, "invalid state");
        _;
    }

    modifier checkDebtor() {
        require(address(uint160(msg.sender)) == debtor, "invalid debtor");
        _;
    }

    constructor(address _debtor, IKIP17 _ikip17, uint256 _tokenId, uint256 _period, uint256 _amount, uint256 _rateAmount) 
        public 
    {
        debtor = address(uint160(_debtor));
        ikip17 = _ikip17;
        tokenId = _tokenId;

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
        ikip17.safeTransferFrom(address(this), address(debtor), tokenId);
        emit Cancel();
        selfdestruct(feeContract);
    }

    function fund() 
        external payable checkState(LoanState.CREATED) 
    {
        require(address(uint160(msg.sender)) != debtor, "debtor attempt to be creditor");

        uint256 amount = term.amount + (term.rateAmount * feeRate / 100);
        require(msg.value >= amount, "Invliad amount to fund the loan");

        uint256 _startAt = block.timestamp;

        term.startAt = _startAt;
        term.state = LoanState.FUNDED;
        creditor = address(uint160(msg.sender));

        debtor.transfer(term.amount);
        creditor.transfer(msg.value - amount);

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
        debtor.transfer(value - amount);

        require(rate <= 100, "invalid rate");
        uint returnedFee = _term.rateAmount.mul(100 - rate).div(100).div(10);
        creditor.transfer(amount.add(returnedFee)); // 채권자가 돌려받는 돈

        feeContract.transfer(address(this).balance);
        ikip17.safeTransferFrom(address(this), debtor, tokenId);

        emit Repay(rate);
        selfdestruct(feeContract);
    }

    function on_grace() 
        external checkState(LoanState.FUNDED)
    {
        require(block.timestamp > term.startAt + term.period, "it hasn't expired yet");

        term.state = LoanState.ON_GRACE;

        emit On_Grace();
    }

    function graced()
        external checkState(LoanState.ON_GRACE)
    {
        term.state = LoanState.GRACED;

        emit Graced();
    }

    function defaulted()
        external
    {
        require(term.state == LoanState.ON_GRACE || term.state == LoanState.GRACED, "invalid state");
        require(block.timestamp > term.startAt + term.period + 1 days, "grace period not expired yet");
        term.state = LoanState.DEFAULTED;
        emit Defaulted();
    }

    function repay_on_graced()
        external payable checkState(LoanState.GRACED) checkDebtor
    {
        Term memory _term = term;
        _repay(_term, msg.value, 100);
    }

    function takeCollateralByCreditor() 
        external checkState(LoanState.DEFAULTED){
        require(address(uint160(msg.sender)) == creditor, "invalid creditor");

        ikip17.safeTransferFrom(address(this), creditor, tokenId);

        emit TakeCollateral();
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