import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import VoterDashboard from "./pages/VoterDashboard";
import VotingPage from "./pages/VotingPage";
import ResultsPage from "./pages/ResultsPage";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/voter" element={<VoterDashboard />} />
                <Route path="/vote" element={<VotingPage />} />
                <Route path="/results" element={<ResultsPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
