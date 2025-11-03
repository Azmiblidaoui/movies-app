import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import MovieList from './components/MovieList';
import Filter from './components/Filter';
import AddMovieModal from './components/AddMovieModal';

// Données de films par défaut
const defaultMovies = [
    {
      name: "beasts of no nation",
      posterurl:
        "https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABQcsOKPBHHBH4i2JGy0OJI3l4blWwCHjoewRWeLWaZ_n6yzjtW56apfhfQcc2Pb2WGfEAs2Qgs71OA4oTEocr3LZTPcE.jpg?r=b78",
      description:
        "As civil war rages in Africa, a fierce warlord (Idris Elba) trains a young orphan (Abraham Attah) to join his group of guerrilla soldiers.",
      rating: 5,
    },
    {
      name: "13 hours in benghazi",
      posterurl:
        "https://occ-0-1068-1722.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABRse3fgA3r6z5xMgjuVJlZlaXk8VKMNHxTV6f6_hcHVoTOwQka7dA48iui2uaWf77kkExQVywKkNVDwEB9T4Z9ofiTrl.jpg?r=44a",
      description:
        "A security team consisting of six members fights to defend an American diplomatic compound in Benghazi, Libya, against a wave of terrorist attacks.",
      rating: 4,
    },
    {
      name: "The Circle",
      posterurl:
        "https://m.media-amazon.com/images/S/pv-target-images/e1bd6a8e161dca864a56dcd78b5782b2872148bb2238578e62b3a44ca65777e6.jpg",
      description:
        "Mae is ecstatic to be employed in the biggest tech company in the world. But after she gets involved in an experiment that could change the world, she realises its adverse consequences.",
      rating: 2,
    },
    {
      name: "Inception",
      posterurl:
        "https://static2.srcdn.com/wordpress/wp-content/uploads/2020/03/Inception-characters-film-crew.jpg",
      description:
        "Cobb steals information from his targets by entering their dreams. Saito offers to wipe clean Cobb's criminal history as payment for performing an inception on his sick competitor's son.",
      rating: 3,
    },
    {
      name: "Shutter Island",
      posterurl:
        "https://play-lh.googleusercontent.com/jalongU-EtEyIVLHphasHtuoJML1ROTMFUXizvzGQ_zq2B0JBZYkcVLC7FUq61f9Yll9ClMzHfuXNUNx3w",
      description:
        "Teddy Daniels and Chuck Aule, two US marshals, are sent to an asylum on a remote island in order to investigate the disappearance of a patient, where Teddy uncovers a shocking truth about the place.",
      rating: 5,
    },
    {
      name: "Warcraft",
      posterurl:
        "https://www.rollingstone.com/wp-content/uploads/2018/06/rs-243610-8J07_WF0170_COMP_143639R_G_SRGB_000000_HR.jpg",
      description:
        "A few human survivors must team up with a group of dissenting Orcs to stop an Orc horde from invading their planet through a magic portal.",
      rating: 1,
    },
    {
      name: "The Godfather",
      posterurl:
        "https://m.media-amazon.com/images/M/MV5BYWNlN2U4YjQtMzI3NC00ZjkxLWEwMTItYWRlNDUxYTYwYjVlXkEyXkFqcGdeQWpvaG5oYXJ0._V1_UX477_CR0,0,477,268_AL_.jpg",
      description:
        "The Godfather is an American film series that consists of three crime films directed by Francis Ford Coppola inspired by the 1969 novel of the same name by Italian American author Mario Puzo.",
      rating: 5,
    },
    {
      name: "Taxi Driver",
      posterurl:
        "https://www.indiewire.com/wp-content/uploads/2016/04/taxi-driver-1.jpg?w=670&h=377&crop=1",
      description:
        "Travis, an ex-marine and Vietnam veteran, works as a taxi driver in New York City. One day, he is driven to save an underage prostitute from her pimp in an effort to clean the city of its corruption.",
      rating: 3,
    },
    {
      name: "Fight Club",
      posterurl:
        "https://img.huffingtonpost.com/asset/5bb49916220000ba01dc2840.jpeg?ops=scalefit_630_noupscale",
      description:
        "Discontented with his capitalistic lifestyle, a white-collared insomniac forms an underground fight club with Tyler, a careless soap salesman. The project soon spirals down into something sinister.",
      rating: 5,
    },
    {
      name: "The Lord of the Rings",
      posterurl:
        "https://imgix.bustle.com/uploads/image/2020/1/21/7f69561d-3863-4b82-8196-f6bfd3074f03-lord-of-the-rings-frodo-sam-ftr.jpg?w=1200&h=630&fit=crop&crop=faces&fm=jpg",
      description:
        "The Lord of the Rings is a film series of three epic fantasy adventure films directed by Peter Jackson, based on the novel written by J. R. R. Tolkien. The films are subtitled The Fellowship of the Ring, The Two Towers, and The Return of the King.",
      rating: 5,
    },

    {
      name: "Dachra",
      posterurl:
        "https://cdn.nawaat.org/wp-content/uploads/2018/11/DACHRA-3-2000px.jpg",
      description:
        "A young journalism student and her friends become trapped in an isolated village while trying to solve a gruesome criminal case that is over 25 years old.",
      rating: 5,
    },
    {
      name: "Paper Lives",
      posterurl:
        "https://m.media-amazon.com/images/M/MV5BZmYxMDNmN2QtYzkyOS00YWVmLTkzNGEtNzYzOTBkZTBkZjk0XkEyXkFqcGc@._V1_.jpg",
      description:
        "Mehmet runs a solid waste warehouse in an impoverished Istanbul neighbourhood, where he helps everyone in need, especially homeless children and teenagers. One day, Mehmet meets a homeless 8-year-old boy who changes his life.",
      rating: 2,
    },
    {
      name: "Seaspiracy",
      posterurl:
        "https://i.guim.co.uk/img/media/0b019b69ec3c618610bd78a84f39e491ac65fde2/120_0_3600_2160/master/3600.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=f792f8e3427117d08ad88b2dc68d68ae",
      description:
        "Seaspiracy is a 2021 documentary film about the environmental impact of fishing directed by and starring Ali Tabrizi, a British filmmaker. The film premiered on Netflix globally in March 2021 and garnered immediate attention in several countries.",
      rating: 5,
    },
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
    setMovies(defaultMovies);
    setFilteredMovies(defaultMovies);
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
      id: movies.length + 1,
      year: parseInt(newMovie.year) || 2024,
      rating: parseInt(newMovie.rating) || 1
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

  return (
    <div className="App">
      <NavBar 
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onAddMovieClick={() => setIsModalOpen(true)}
  
      />
      
      <main className="main-content">
        <div className="container">
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
        </div>
      </main>

      <AddMovieModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddMovie={handleAddMovie}
        years={years}
        genres={genres}
      />
    </div>
  );
}

export default App;