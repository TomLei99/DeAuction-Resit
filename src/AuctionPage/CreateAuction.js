import React, { useState } from 'react';

function CreateAuction({ contract}) {
  const [nftContract, setNftContract] = useState('');
  const [nftId, setNftId] = useState('');
  const [startingBid, setStartingBid] = useState('');

  const handleCreateAuction = async (e) => {
    e.preventDefault();
    try {
      await contract.methods.createAuction(nftContract, nftId, startingBid).send({ from: window.ethereum.selectedAddress });
      // Show success message or update auction list
     
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleCreateAuction}>
      <label htmlFor="nftContract">NFT Contract Address:</label>
      <input type="text" id="nftContract" required value={nftContract} onChange={(e) => setNftContract(e.target.value)} />

      <label htmlFor="nftId">NFT ID:</label>
      <input type="number" id="nftId" required value={nftId} onChange={(e) => setNftId(e.target.value)} />

      <label htmlFor="startingBid">Starting Bid:</label>
      <input type="number" id="startingBid" required value={startingBid} onChange={(e) => setStartingBid(e.target.value)} />

      <button type="submit">Create Auction</button>
    </form>
  );
}

export default CreateAuction;
