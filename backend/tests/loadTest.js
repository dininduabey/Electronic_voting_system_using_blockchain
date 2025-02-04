import http from "k6/http";

export let options = {
    vus: 100, // 100 virtual users
    duration: "30s" // Test for 30 seconds
};

export default function () {
    const url = "http://localhost:5000/api/voting/cast";
    const payload = JSON.stringify({ 
        nic: "123456789V",
        fingerprint: "test-fingerprint",
        candidateId: "CANDIDATE_ID"
    });

    const params = { headers: { "Content-Type": "application/json" } };
    http.post(url, payload, params);
}
