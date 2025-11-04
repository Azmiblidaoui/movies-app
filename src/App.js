import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import MovieList from './components/MovieList';
import Filter from './components/Filter';
import AddMovieModal from './components/AddMovieModal';
import MovieDetails from './components/MovieDetails';

const defaultMovies = [
  {
    id: 1,
    name: "Beasts of No Nation",
    title: "Beasts of No Nation",
    posterURL: "https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABQcsOKPBHHBH4i2JGy0OJI3l4blWwCHjoewRWeLWaZ_n6yzjtW56apfhfQcc2Pb2WGfEAs2Qgs71OA4oTEocr3LZTPcE.jpg?r=b78",
    description: "As civil war rages in Africa, a fierce warlord (Idris Elba) trains a young orphan (Abraham Attah) to join his group of guerrilla soldiers.",
    rating: 5,
    year: 2015,
    genre: "Drama",
    trailerURL: "https://www.youtube.com/embed/2xb9Ty-1frw"
  },
  {
    id: 2,
    name: "13 Hours in Benghazi",
    title: "13 Hours in Benghazi",
    posterURL: "https://occ-0-1068-1722.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABRse3fgA3r6z5xMgjuVJlZlaXk8VKMNHxTV6f6_hcHVoTOwQka7dA48iui2uaWf77kkExQVywKkNVDwEB9T4Z9ofiTrl.jpg?r=44a",
    description: "A security team consisting of six members fights to defend an American diplomatic compound in Benghazi, Libya, against a wave of terrorist attacks.",
    rating: 4,
    year: 2016,
    genre: "Action",
    trailerURL: "https://www.youtube.com/embed/5MBjANEFXOA"
  },
  {
    id: 3,
    name: "The Circle",
    title: "The Circle",
    posterURL: "https://m.media-amazon.com/images/S/pv-target-images/e1bd6a8e161dca864a56dcd78b5782b2872148bb2238578e62b3a44ca65777e6.jpg",
    description: "Mae is ecstatic to be employed in the biggest tech company in the world. But after she gets involved in an experiment that could change the world, she realises its adverse consequences.",
    rating: 2,
    year: 2017,
    genre: "Sci-Fi",
    trailerURL: "https://www.youtube.com/embed/QUlr8Am4zQ0"
  },
  {
    id: 4,
    name: "Inception",
    title: "Inception",
    posterURL: "https://static2.srcdn.com/wordpress/wp-content/uploads/2020/03/Inception-characters-film-crew.jpg",
    description: "Cobb steals information from his targets by entering their dreams. Saito offers to wipe clean Cobb's criminal history as payment for performing an inception on his sick competitor's son.",
    rating: 5,
    year: 2010,
    genre: "Sci-Fi",
    trailerURL: "https://www.youtube.com/embed/YoHD9XEInc0"
  },
  {
    id: 5,
    name: "Shutter Island",
    title: "Shutter Island",
    posterURL: "https://play-lh.googleusercontent.com/jalongU-EtEyIVLHphasHtuoJML1ROTMFUXizvzGQ_zq2B0JBZYkcVLC7FUq61f9Yll9ClMzHfuXNUNx3w",
    description: "Teddy Daniels and Chuck Aule, two US marshals, are sent to an asylum on a remote island in order to investigate the disappearance of a patient, where Teddy uncovers a shocking truth about the place.",
    rating: 5,
    year: 2010,
    genre: "Thriller",
    trailerURL: "https://www.youtube.com/embed/v8yrZSkKxTA"
  },
  {
    id: 6,
    name: "Warcraft",
    title: "Warcraft",
    posterURL: "https://www.rollingstone.com/wp-content/uploads/2018/06/rs-243610-8J07_WF0170_COMP_143639R_G_SRGB_000000_HR.jpg",
    description: "A few human survivors must team up with a group of dissenting Orcs to stop an Orc horde from invading their planet through a magic portal.",
    rating: 1,
    year: 2016,
    genre: "Fantasy",
    trailerURL: "https://www.youtube.com/embed/RhFMIRuHAL4"
  },
  {
    id: 7,
    name: "The Godfather",
    title: "The Godfather",
    posterURL: "https://m.media-amazon.com/images/M/MV5BYWNlN2U4YjQtMzI3NC00ZjkxLWEwMTItYWRlNDUxYTYwYjVlXkEyXkFqcGdeQWpvaG5oYXJ0._V1_UX477_CR0,0,477,268_AL_.jpg",
    description: "The Godfather is an American film series that consists of three crime films directed by Francis Ford Coppola inspired by the 1969 novel of the same name by Italian American author Mario Puzo.",
    rating: 5,
    year: 1972,
    genre: "Drama",
    trailerURL: "https://www.youtube.com/embed/UaVTIH8mujA"
  },
  {
    id: 8,
    name: "Fight Club",
    title: "Fight Club",
    posterURL: "https://img.huffingtonpost.com/asset/5bb49916220000ba01dc2840.jpeg?ops=scalefit_630_noupscale",
    description: "Discontented with his capitalistic lifestyle, a white-collared insomniac forms an underground fight club with Tyler, a careless soap salesman. The project soon spirals down into something sinister.",
    rating: 5,
    year: 1999,
    genre: "Drama",
    trailerURL: "https://www.youtube.com/embed/SUXWAEX2jlg"
  },
  {
    id: 9,
    name: "The Lord of the Rings",
    title: "The Lord of the Rings",
    posterURL: "https://imgix.bustle.com/uploads/image/2020/1/21/7f69561d-3863-4b82-8196-f6bfd3074f03-lord-of-the-rings-frodo-sam-ftr.jpg?w=1200&h=630&fit=crop&crop=faces&fm=jpg",
    description: "The Lord of the Rings is a film series of three epic fantasy adventure films directed by Peter Jackson, based on the novel written by J. R. R. Tolkien.",
    rating: 5,
    year: 2001,
    genre: "Fantasy",
    trailerURL: "https://www.youtube.com/embed/V75dMMIW2B4"
  },
  {
    id: 10,
    name: "Dachra",
    title: "Dachra",
    posterURL: "https://cdn.nawaat.org/wp-content/uploads/2018/11/DACHRA-3-2000px.jpg",
    description: "A young journalism student and her friends become trapped in an isolated village while trying to solve a gruesome criminal case that is over 25 years old.",
    rating: 5,
    year: 2018,
    genre: "Horror",
    trailerURL: "https://www.youtube.com/embed/6_Yad8ZJDGE"
  }
];

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
    rating: 0,
    year: '',
    genre: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Assurez-vous que chaque film a un ID et un titre
    const moviesWithIds = defaultMovies.map(movie => ({
      ...movie,
      id: movie.id,
      title: movie.title || movie.name
    }));
    setMovies(moviesWithIds);
    setFilteredMovies(moviesWithIds);
  }, []);

  useEffect(() => {
    let filtered = movies;

    if (filters.title) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    if (filters.rating > 0) {
      filtered = filtered.filter(movie => movie.rating >= filters.rating);
    }

    if (filters.year) {
      filtered = filtered.filter(movie => movie.year.toString() === filters.year);
    }

    if (filters.genre) {
      filtered = filtered.filter(movie => movie.genre === filters.genre);
    }

    setFilteredMovies(filtered);
  }, [movies, filters]);

  const handleAddMovie = (newMovie) => {
    const movieToAdd = {
      ...newMovie,
      id: movies.length > 0 ? Math.max(...movies.map(movie => movie.id)) + 1 : 1,
      year: parseInt(newMovie.year) || new Date().getFullYear(),
      rating: parseInt(newMovie.rating) || 1,
      trailerURL: newMovie.trailerURL || ''
    };
    const updatedMovies = [...movies, movieToAdd];
    setMovies(updatedMovies);
    setIsModalOpen(false);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const years = [...new Set(movies.map(movie => movie.year))].sort((a, b) => b - a);
  const genres = [...new Set(movies.map(movie => movie.genre))];

  const HomePage = () => (
    <>
      <Filter 
        filters={filters}
        onFiltersChange={handleFiltersChange}
        years={years}
        genres={genres}
      />
      
      <div className="movies-section">
        <div className="section-header">
          <h1>Featured Movies</h1>
          <span className="movies-count">
            {filteredMovies.length} movie{filteredMovies.length !== 1 ? 's' : ''} found
          </span>
        </div>
        
        <MovieList movies={filteredMovies} />
      </div>

      <AddMovieModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddMovie={handleAddMovie}
        years={years}
        genres={genres}
      />
    </>
  );

  return (
    <Router>
      <div className="App">
        <NavBar 
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onAddMovieClick={() => setIsModalOpen(true)}
        />
        
        <main className="main-content">
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movie/:id" element={<MovieDetails movies={movies} />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;