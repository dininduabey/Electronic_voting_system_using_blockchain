import React, { useState } from "react";
import axios from "axios";

const VotingPage = () => {
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const handleVote = async () => {
        if (!selectedCandidate) return alert("Please select a candidate!");

        try {
            await axios.post("http://localhost:5000/api/voting/cast", {
                nic: "123456789V",
                fingerprint: "user-fingerprint-data",
                candidateId: selectedCandidate
            });
            alert("Vote Cast Successfully!");
        } catch (error) {
            alert("Voting Failed");
        }
    };

    return (
        <div>
            <h2>Vote for Your Candidate</h2>
            <div onClick={() => setSelectedCandidate("Candidate1")}>Candidate 1</div>
            <div onClick={() => setSelectedCandidate("Candidate2")}>Candidate 2</div>
            <button onClick={handleVote}>Confirm Vote</button>
        </div>
    );
};

export default VotingPage;
