import React, { useEffect, useState } from 'react';

function ExploreAuctions({ contract }) {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        if (contract) {
          // Call the smart contract's function to get the list of auctions
          const auctionsCount = await contract.auctionsCount();

          // Prepare an array to store the fetched auctions
          const fetchedAuctions = [];

          // Loop through each auction and fetch its details
          for (let i = 0; i < auctionsCount; i++) {
            const auction = await contract.auctions(i);

            // Assuming 'auctions' is a struct with relevant information
            const auctionDetails = {
              id: i,
              title: auction.title,
              startingBid: auction.startingBid,
              // Add other relevant properties from the 'auction' object
            };

            fetchedAuctions.push(auctionDetails);
          }

          // Update the 'auctions' state with the fetched auctions
          setAuctions(fetchedAuctions);
        }
      } catch (error) {
        // Handle error
        console.error('Error fetching auctions:', error);
      }
    };

    fetchAuctions();
  }, [contract]); // Only run the effect when 'contract' changes

  return (
    <div>
      <h2>List of Auctions</h2>
      <ul>
        {auctions.map((auction) => (
          <li key={auction.id}>
            <h3>{auction.title}</h3>
            <p>Starting Bid: {auction.startingBid}</p>
            {/* Add other auction details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExploreAuctions;
