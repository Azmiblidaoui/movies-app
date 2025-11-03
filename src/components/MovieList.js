import React from "react";
import MovieCard from "./MovieCard";
import './MovieList.css';

const MovieList = ({ movies }) => {
  if (movies.length === 0) {
    return (
      <div className="no-movies">
        <div className="no-movies-icon">🎬</div>
        <h3>No movies found</h3>
        <p>Try adjusting your search filters or add a new movie.</p>
      </div>
    );
  }

  return (
    <div className="movie-list">
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;