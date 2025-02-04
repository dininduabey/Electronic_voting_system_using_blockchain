import React, { useState, useEffect } from "react";
import axios from "axios";

const CandidateManagement = () => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/candidates/list")
            .then(res => setCandidates(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Candidate Management</h2>
            <ul>
                {candidates.map(candidate => (
                    <li key={candidate.id}>{candidate.fullName} - {candidate.party}</li>
                ))}
            </ul>
        </div>
    );
};

export default CandidateManagement;
