const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const { expectRevert } = require("@openzeppelin/test-helpers");

describe("Ebay", async () => {
  const dummyAuction = {
    name: "Car",
    description: "A Brand new black Car.",
    minPrice: 8,
    img: "Car_URL",
    rating: 4,
    category: "Transport",
  };
  let Ebay;
  let ebay;
  //   let owner;
  //   let addr1;

  beforeEach(async () => {
    Ebay = await ethers.getContractFactory("Ebay");
    ebay = await Ebay.deploy();
  });

  describe("Auction & Buynow Product Creation", async () => {
    it("Should Create Auction", async () => {
      await ebay.createAuction(
        dummyAuction.name,
        dummyAuction.description,
        dummyAuction.minPrice,
        dummyAuction.img,
        dummyAuction.rating,
        dummyAuction.category
      );
      let auctions = await ebay.getAllAuctions();
      assert(auctions.length === 1);
      assert(auctions[0].name === dummyAuction.name);
      assert(auctions[0].description === dummyAuction.description);
      assert(parseInt(auctions[0].minPrice) === dummyAuction.minPrice);
    });

    it("Should create the buy now product", async () => {
      await ebay.listNewProduct(
        dummyAuction.name,
        dummyAuction.description,
        dummyAuction.img,
        dummyAuction.category,
        dummyAuction.minPrice,
        dummyAuction.rating
      );

      const totalNumberOfbuyingProduct = await ebay.getNumberOfProducts();

      assert(totalNumberOfbuyingProduct.toNumber() === 1);
    });
  });

  describe("Should not create test", async () => {
    it("Should not create offer if auction doest not exist", async () => {
      const [owner, addr1, addr2] = await ethers.getSigners();

      await expectRevert(
        ebay.createOffer(1, { from: addr1, value: dummyAuction.minPrice + 3 }),
        "Auction does not exist."
      );
    });
  });
});
