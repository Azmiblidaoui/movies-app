import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieDetails.css';

const MovieDetails = ({ movies }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === parseInt(id));

  if (!movie) {
    return (
      <div className="movie-details">
        <div className="container">
          <div className="error-message">
            <h2>Movie not found</h2>
            <button onClick={() => navigate('/')} className="back-btn">
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { title, posterURL, description, rating, trailerURL } = movie;

  return (
    <div className="movie-details">
      <div className="container">
        <button onClick={() => navigate('/')} className="back-btn">
          ← Back to Movies
        </button>
        
        <div className="movie-details-content">
          <div className="movie-poster-section">
            <img 
              src={posterURL || 'https://via.placeholder.com/400x600/333/666?text=No+Image'} 
              alt={title}
              className="details-poster"
            />
            <div className="movie-rating-badge">
              <span className="rating-stars">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>
              <span className="rating-text">({rating}/5)</span>
            </div>
          </div>

          <div className="movie-info-section">
            <h1 className="movie-title-large">{title}</h1>
            
            <div className="trailer-section">
              <h3>Trailer</h3>
              {trailerURL ? (
                <div className="trailer-container">
                  <iframe
                    src={trailerURL}
                    title={`${title} Trailer`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="trailer-iframe"
                  ></iframe>
                </div>
              ) : (
                <div className="no-trailer">
                  <span>🎬</span>
                  <p>No trailer available for this movie</p>
                </div>
              )}
            </div>

            <div className="description-section">
              <h3>Synopsis</h3>
              <p className="movie-description-full">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;