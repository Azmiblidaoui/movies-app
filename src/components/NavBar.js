import React from 'react';
import './NavBar.css';

const NavBar = ({ filters = {}, onFiltersChange, onAddMovieClick, years = [], genres = [] }) => {
  const safeFilters = {
    title: filters?.title || '',
    rating: filters?.rating || 0,
    year: filters?.year || '',
    genre: filters?.genre || ''
  };

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...safeFilters,
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

  const hasActiveFilters = safeFilters.title || safeFilters.rating > 0 || safeFilters.year || safeFilters.genre;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <span className="logo">🎬</span>
          <h2>MovieFlix</h2>
        </div>

        <div className="nav-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search movies..."
              value={safeFilters.title}
              onChange={(e) => handleFilterChange('title', e.target.value)}
              className="search-input"
            />
            {safeFilters.title && (
              <button 
                className="clear-search"
                onClick={() => handleFilterChange('title', '')}
              >
                ✕
              </button>
            )}
          </div>

          <div className="filter-group">
            <select
              value={safeFilters.rating}
              onChange={(e) => handleFilterChange('rating', parseInt(e.target.value))}
              className="filter-select"
            >
              <option value={0}>All Ratings</option>
              <option value={5}>★★★★★</option>
              <option value={4}>★★★★☆ & up</option>
              <option value={3}>★★★☆☆ & up</option>
              <option value={2}>★★☆☆☆ & up</option>
              <option value={1}>★☆☆☆☆ & up</option>
            </select>
          </div>
          {hasActiveFilters && (
            <button className="clear-filters" onClick={clearFilters}>
              Clear All
            </button>
          )}
        </div>

        <button className="add-movie-btn" onClick={onAddMovieClick}>
          <span>+</span>
          Add Movie
        </button>
      </div>
    </nav>
  );
};

export default NavBar;