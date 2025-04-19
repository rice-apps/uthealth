import React, { useState } from 'react';
import './App.tsx';

const ratings = [
  { emoji: '😡', label: 'Very Very Hard', color: 'red' },
  { emoji: '😠', label: 'Very Hard', color: '#ff4d4d' },
  { emoji: '😟', label: 'Hard', color: '#ff944d' },
  { emoji: '😐', label: 'Moderate', color: '#ffc107' },
  { emoji: '🙂', label: 'Light', color: '#8bc34a' },
  { emoji: '😁', label: 'Very Very Light', color: '#4caf50' },
];

export default function App() {
  const [selectedRating, setSelectedRating] = useState(null);

  const handleRatingClick = (index) => {
    setSelectedRating(index);
  };

  return (
    <div className="rating-container">
      <h1>How hard was that workout?</h1>
      <div className="rating-list">
        {ratings.map((item, index) => (
          <div
            key={index}
            className={`rating-item ${selectedRating === index ? 'selected' : ''}`}
            onClick={() => handleRatingClick(index)}
          >
            <span
              className="emoji"
              style={{ backgroundColor: selectedRating === index ? item.color : '' }}
            >
              {item.emoji}
            </span>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
      <button className="home-button" onClick={() => alert('Go to Home')}>
        Go to Home
      </button>
    </div>
  );
}
