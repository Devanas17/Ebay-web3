// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

contract Ebay {
    error Ebay_InSufficient_Amount();

    modifier AuctionExist(uint256 _auctionId) {
        require(
            _auctionId > 0 && _auctionId < newAuctionId,
            "Auction does not exist."
        );
        _;
    }

    struct Auction {
        uint256 id;
        string name;
        string description;
        uint256 minPrice;
        string imgUrl;
        uint256 rating;
        string category;
        address payable seller;
        uint256 bestOfferId;
        uint256[] offerIds;
    }

    struct Offer {
        uint256 id;
        uint256 auctionIds;
        address payable buyer;
        uint256 price;
    }

    // Struct for BuyNow Product
    struct Product {
        address buyer;
        address seller;
        uint256 id;
        uint256 price;
        uint256 rating;
        string name;
        string description;
        string category;
        string imgUrl;
    }

    mapping(uint256 => Auction) private auctions;
    mapping(uint256 => Offer) private offers;
    mapping(address => uint256[]) private auctionLists;
    mapping(address => uint256[]) private offerLists;
    mapping(uint256 => Product) private products;
    address payable[] private buyers;

    uint256 private newAuctionId = 1;
    uint256 private newOfferId = 1;
    uint256 productCounter = 1;

    function listNewProduct(
        string memory _name,
        string memory _description,
        string memory _category,
        string memory _imgUrl,
        uint256 _price,
        uint256 _rating
    ) public {
        Product memory newProduct = Product({
            buyer: address(0),
            seller: msg.sender,
            id: productCounter,
            price: _price,
            rating: _rating,
            name: _name,
            description: _description,
            category: _category,
            imgUrl: _imgUrl
        });

        products[productCounter] = newProduct;
        productCounter++;
    }

    function createAuction(
        string calldata _name,
        string memory _description,
        uint256 _minPrice,
        string memory _imgUrl,
        uint256 _rating,
        string memory _category
    ) public payable {
        require(_minPrice > 0, "Minimum must be greater than 0.");
        uint256[] memory offerIds = new uint256[](0);

        auctions[newAuctionId] = Auction(
            newAuctionId,
            _name,
            _description,
            _minPrice,
            _imgUrl,
            _rating,
            _category,
            payable(msg.sender),
            0,
            offerIds
        );
        auctionLists[msg.sender].push(newAuctionId);
        newAuctionId++;
    }

    function createOffer(uint256 _auctionId)
        public
        payable
        AuctionExist(_auctionId)
    {
        Auction storage auction = auctions[_auctionId];
        Offer storage bestOffer = offers[auction.bestOfferId];

        if (msg.value >= auction.minPrice && msg.value > bestOffer.price) {
            revert Ebay_InSufficient_Amount();
        }

        auction.bestOfferId = newOfferId;
        auction.offerIds.push(newOfferId);

        offers[newOfferId] = Offer(
            newOfferId,
            _auctionId,
            payable(msg.sender),
            msg.value
        );
        offerLists[msg.sender].push(newOfferId);
        newOfferId++;
    }

    function transaction(uint256 _auctionId) public AuctionExist(_auctionId) {
        Auction storage auction = auctions[_auctionId];
        Offer storage bestOffer = offers[auction.bestOfferId];

        for (uint256 i = 0; i < auction.offerIds.length; i++) {
            uint256 offerId = auction.offerIds[i];

            if (offerId != auction.bestOfferId) {
                Offer storage offer = offers[offerId];
                offer.buyer.transfer(offer.price);
            }
        }

        auction.seller.transfer(bestOffer.price);
    }

    // purchase product
    function purchaseItem(uint256 _id) public payable {
        Product storage product = products[_id];

        require(msg.value >= product.price, "Invalid amount sent for product");
        require(product.seller != address(0));
        require(product.buyer == address(0), "Item has been bought");
        require(
            msg.sender != product.seller,
            "Seller cannot buy their own product"
        );

        product.buyer = msg.sender;
        buyers.push(payable(msg.sender));
        payable(product.seller).transfer(msg.value);
    }

    function getAllAuctions() public view returns (Auction[] memory) {
        Auction[] memory _auctions = new Auction[](newAuctionId - 1);

        for (uint256 i = 1; i < newAuctionId; i++) {
            _auctions[i - 1] = auctions[i];
        }
        return _auctions;
    }

    function getAuctionCreator(address _user)
        public
        view
        returns (Auction[] memory)
    {
        uint256[] storage userAuctionIds = auctionLists[_user];
        Auction[] memory _auctions = new Auction[](userAuctionIds.length);
        for (uint256 i = 0; i < userAuctionIds.length; i++) {
            uint256 auctionId = userAuctionIds[i];
            _auctions[i] = auctions[auctionId];
        }
        return _auctions;
    }

    function getUserOffers(address _user) public view returns (Offer[] memory) {
        uint256[] storage userOfferIds = offerLists[_user];
        Offer[] memory _offer = new Offer[](userOfferIds.length);

        for (uint256 i = 0; i < userOfferIds.length; i++) {
            uint256 offerId = userOfferIds[i];
            _offer[i] = offers[offerId];
        }
        return _offer;
    }

    function getNumberOfProducts() public view returns (uint256) {
        return productCounter;
    }
}
