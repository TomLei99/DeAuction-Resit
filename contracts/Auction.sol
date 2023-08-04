// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log

interface IERC721 {
    function transferFrom(
        address from,
        address to,
        uint nftId
    ) external;
    
}

contract EnglishAuction {   
    event Start();
    event Bid(address indexed sender, uint amount);
    event Withdraw(address indexed bidder, uint amount);
    event End(address highestBidder, uint amount);
    event AuctionCanceled();

    IERC721 public immutable nft;
    uint public immutable nftId;
    address payable public immutable seller;
    address public authorizedAddress;


    uint32 public endAt;
    bool public started;
    bool public ended;
    bool public canceled;

    address public highestBidder;
    uint public highestBid;
    mapping(address => uint) public bids;
    uint public auctionDuration; 
    
    constructor(
        address _nft,
        uint _nftId,
        uint _startingBid,
        uint _auctionDuration,
        address _authorizedAddress  
    ){
        nft = IERC721(_nft);
        nftId = _nftId;
        seller = payable(msg.sender);
        highestBid = _startingBid;
        auctionDuration = _auctionDuration; 
        authorizedAddress = _authorizedAddress;

    }

    modifier onlyAuthorized() {
    require(msg.sender == authorizedAddress, "Not authorized");
    _;
    }


    function start() external onlyAuthorized{
        require (msg.sender == seller, "not seller");
        require (!started,"started");

        started = true;
        endAt = uint32(block.timestamp + auctionDuration);
        nft.transferFrom(seller, address(this), nftId);


        emit Start();
    }


    function bid() external payable {
    require(started, "not started");
    require(!ended, "ended");
    require(!canceled, "auction canceled");
    require(block.timestamp < endAt, "auction already ended");
    require(msg.value > highestBid, "value must be higher than highest bid");

    if (endAt - block.timestamp < 300) {
        endAt = uint32(block.timestamp + 300); 
    }

    // Return the previous highest bid amount to the previous highest bidder
    if (highestBidder != address(0)) {
        bids[highestBidder] += highestBid;
    }

    highestBid = msg.value;
    highestBidder = msg.sender;

    emit Bid(msg.sender, msg.value);
}

    function cancelAuction() external onlyAuthorized{
        require(msg.sender == seller, "not seller");
        require(started, "not started");
        require(!ended, "ended");
        require(!canceled, "auction already canceled");

        // Refund the highest bidder their bid amount
        if (highestBidder != address(0)) {
            payable(highestBidder).transfer(highestBid);
        }

        // Transfer the NFT back to the seller
        nft.transferFrom(address(this), seller, nftId);

        canceled = true;

        emit AuctionCanceled();
    }


    function withdraw() external{
        require(!canceled, "auction canceled");
        uint bal = bids[msg.sender];
        bids[msg.sender] = 0;
        payable(msg.sender).transfer(bal);
        emit Withdraw(msg.sender, bal);

    }

    function end() external onlyAuthorized{
        require(started, "not started");
        require(!ended, "not ended");
        require(block.timestamp >= endAt, "not ended");

        ended = true;

        if(highestBidder != address(0)){
            nft.transferFrom(address(this), highestBidder, nftId);
            seller.transfer(highestBid);
        } else {
            nft.transferFrom(address(this), seller, nftId);
        }

        emit End(highestBidder, highestBid);

    }

    

}
