import React from 'react';
import './Cards.css';

const Cards = ({ data }) => {
  return (
    <div className="cards-container">
      {data.map((card, idx) => (
        <div key={idx} className="cards">
          <div className="card-header">
            <span className="card-title">{card.title}</span>
            <span className="card-icon">{card.icon}</span>
          </div>
          <div className="card-count">{card.count}</div>
          <div className="card-subtitle">{card.subtitle}</div>
        </div>
      ))}
    </div>
  );
};

export default Cards;