import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div>
            <h2>Admin Dashboard</h2>
            <Link to="/register-candidates">Manage Candidates</Link>
            <Link to="/register-voters">Manage Voters</Link>
            <Link to="/results">View Results</Link>
        </div>
    );
};

export default AdminDashboard;
