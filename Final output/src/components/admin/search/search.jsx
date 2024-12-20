import React, { useState, useEffect } from 'react';
import { useUser } from '../../../contexts/UserContext';
import { useAddMovie } from '../../../contexts/AddMovieContext';
import { useViewMovie } from '../../../contexts/ViewMovieContext';
import './search.css';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();
    const { searchMovies, getMovieDetails, addMovie, addCasts, addPhotos, addVideos, getPopularMovies } = useAddMovie();
    const { getUserMovies } = useViewMovie();


    useEffect(() => {
        if (!user || !user.id) {
            console.error("User is not available");
            return;
        }

        const fetchPopularMovies = async () => {
            try {
                const results = await getPopularMovies();
                const userMovies = await getUserMovies(user.id);
                const filteredMovies = results.filter(movie => 
                    !userMovies.some(userMovie => userMovie.tmdbId === movie.id)
                );
                setMovies(filteredMovies);
            } catch (error) {
                console.error('Error fetching popular movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPopularMovies();
    }, [getPopularMovies, getUserMovies, user]);


    const handleSearch = async (query) => {
        setLoading(true);
        try {
            let results;
            if (!query) {
                results = await getPopularMovies();
            } else {
                results = await searchMovies(query);
            }
            const userMovies = await getUserMovies(user.id);
            const filteredMovies = results.filter(movie => 
                !userMovies.some(userMovie => userMovie.tmdbId === movie.id)
            );
            setMovies(filteredMovies);
        } catch (error) {
            console.error('Error searching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddMovie = async (movie) => {
        try {
            const { movieDetails, credits, images, videos } = await getMovieDetails(movie.id);


            const movieData = {
                userId: user.id,
                tmdbId: movie.id,
                title: movie.title,
                overview: movie.overview,
                popularity: movie.popularity,
                releaseDate: movie.release_date,
                voteAverage: movie.vote_average,
                backdropPath: movie.backdrop_path || '',
                posterPath: movie.poster_path || '',
                isFeatured: false,
                dateCreated: new Date().toISOString(),
                dateUpdated: new Date().toISOString()
            };

            let savedMovie;
            try {
                savedMovie = await addMovie(movieData);

                if (credits.cast?.length > 0) {
                    const castsData = credits.cast.slice(0, 10).map(cast => ({
                        movieId: savedMovie.id,
                        userId: user.id,
                        name: cast.name || '',
                        url: cast.profile_path || '',
                        characterName: cast.character || '',
                        dateCreated: new Date().toISOString(),
                        dateUpdated: new Date().toISOString()
                    }));
                    await addCasts(castsData);
                }

                if (images.backdrops?.length > 0) {
                    const photosData = images.backdrops.slice(0, 5).map(image => ({
                        movieId: savedMovie.id,
                        userId: user.id,
                        url: image.file_path || '',
                        description: `Backdrop image for ${movie.title}`,
                        dateCreated: new Date().toISOString(),
                        dateUpdated: new Date().toISOString()
                    }));
                    await addPhotos(photosData);
                }

                if (videos.results?.length > 0) {
                    const videosData = videos.results.map(video => ({
                        movieId: savedMovie.id,
                        userId: user.id,
                        url: `https://www.youtube.com/watch?v=${video.key}`,
                        name: video.name || '',
                        site: video.site || '',
                        videoKey: video.key || '',
                        videoType: video.type || '',
                        official: video.official || false,
                        dateCreated: new Date().toISOString(),
                        dateUpdated: new Date().toISOString()
                    }));
                    await addVideos(videosData);
                }
            } catch (saveError) {
                console.error('Error saving movie details:', saveError);
            }

            handleSearch(searchQuery);
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };


    return (
        <div className="search-container">
            {!user || !user.id ? (
                <div className="loading">Please log in to search movies.</div>
            ) : (
                <>
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search for your favorite movies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                        />
                        <button onClick={() => handleSearch(searchQuery)}>
                            Search Movies
                        </button>
                    </div>

                    {loading ? (
                        <div className="loading">
                            Loading amazing movies for you...
                        </div>
                    ) : (
                        <div className="search-movie-grid">
                            {movies.map((movie) => (
                                <div key={movie.id} className="search-movie-card">
                                    <img
                                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder.png'}
                                        alt={movie.title}
                                        onError={(e) => {
                                            e.target.src = '/placeholder.png';
                                        }}
                                    />
                                    <div className="search-movie-info">
                                        <h3>{movie.title}</h3>
                                        <p>Release Date: {movie.release_date}</p>
                                        <button onClick={() => handleAddMovie(movie)}>
                                            Add to Collection
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>

    );
};

export default Search;
