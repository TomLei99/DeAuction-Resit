import React from 'react';
import './Homepage.css'; // Import the CSS file
import Image1 from '../images/A.jpg';
import Image2 from '../images/B.jpg';
import Image3 from '../images/D.jpg';



const HomePage = () => {
  return (
    <div className="homepage">
      <header className="header">
        <h1 className="title"></h1>
      </header>
      <main className="content">
        <section className="text-section">
        <h2 className="section-title larger-section-title">Welcome to the decentralized Auction Platform</h2>
        <p className="section-text">
          Explore the world of decentralized auctions and bid on unique items!
        </p>
        </section>
        
        <div className="auctions-container">
          <div className="auction-card">
            <div className="image-container">
              <img src={Image1} alt="Art Auction" className="image" />
            </div>
            <h2 className="auction-title">Art Auction</h2>
            <p className="auction-description">Bid on a collection of beautiful artwork</p>
          </div>
          <div className="auction-card">
            <div className="image-container">
              <img src={Image2} alt="Antique Auction" className="image" />
            </div>
            <h2 className="auction-title">Antique Auction</h2>
            <p className="auction-description">Bid on a variety of antique items</p>
          </div>
          <div className="auction-card">
            <div className="image-container">
              <img src={Image3} alt="Jewelry Auction" className="image" />
            </div>
            <h2 className="auction-title">Jewelry Auction</h2>
            <p className="auction-description">Bid on stunning jewelry pieces</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
