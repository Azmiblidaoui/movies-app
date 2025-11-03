import React from 'react';
import './Filter.css';

const Filter = ({ filters = {}, onFiltersChange, years = [], genres = [] }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      title: '',
      rating: 0,
      year: '',
      genre: ''
    });
  };

  const hasActiveFilters = filters.title || filters.rating > 0 || filters.year || filters.genre;

  return (
    <div className="filter">
      <h2>🔍 Filter Movies</h2>
      <div className="filter-controls">
        <div className="filter-group">
          <label>
            <span className="filter-icon">🎬</span>
            Title
          </label>
          <input
            type="text"
            placeholder="Search by title..."
            value={filters.title || ''}
            onChange={(e) => handleFilterChange('title', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>
            <span className="filter-icon">⭐</span>
            Rating
          </label>
          <div className="rating-filter-container">
            <select
              value={filters.rating || 0}
              onChange={(e) => handleFilterChange('rating', parseInt(e.target.value))}
            >
              <option value={0}>All ratings</option>
              <option value={1}>★☆☆☆☆ & up</option>
              <option value={2}>★★☆☆☆ & up</option>
              <option value={3}>★★★☆☆ & up</option>
              <option value={4}>★★★★☆ & up</option>
              <option value={5}>★★★★★ only</option>
            </select>
            <div className="star-preview">
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className={`star-filter ${star <= (filters.rating || 0) ? 'filled' : ''}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>


        <div className="filter-group">
          <label>
            <span className="filter-icon">🎭</span>
            Genre
          </label>
          <select
            value={filters.genre || ''}
            onChange={(e) => handleFilterChange('genre', e.target.value)}
          >
            <option value="">All genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <div className="filter-actions">
            <button className="reset-btn" onClick={clearFilters}>
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;