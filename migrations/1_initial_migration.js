const Migrations = artifacts.require("Migrations");

// デプロイ実行
module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
