const hre = require("hardhat");

async function main() {
  const EbayFactory = await hre.ethers.getContractFactory("Ebay");
  const ebay = await EbayFactory.deploy();

  await ebay.deployed();

  console.log(`Contract Deployed to ${ebay.address}`);

  let CreateAuction = await ebay.createAuction(
    "Aman",
    "Hello&How",
    3,
    "Image kiski"
  );

  await ebay.createAuction(
    "Car",
    "Beutifull Red Car",
    888,
    "http://www.car.com"
  );

  await CreateAuction.wait();
  await CreateAuction.wait();

  console.log(`The Transaction Address: ${CreateAuction.toString()}`);

  let checkAuctionsOne = await ebay.auctions(1);
  let checkAuctionsTwo = await ebay.auctions(2);
  console.log(checkAuctionsOne.toString());
  console.log(checkAuctionsTwo.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
