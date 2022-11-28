const hre = require("hardhat");

async function main() {
  const EbayFactory = await hre.ethers.getContractFactory("Ebay");
  const ebay = await EbayFactory.deploy();

  await ebay.deployed();

  console.log(`Contract Deployed to ${ebay.address}`);

  let CreateAuction = await ebay.createAuction(
    "Mobile",
    "The new Saumsung galaxy",
    34,
    "samsung_imgUrl",
    4,
    "Electric"
  );

  await ebay.createAuction(
    "Car",
    "Beutifull Red Car",
    888,
    "http://www.car.com",
    5,
    "Transport"
  );

  await CreateAuction.wait();
  await CreateAuction.wait();

  let sellProduct = await ebay.listNewProduct(
    "Computer",
    "LG-Black HD",
    "Electronics",
    "computer_imgUrl",
    88,
    5
  );

  let checkAuctions = await ebay.getAllAuctions();
  let getAllProducts = await ebay.getNumberOfProducts();
  console.log(checkAuctions.toString());
  console.log(getAllProducts.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
