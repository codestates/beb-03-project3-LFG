// SPDX-License-Identifier: MIT
pragma solidity ^0.5.6;

import "./klay_contracts/token/KIP17/IKIP17.sol";

contract Vote {
    enum ProsAndCons { CONS, PROS, DRAW }

    struct Voter {
        address voter;
        bool voted;
        ProsAndCons vote;
    }

    address public chairperson;

    struct Proposal {
        uint id;
        uint pros;
        uint cons;
    }

    bool isVoting;
    mapping(uint => Voter) public voters;
    Proposal public proposal;
    IKIP17 _ikip17;
    ProsAndCons public result;

    constructor(IKIP17 ikip17, uint _id) public {
        chairperson = msg.sender;
        proposal.id = _id;
        isVoting = true;
        _ikip17 = ikip17;
    }

    modifier checkVotingState() {
        require(isVoting, "voting closed");
        _;
    }

    modifier isOwner() {
        require(msg.sender == chairperson, "not the owner");
        _;
    }

    function daoNFT() internal view returns (IKIP17){
        return _ikip17;
    }

    function vote(uint256[] calldata tokenIds, ProsAndCons pc) external checkVotingState {
        for (uint i; i < tokenIds.length; i++) {
            require(voters[tokenIds[i]].voted, "already voted");
            require(daoNFT().ownerOf(tokenIds[i]) == msg.sender, "not the owner of tokenId");

            if (pc == ProsAndCons.PROS) {
                voters[tokenIds[i]] = Voter(msg.sender, true, ProsAndCons.PROS);
                proposal.pros++;
            } else if (pc == ProsAndCons.CONS) {
                voters[tokenIds[i]] = Voter(msg.sender, true, ProsAndCons.CONS);
                proposal.cons++;
            }
        }
    }

    function getResult() public view checkVotingState returns (ProsAndCons) {
        if (proposal.pros > proposal.cons) {
            return ProsAndCons.PROS;
        } else if (proposal.pros < proposal.cons) {
            return ProsAndCons.CONS;
        } else {
            return ProsAndCons.DRAW;
        }
    }

    function closeVote() external checkVotingState isOwner {
        ProsAndCons _result = getResult();
        result = _result;

        isVoting = false;
    }
}