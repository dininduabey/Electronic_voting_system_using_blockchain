import { GetVotes } from "./voteController.js";

export const checkValidity = async () => {
    try {
        const votes = await GetVotes(req, res);

        console.log(votes);
    } catch (error) {
        console.log(error);

    }


};