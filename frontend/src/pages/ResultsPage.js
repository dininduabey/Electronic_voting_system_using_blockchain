import React, { useEffect, useState } from "react";
import axios from "axios";

const ResultsPage = () => {
    const [votes, setVotes] = useState(0);

    useEffect(() => {
        const fetchVotes = async () => {
            const res = await axios.get("http://localhost:5000/api/voting/count");
            setVotes(res.data.totalVotes);
        };
        fetchVotes();
    }, []);

    return (
        <div>
            <h2>Election Results</h2>
            <p>Total Votes: {votes}</p>
        </div>
    );
};

export default ResultsPage;
