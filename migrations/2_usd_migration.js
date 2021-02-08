const UsdToken = artifacts.require("USD");

module.exports = function (deployer) {
  deployer.deploy(UsdToken, "USD", "USD");
};