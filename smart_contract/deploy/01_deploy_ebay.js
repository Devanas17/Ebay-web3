const { ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  log("------------------------------");
  const EBAY = await deploy("Ebay", {
    from: deployer,
    args: [],
    log: true,
  });
  log(`You have deployed your contract to ${EBAY.address}`);

  const ebayContract = await ethers.getContractFactory("Ebay");
  const accounts = await ethers.getSigner();
  const signer = accounts[0];
  const ebayClient = new ethers.Contract(
    EBAY.address,
    ebayContract.interface,
    signer
  );

  log("Let's Create your first Auctions");
};
module.exports.tags = ["ebay", "all"];
