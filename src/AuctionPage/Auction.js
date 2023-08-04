import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import EnglishAuction from '../artifacts/contracts/Auction.sol/EnglishAuction.json';


const AuctionApp = () => {
  const auctionContractAddress = "0x907343862800b833d6ae68dc03e4efe8bc0ebafb";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractABI = EnglishAuction.abi;

  const auctionContract = new ethers.Contract(
    auctionContractAddress,
    contractABI,
    signer
  );

  // State variables
  const [auctions, setAuctions] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [highestBid, setHighestBid] = useState(0);
  const [bidAmount, setBidAmount] = useState(0);

  // Function to fetch all available auctions
  const fetchAuctions = async () => {
    try {
      const auctionsCount = await auctionContract.getAuctionsCount();
      const auctions = [];
      for (let i = 0; i < auctionsCount; i++) {
        const auction = await auctionContract.auctions(i);
        auctions.push({
          nftId: auction.nftId.toString(),
          highestBid: ethers.utils.formatEther(auction.highestBid),
          started: auction.started,
          ended: auction.ended,
          endAt: new Date(auction.endAt * 1000).toLocaleString(),
        });
      }
      setAuctions(auctions);
    } catch (error) {
      console.error("Error fetching auctions:", error);
    }
  };

  // Function to start a new auction
  const startAuction = async () => {
    try {
      await auctionContract.start();
      // Auction started successfully, refresh auctions list
      fetchAuctions();
    } catch (error) {
      console.error("Error starting auction:", error);
    }
  };

  // Function to place a bid on the selected auction
  const placeBid = async () => {
    if (selectedAuction) {
      try {
        await auctionContract.bid({ value: ethers.utils.parseEther(bidAmount) });
        // Bid placed successfully, update the highest bid and refresh auctions
        setHighestBid(bidAmount);
        fetchAuctions();
      } catch (error) {
        console.error("Error placing bid:", error);
      }
    }
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  return (
    <div>
      <h1>Auction App</h1>
      <div>
        <h2>Available Auctions</h2>
        <ul>
          {auctions.map((auction, index) => (
            <li key={index}>
              <span>
                Auction ID: {auction.nftId} | Highest Bid: {auction.highestBid}
              </span>
              <button onClick={() => setSelectedAuction(auction)}>
                Select Auction
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedAuction && (
        <div>
          <h2>Selected Auction</h2>
          <p>Auction ID: {selectedAuction.nftId}</p>
          <p>Highest Bid: {highestBid}</p>
          <p>End Time: {selectedAuction.endAt}</p>
          <div>
            <h3>Place a Bid</h3>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
            />
            <button onClick={placeBid}>Place Bid</button>
          </div>
        </div>
      )}
      <div>
        <h2>Create New Auction</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const { nftId, startingBid } = e.target.elements;
            startAuction(nftId.value, startingBid.value);
          }}
        >
          <label>
            NFT ID:
            <input type="text" name="nftId" required />
          </label>
          <label>
            Starting Bid (ETH):
            <input type="text" name="startingBid" required />
          </label>
          <button type="submit">Create Auction</button>
        </form>
      </div>
    </div>
  );
};

export default AuctionApp;

