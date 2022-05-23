// SPDX-License-Identifier: MIT
pragma solidity ^0.5.6;

contract Ballot {
    enum ProsAndCons { CONS, PROS, DRAW }

    struct Voter {
        uint weight;
        bool voted;
        address delegate;
        ProsAndCons vote;
    }

    address public chairperson;

    struct Proposal {
        string name;
        uint pros;
        uint cons;
    }

    mapping(address => Voter) public voters;
    Proposal public proposal;

    constructor(string memory _proposal) public {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;

        proposal.name = _proposal;
    }

    function giveRightToVote(address voter) external {
        require(msg.sender == chairperson, "Only chairperson can give right to vote.");
        require(
            !voters[voter].voted,
            "The voter already voted."
        );
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }

    function giveRightToVoteBatch(address[] calldata _voters) external {
        require(msg.sender == chairperson, "Only chairperson can give right to vote.");
        for (uint i; i < _voters.length; i++) {
            require(
                !voters[_voters[i]].voted,
                "The voter already voted."
            );
            require(voters[_voters[i]].weight == 0);
            voters[_voters[i]].weight = 1;
        }
    }

    function delegate(address to) external {
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "You already voted");
        require(to != msg.sender, "Self-delegation is disallowed.");

        while (voters[to].delegate != address(0)) {
            to = voters[to].delegate;

            // We found a loop in the delegation, not allowed.
            require(to != msg.sender, "Found loop in delegation.");
        }

        Voter storage delegated_ = voters[to];

        require(delegated_.weight >= 1);
        sender.voted = true;
        sender.delegate = to;
        if (delegated_.voted) {
            if (delegated_.vote == ProsAndCons.CONS) {
                proposal.cons += sender.weight;
            } else if (delegated_.vote == ProsAndCons.PROS) {
                proposal.pros += sender.weight;
            }
        } else {
            delegated_.weight += sender.weight;
        }
    }

    function vote(ProsAndCons prosAndCons) external {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = prosAndCons;

        if (prosAndCons == ProsAndCons.PROS) {
            proposal.pros += sender.weight;
        } else if (prosAndCons == ProsAndCons.CONS) {
            proposal.cons += sender.weight;
        }
    }

    function winning() public view returns (ProsAndCons) {
        if (proposal.pros > proposal.cons) {
            return ProsAndCons.PROS;
        } else if (proposal.pros < proposal.cons) {
            return ProsAndCons.CONS;
        } else {
            return ProsAndCons.DRAW;
        }
    }
}