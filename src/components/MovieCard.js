import React from 'react';
import './MovieCard.css';  

const MovieCard = ({ movie }) => {
  if (!movie) {
    return null;
  }
  const title = movie.title || movie.name || 'Unknown Title';
  const description = movie.description || 'No description available';
  const posterURL = movie.posterURL || movie.posterurl || '';
  const rating = movie.rating || 0;

  const renderStars = (rating) => {
    return (
      <div className="stars">
        {'★'.repeat(rating)}
        {'☆'.repeat(5 - rating)}
        <span className="rating-text">({rating}/5)</span>
      </div>
    );
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={posterURL || 'https://via.placeholder.com/300x400/333/666?text=No+Image'} alt={title} />
        <div className="movie-overlay">
          <div className="movie-rating">
            {renderStars(rating)}
          </div>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-description">{description}</p>
      </div>
    </div>
  );
};

export default MovieCard;