const { sendBackupAlert } = require("../config/alertService");

exports.backupVoteToS3 = async (voteData) => {
    try {
        const encryptedVote = encryptData(voteData);

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `votes_backup/${Date.now()}.json`,
            Body: JSON.stringify({ encryptedVote }),
            ContentType: "application/json"
        };

        await s3.upload(params).promise();
        await sendBackupAlert("Success", "Backup saved to AWS S3.");
    } catch (error) {
        await sendBackupAlert("Failure", error.message);
    }
};
