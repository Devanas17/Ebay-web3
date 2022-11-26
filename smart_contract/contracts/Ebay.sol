// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// users can auction the their objects
// users can sell the objects

contract Ebay {
    struct Auction {
        uint256 id;
        string name;
        string description;
        uint256 minPrice;
        string imgUrl;
        address payable seller;
        uint256 bestOfferId;
        uint[] offerIds;
    }

    struct Offer {
        uint id;
        uint auctionIds;
        address payable buyer;
        uint price;
    }

    mapping(uint256 => Auction) public auctions;
    mapping(uint256 => Offer) public offers;
    mapping(address => uint[]) public autionLists;
    mapping(address => uint[]) public offerLists;

    uint256 private newAuctionId = 1;
    uint256 private newOfferId = 1;

    function createAuction(
        string calldata _name,
        string memory _description,
        uint256 _minPrice,
        string memory _imgUrl
    ) public {
        require(_minPrice > 0, "Minimum must be greater than 0.");
        uint256[] memory offerIds = new uint256[](0);

        auctions[newAuctionId] = Auction(
            newAuctionId,
            _name,
            _description,
            _minPrice,
            _imgUrl,
            payable(msg.sender),
            0,
            offerIds
        );

        newAuctionId++;
    }
}
