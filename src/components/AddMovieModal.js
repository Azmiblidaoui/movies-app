import React, { useState } from 'react';
import './AddMovieModal.css';

const AddMovieModal = ({ isOpen, onClose, onAddMovie, years = [], genres = [] }) => {
  const [newMovie, setNewMovie] = useState({
    title: '',
    posterURL: '',
    description: '',
    rating: 1,
    year: new Date().getFullYear(),
    genre: 'Drama',
    trailerURL: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMovie.title && newMovie.posterURL) {
      onAddMovie(newMovie);
      setNewMovie({
        title: '',
        posterURL: '',
        description: '',
        rating: 1,
        year: new Date().getFullYear(),
        genre: 'Drama',
        trailerURL: ''
      });
    }
  };

  const handleChange = (field, value) => {
    setNewMovie(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Add New Movie</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              placeholder="Enter movie title"
              value={newMovie.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Poster URL *</label>
            <input
              type="text"
              placeholder="Enter poster URL"
              value={newMovie.posterURL}
              onChange={(e) => handleChange('posterURL', e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Enter movie description"
              value={newMovie.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Trailer URL (YouTube Embed)</label>
            <input
              type="text"
              placeholder="Enter YouTube embed URL (e.g., https://www.youtube.com/embed/VIDEO_ID)"
              value={newMovie.trailerURL}
              onChange={(e) => handleChange('trailerURL', e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Rating</label>
            <select
              value={newMovie.rating}
              onChange={(e) => handleChange('rating', parseInt(e.target.value))}
            >
              <option value={1}>★☆☆☆☆ (1)</option>
              <option value={2}>★★☆☆☆ (2)</option>
              <option value={3}>★★★☆☆ (3)</option>
              <option value={4}>★★★★☆ (4)</option>
              <option value={5}>★★★★★ (5)</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Year</label>
            <input
              type="number"
              placeholder="Release year"
              value={newMovie.year}
              onChange={(e) => handleChange('year', parseInt(e.target.value))}
              min="1900"
              max={new Date().getFullYear() + 5}
            />
          </div>
          
          <div className="form-group">
            <label>Genre</label>
            <select
              value={newMovie.genre}
              onChange={(e) => handleChange('genre', e.target.value)}
            >
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Horror">Horror</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Thriller">Thriller</option>
            </select>
          </div>
          
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="add-btn">
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovieModal;