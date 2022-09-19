// const LPToken = artifacts.require("LPToken");
const MockToken = artifacts.require("MockToken");
const Market = artifacts.require("Market");
const Registry = artifacts.require("Registry");
const Vault = artifacts.require("Vault");

module.exports = async (deployer) => {
  // await deployer.deploy(MockToken, "Mock USDT", "USDT");
  // const usdt = await MockToken.deployed();

  // await deployer.deploy(MockToken, "Mock DIA", "DIA");
  // const dia = await MockToken.deployed();

  // // await deployer.deploy(MockToken, "hlUSDT", "Horse Link USDT");
  // // const hlusdt = await MockToken.deployed();

  // // await deployer.deploy(MockToken, "hlDIA", "Horse Link DIA");
  // // const hldai = await MockToken.deployed();

  // await deployer.deploy(Vault, usdt.address);
  // const usd_vault = await Vault.deployed();

  // await deployer.deploy(Vault, dia.address);
  // const dia_vault = await Vault.deployed();

  // await deployer.deploy(Market, dia_vault.address, 1);

  await deployer.deploy(Registry);
  const registry = await Registry.deployed();

  // await registry.addVault(usd_vault.address);
  // await registry.addVault(dia_vault.address);

  await registry.addVault("0x00c23DC7a7B4b01b0008E2f9f45a558D76764dF6"); // usdc
  await registry.addVault("0x25b49a6b3649D3Cbd3617B553Bedb98939967Fc9"); // dia
};
