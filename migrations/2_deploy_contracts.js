var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Messenger = artifacts.require("./Messenger.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Messenger);
};
