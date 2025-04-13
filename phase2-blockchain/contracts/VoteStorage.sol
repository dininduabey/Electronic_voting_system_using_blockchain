// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VoteStorage {
    // Define Vote structure
    struct Vote {
        bytes32 cryptographicKey;
        bytes32 encryptedData;
        bytes32 Decodekey;
    }

    Vote[] public votes;
    address public owner;

    // Event to log new votes
    event VoteAdded(
        bytes32 cryptographicKey, 
        bytes32 encryptedData,
        bytes32 Decodekey
    );

    constructor() {
        owner = msg.sender;
    }

    // Add a vote with cryptographicKey, encryptedData, and Decodekey
    function addVote(bytes32 _cryptographicKey, bytes32 _encryptedData, bytes32 _Decodekey) external {
        votes.push(Vote(_cryptographicKey, _encryptedData, _Decodekey));
        emit VoteAdded(_cryptographicKey, _encryptedData, _Decodekey);
    }

    // Get total votes
    function getVoteCount() external view returns (uint256) {
        return votes.length;
    }
}
