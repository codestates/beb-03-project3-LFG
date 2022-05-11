// SPDX-License-Identifier: MIT
pragma solidity ^0.5.6;

import "./klay_contracts/token/KIP17/IKIP17.sol";
import "./klay_contracts/token/KIP17/IERC721Receiver.sol";
import "./klay_contracts/token/KIP17/IKIP17Receiver.sol";

contract Loan is IERC721Receiver, IKIP17Receiver {
    event Edit(uint256 _period, uint256 _amount, uint256 _rateAmount);
    event Fund(address creditor, uint256 startAt);
    event Cancel();
    event Repay();
    event ON_GRACE();
    event Defaulted();
    event TakeCollateral();

    struct Term {
        LoanState state;
        uint256 startAt;
        uint256 period;
        uint256 amount;
        uint256 rateAmount;
    }

    // CREATED, FUNDED, DEFAULT_ON_LOAN, ON_GRACE
    enum LoanState { CREATED, FUNDED, ON_GRACE, DEFAULTED }

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

    // modifier checkSender(address payable sender) {
    //     require(address(uint160(msg.sender)) == sender);
    //     _;
    // }

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
        public checkState(LoanState.CREATED) checkDebtor
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
        public checkState(LoanState.CREATED) checkDebtor
    {
        emit Cancel();
        selfdestruct(feeContract);
    }

    function fund(uint256 _startAt) 
        public payable checkState(LoanState.CREATED) 
    {
        uint256 amount = term.amount + (term.rateAmount * feeRate / 100);
        require(msg.value == amount, "Invliad amount to fund the loan");

        term.startAt = _startAt;
        creditor = msg.sender;

        debtor.transfer(term.amount);

        emit Fund(msg.sender, _startAt);
    }

    function repay(uint256 time) 
        public payable checkState(LoanState.FUNDED) checkDebtor
    {
        Term memory _term = term;
        require(time <= _term.startAt + _term.period, "time expired");

        if (time <= _term.startAt + (_term.period * 3 / 10)) {
            _repay(_term, msg.value, 30);
        } else {
            uint rate = (time - _term.startAt) * 100 / _term.period;
            _repay(_term, msg.value, rate);
        }
    }

    function _repay(Term memory _term, uint256 value, uint256 rate)
        private
    {
        uint256 amount = _term.amount + (_term.rateAmount * rate / 100);
        require(value >= amount);

        creditor.transfer(amount + address(this).balance * (100 - rate) / 100);
        debtor.transfer(value - amount);

        feeContract.transfer(address(this).balance);
        ikip17.safeTransferFrom(address(this), debtor, tokenId);

        emit Repay();
        selfdestruct(feeContract);
    }

    
    function on_grace(uint256 time) 
        public checkState(LoanState.FUNDED)
    {
        require(time > term.startAt + term.period, "it hasn't expired yet");

        term.state = LoanState.ON_GRACE;

        emit ON_GRACE();
    }

    // onlyOwners가 들어와야함.
    function defaulted(uint256 time)
        public checkState(LoanState.ON_GRACE)
    {
        require(time > term.startAt + term.period + 1 days, "grace period not expired yet");
        term.state = LoanState.DEFAULTED;
        emit Defaulted();
    }

    function repay_on_grace()
        public payable checkState(LoanState.ON_GRACE) checkDebtor
    {
        Term memory _term = term;
        _repay(_term, msg.value, 100);
    }

    function takeCollateralByCreditor() 
        public checkState(LoanState.DEFAULTED){
        require(msg.sender == creditor, "invalid creditor");

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
    function deploy(IKIP17 _ikip17, uint256 _tokenId, uint256 _period, uint256 _amount, uint256 _rateAmount) 
        public 
    {
        Loan loan = new Loan(msg.sender, _ikip17, _tokenId, _period, _amount, _rateAmount);
        _ikip17.safeTransferFrom(msg.sender, address(loan), _tokenId);

        emit Deploy(address(loan));
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