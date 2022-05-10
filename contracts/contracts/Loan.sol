// SPDX-License-Identifier: MIT
pragma solidity ^0.5.6;

import "./klay_contracts/token/KIP17/IKIP17.sol";
import "./klay_contracts/drafts/Counters.sol";
import "./klay_contracts/ownership/Ownable.sol";

contract Loan is Ownable {
    using Counters for Counters.Counter;

    enum LoanStatus { NOT_STARTED, REQUESTING, FUNDED, CANCELED, PAID_OFF, FAIL }

    struct Collateral {
        address nft;
        uint256 tokenId;
    }

    struct LoanDetail {
        address payable debtor;
        address payable creditor;
        LoanStatus status;
        uint256 startAt;
        uint256 period;
        uint256 amount;
        uint256 rateAmount;
        Collateral nft;
    }

    event OpenLoanRequest(uint256 idx, address debtor, uint256 period, uint256 amount, uint256 rateAmount, IKIP17 ikip17, uint256 tokenId);
    event EditLoanRequest(uint256 idx, uint256 period, uint256 amount, uint256 rateAmount);
    event CancelLoanRequest(uint256 idx);
    event FundLoanRequest(uint256 idx, address creditor, uint256 startAt);

    Counters.Counter public loanIdx;
    mapping(uint256 => LoanDetail) loanDetails;
    
    constructor() public {
    }

    // 생성 -> 채무자가 Open Loan Request를 올림, onlyOwner는 임시, MultiSigWallet으로 추후 변경
    function openLoanRequest(address _debtor, uint256 _period, uint256 _amount, uint256 _rateAmount, IKIP17 _ikip17, uint256 _tokenId) 
        public onlyOwner 
    {
        uint256 idx = loanIdx.current();
        LoanDetail storage loanDetail = loanDetails[idx];

        loanDetail.debtor = address(uint160(_debtor));
        loanDetail.period = _period;
        loanDetail.amount = _amount;
        loanDetail.rateAmount = _rateAmount;
        loanDetail.status = LoanStatus.REQUESTING;

        loanIdx.increment();
        emit OpenLoanRequest(idx, _debtor, _period, _amount, _rateAmount, _ikip17, _tokenId);
    }

    // 변경 -> 채무자가 조건을 수정함
    function editLoanRequest(uint256 idx, uint256 _period, uint256 _amount, uint256 _rateAmount) public {
        LoanDetail storage loanDetail = loanDetails[idx];
        require(loanDetail.status == LoanStatus.REQUESTING, "Not Requesting");

        if (loanDetail.period != _period) {
            loanDetail.period = _period;
        }

        if (loanDetail.amount != _amount) {
            loanDetail.amount = _amount;
        }

        if (loanDetail.rateAmount != _rateAmount) {
            loanDetail.rateAmount = _rateAmount;
        }

        emit EditLoanRequest(idx, _period, _amount, _rateAmount);
    }

    // 취소 -> 채무자가 LoanRequesting을 취소함
    function cancelLoanRequest(uint256 idx) public {
        LoanDetail storage loanDetail = loanDetails[idx];
        require(loanDetail.status == LoanStatus.REQUESTING, "Not Requesting");

        loanDetail.status = LoanStatus.CANCELED;
        emit CancelLoanRequest(idx);
    }

    function fundLoanRequest(uint256 idx, uint256 _startAt) public payable {
        LoanDetail storage loanDetail = loanDetails[idx];
        require(loanDetail.status == LoanStatus.REQUESTING, "Not Requesting");
        require(msg.value == loanDetail.amount + loanDetail.rateAmount, "invalid amount");

        (loanDetail.debtor).transfer(msg.value);

        loanDetail.creditor = address(uint160(msg.sender));
        loanDetail.startAt = _startAt;
        loanDetail.status = LoanStatus.FUNDED;

        emit FundLoanRequest(idx, msg.sender, _startAt);
    }
}