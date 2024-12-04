import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import './Form.css';

const Form = () => {
  const [query, setQuery] = useState('');
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { movieId } = useParams(); // Get movieId from URL params

  const TMDB_API_KEY = '43bde163469fc36ca5281d58b7e2e4c0'; // Your TMDb API Key

  // Function to search for movies using the TMDb API
  const handleSearch = useCallback(() => {
    if (!query) return;

    setLoading(true); // Set loading state to true
    axios
      .get(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1&api_key=${TMDB_API_KEY}`)
      .then((response) => {
        setSearchedMovieList(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.error('Error while searching for movies:', error);
      })
      .finally(() => {
        setLoading(false); // Set loading state to false
      });
  }, [query]);

  // Function to select a movie from the search results
  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  // Function to save the selected movie to your backend
  const handleSave = () => {
    const accessToken = localStorage.getItem('accessToken'); // Retrieve token from localStorage

    if (!accessToken) {
      alert('You must be logged in to save the movie!');
      return;
    }

    if (!selectedMovie) {
      alert('Please search and select a movie.');
      return;
    }

    const data = {
      tmdbId: selectedMovie.id,
      title: selectedMovie.title,
      overview: selectedMovie.overview,
      popularity: selectedMovie.popularity,
      releaseDate: selectedMovie.release_date,
      voteAverage: selectedMovie.vote_average,
      backdropPath: `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`,
      posterPath: `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`,
      isFeatured: 0,
    };

    setLoading(true); // Set loading state to true

    axios({
      method: movieId ? 'put' : 'post', // Use PUT for updates, POST for new movies
      url: movieId ? `/movies/${movieId}` : '/movies', // Handle both create and update
      data: data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((saveResponse) => {
        console.log('Movie saved successfully:', saveResponse);
        alert(movieId ? 'Movie updated successfully!' : 'Movie saved successfully!');
      })
      .catch((error) => {
        console.error('Error while saving movie:', error);
        alert('Failed to save movie.');
      })
      .finally(() => {
        setLoading(false); // Set loading state to false
      });
  };

  // Fetch movie details when editing an existing movie
  useEffect(() => {
    if (movieId) {
      setLoading(true); // Set loading state to true
      axios
        .get(`/movies/${movieId}`)
        .then((response) => {
          setMovie(response.data);
          setSelectedMovie({
            id: response.data.tmdbId,
            original_title: response.data.title,
            overview: response.data.overview,
            popularity: response.data.popularity,
            poster_path: response.data.posterPath,
            release_date: response.data.releaseDate,
            vote_average: response.data.voteAverage,
          });
          console.log('Fetched movie data:', response.data);
        })
        .catch((error) => {
          console.error('Error while fetching movie details:', error);
        })
        .finally(() => {
          setLoading(false); // Set loading state to false
        });
    }
  }, [movieId]);

  return (
    <>
      <h1>{movieId ? 'Edit Movie' : 'Create Movie'}</h1>

      {/* Movie Search Section */}
      {!movieId && (
        <div className="search-container">
          <label>Search Movie: </label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter movie title"
          />
          <button type="button" onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
          <div className="searched-movie">
            {searchedMovieList.map((movie) => (
              <p key={movie.id} onClick={() => handleSelectMovie(movie)}>
                {movie.original_title}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Form Section */}
      <div className="container">
        <form>
          {selectedMovie && (
            <img
              className="poster-image"
              src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
              alt={selectedMovie.original_title}
            />
          )}

          {/* Movie Fields */}
          <div className="field">
            <label>Title: </label>
            <input
              type="text"
              value={selectedMovie ? selectedMovie.original_title : ''}
              onChange={(e) =>
                setSelectedMovie({
                  ...selectedMovie,
                  original_title: e.target.value,
                })
              }
              readOnly={!!movieId}  // Only make it read-only if movieId exists
              placeholder="Movie Title"
            />
          </div>

          <div className="field">
            <label>Overview: </label>
            <textarea
              rows={10}
              value={selectedMovie ? selectedMovie.overview : ''}
              onChange={(e) =>
                setSelectedMovie({ ...selectedMovie, overview: e.target.value })
              }
              readOnly={!!movieId}  // Only make it read-only if movieId exists
              placeholder="Movie Overview"
            />
          </div>

          <div className="field">
            <label>Popularity: </label>
            <input
              type="number"
              value={selectedMovie ? selectedMovie.popularity : ''}
              onChange={(e) =>
                setSelectedMovie({ ...selectedMovie, popularity: e.target.value })
              }
              readOnly={!!movieId}  // Only make it read-only if movieId exists
              placeholder="Popularity"
              step="0.1"
            />
          </div>

          <div className="field">
            <label>Release Date: </label>
            <input
              type="date"
              value={selectedMovie ? selectedMovie.release_date : ''}
              onChange={(e) =>
                setSelectedMovie({ ...selectedMovie, release_date: e.target.value })
              }
              readOnly={!!movieId}  // Only make it read-only if movieId exists
              placeholder="Release Date"
            />
          </div>

          <div className="field">
            <label>Vote Average: </label>
            <input
              type="number"
              value={selectedMovie ? selectedMovie.vote_average : ''}
              onChange={(e) =>
                setSelectedMovie({ ...selectedMovie, vote_average: e.target.value })
              }
              readOnly={!!movieId}  // Only make it read-only if movieId exists
              placeholder="Vote Average"
              step="0.1"
            />
          </div>

          {/* Save Button */}
          <button type="button" onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : movieId ? 'Update' : 'Save'}
          </button>
        </form>
      </div>

      {/* Navigation for movie-related tabs */}
      {movieId && selectedMovie && (
        <div>
          <hr />
          <nav>
            <ul className="tabs">
              <li onClick={() => navigate(`/main/movies/form/${movieId}/cast-and-crews`)}>Cast & Crews</li>
              <li onClick={() => navigate(`/main/movies/form/${movieId}/videos`)}>Videos</li>
              <li onClick={() => navigate(`/main/movies/form/${movieId}/photos`)}>Photos</li>
            </ul>
          </nav>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default Form;
