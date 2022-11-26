// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Ebay {
    error Ebay_InSufficient_Amount();

    modifier AuctionExist(uint256 _auctionId) {
        require(_auctionId>0 && _auctionId < newAuctionId, "Auction does not exist.");
        _i;
    }

    struct Auction {
        uint256 id;
        string name;
        string description;
        uint256 minPrice;
        string imgUrl;
        address payable seller;
        uint256 bestOfferId;
        uint256[] offerIds;
    }

    struct Offer {
        uint id;
        uint auctionIds;
        address payable buyer;
        uint256 price;
    }

    mapping(uint256 => Auction) private auctions;
    mapping(uint256 => Offer) private offers;
    mapping(address => uint[]) public autionLists;
    mapping(address => uint[]) public offerLists;

    uint256 private newAuctionId = 1;
    uint256 private newOfferId = 1;

    function createAuction(
        string calldata _name,
        string memory _description,
        uint256 _minPrice,
        string memory _imgUrl
    ) public payable {
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
        autionLists[msg.sender].push(newAuctionId);
        newAuctionId++;
    }

    function createOffer(uint256 _auctionId) public payable AuctionExist(_auctionId){
        Auction storage auction = auctions[_auctionId];
        Offer storage bestOffer = offers[auction.bestOfferId]

        if(msg.value >= auction.minPrice && msg.value > bestOffer.price){
            revert Ebay_InSufficient_Amount();
        }

        auction.bestOfferId = newOfferId;
        auction.offerIds.push(newOfferId)

        offers[newOfferId]=Offer(newOfferId, _auctionId, payable(msg.sender), msg.value);
        offerLists[msg.value].push(newOfferId);
        newOfferId++;
    }

    function transaction(uint _auctionId) public AuctionExist(_auctionId) {
        Auction storage auction = auctions[_auctionId];
        Offer storage bestOffer = offers[auction.bestOfferId];

        for(uint256 i =0; i <auction.offerIds.length; i++){
            uint256 offerId = auction.offerIds[i];

            if(offerId!=auction.bestOfferId){
                Offer storage offer = offers[offerId];
                offer.buyer.transfer(offer.price);
            }
        }

        auction.seller.transfer(bestOffer.price);
    }

    function getAllAuctions() public view returns(Auction[] memory){
        Auction[] memory _auctions = new Auction[](newAuctionId-1);

        for(uint256 i=1; i<newAuctionId;i++){
            _auctions[i-1] = auctions[i];
        }
        return _auctions;
    }

    function getAuctionCreator(address _user) public view returns(Auction[] memory){
    uint256[] storage userAuctionIds = auctionList[_user];
    Auction[] memory _auctions = new Auction[](userAuctionIds.length);
    for(uint256 i=0; i<userAuctionIds.length; i++){
        uint256 auctionId = userAuctionIds[i];
        _auctions[i]=auctions[auctionId];
    }
    return _auctions;
    } 

    function getUserOffers(address _user) public view returns(Offer[] memory){
        uint256[] storage userOfferIds = offerLists[_user];
        Offer[] memory _offer = new Offer(userOfferIds.length)

        for (uint256 i = 0; i <userOfferIds.length; i++) {
            uint offerId = userOfferIds[i];
            _offer[i]=offers[offerId];
        }
        return  _offer;
    }
}
