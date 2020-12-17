const DisburseToken = artifacts.require("DisburseToken");

module.exports = function (deployer) {
  deployer.deploy(DisburseToken, "Disburse.Finance", "DFIN");
};