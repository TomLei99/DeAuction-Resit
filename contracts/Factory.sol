    // SPDX-License-Identifier: UNLICENSED
    pragma solidity ^0.8.9;
    import "./Auction.sol";

    contract AuctionFactory {
        address[] public auctions;

        event AuctionCreated(address auctionContract, address indexed seller, uint indexed nftId, uint startingBid);

        struct AuctionData {
    address nft;
    uint nftId;
    uint startingBid;
    uint auctionDuration;
    address authorizedAddress;
    }

        function createAuction(AuctionData memory data) external {
    EnglishAuction newAuction = new EnglishAuction(data.nft, data.nftId, data.startingBid, data.auctionDuration,data.authorizedAddress);
   
    auctions.push(address(newAuction));
    
    emit AuctionCreated(address(newAuction), msg.sender, data.nftId, data.startingBid);
    }

        function getAllAuctions() external view returns (address[] memory) {
            return auctions;
        }
    }
