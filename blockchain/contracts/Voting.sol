// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Vote {
        bytes32 encryptedVote; // Encrypted vote data
        bytes32 cryptographicKey; // Hash of NIC + Fingerprint
    }

    address public admin;
    mapping(bytes32 => bool) public hasVoted; // Prevents double voting
    Vote[] public votes; // Array to store all votes

    constructor() {
        admin = msg.sender; // Contract deployer is the admin
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function castVote(bytes32 _encryptedVote, bytes32 _cryptographicKey) public {
        require(!hasVoted[_cryptographicKey], "Voter has already voted");
        votes.push(Vote(_encryptedVote, _cryptographicKey));
        hasVoted[_cryptographicKey] = true;
    }

    function getVoteCount() public view returns (uint) {
        return votes.length;
    }
}
