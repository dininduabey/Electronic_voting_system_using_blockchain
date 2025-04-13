const VoteStorage = artifacts.require("VoteStorage");

module.exports = function (deployer) {
  deployer.deploy(VoteStorage);
};