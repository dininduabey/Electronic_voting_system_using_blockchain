import React from "react";
import { Link } from "react-router-dom";

const VoterDashboard = () => {
    return (
        <div>
            <h2>Voter Dashboard</h2>
            <Link to="/vote">Cast Your Vote</Link>
            <Link to="/results">View Results</Link>
        </div>
    );
};

export default VoterDashboard;
