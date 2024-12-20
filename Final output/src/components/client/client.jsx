import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { useViewClientMovie } from '../../contexts/ViewClientMovieContext';
import './client.css';

const getYouTubeEmbedUrl = (url) => {
  try {
   
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    
    if (videoIdMatch && videoIdMatch[1]) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }
    
    return null;
  } catch (error) {
    console.error('Error converting YouTube URL:', error);
    return null;
  }
};


const safeFormatDate = (dateValue, includeTime = false) => {
  if (!dateValue) return '';
  
  try {
    const date = new Date(dateValue);
    

    if (isNaN(date.getTime())) {
      console.warn('Invalid date:', dateValue);
      return '';
    }
    
    
    if (includeTime) {
      
      const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
      return localDate.toISOString().slice(0, 16);
    }
    

    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

const ClientMovies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const navigate = useNavigate();
  const { logout, user } = useUser();
  const { getUserMovies, getMovieDetails } = useViewClientMovie();

  useEffect(() => {
    if (!user || user.role !== 'user') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogoutClick = () => setLogoutConfirm(true);
  const handleConfirmLogout = () => {
    logout();
    navigate('/login');
  };
  const handleCancelLogout = () => setLogoutConfirm(false);

  useEffect(() => {
    const fetchUserMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!user) {
          throw new Error('No user logged in');
        }

        const userMovies = await getUserMovies(user.id);
        
        console.log('Fetched movies:', userMovies);

        setMovies(userMovies || []);
      } catch (error) {
        console.error('Detailed error fetching movies:', error);
        setError(error.message || 'Failed to load movies');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserMovies();
    }
  }, [user, getUserMovies]);

  const handleMovieClick = async (movieId) => {
    try {
      console.log('Fetching details for movie ID:', movieId);
      
      const movieData = await getMovieDetails(movieId);
      
      console.log('Processed Movie Details:', movieData);
      
      if (!movieData.title) {
        console.warn('Movie details missing title');
        return;
      }
      
      setSelectedMovie(movieData);
      setCurrentVideo(movieData.videos && movieData.videos.length > 0 ? movieData.videos[0] : null);
    } catch (error) {
      console.error('Detailed error fetching movie details:', error);
    }
  };

  if (loading) {
    return (
      <div className="client-movies-loading">
        <p>Loading your movie collection...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="client-movies-error">
        <p>Error: {error}</p>
        <p>Please try refreshing the page or logging in again.</p>
      </div>
    );
  }

  return (
    <div 
      className="client-movies-container" 
      style={{
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      msOverflowStyle: 'none',
      scrollbarWidth: 'none'
      }}
    >
      <div className="logout-container">
      {logoutConfirm ? (
        <>
        <button 
          className="secondary"
          onClick={handleCancelLogout}
        >
          CANCEL
        </button>
        <button 
          className="success"
          onClick={handleConfirmLogout}
        >
          CONFIRM
        </button>
        </>
      ) : (
        <button 
        className="danger"
        onClick={handleLogoutClick}
        >
        LOGOUT
        </button>
      )}
      </div>
      {selectedMovie ? (
        <div 
          className="client-movies-details-content"
          style={{
            overflowY: 'auto',
            height: '100%',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <div className="client-movies-details-card">
            <div className="client-movies-details-header">
              <h2>{selectedMovie.title || selectedMovie.name || 'No Title'}</h2>
              <div className="client-movies-edit-actions">
                <button 
                  className="client-movies-details-close" 
                  onClick={() => setSelectedMovie(null)}
                >
                  ×
                </button>
              </div>
            </div>
            
            <img 
              className="client-movies-details-poster"
              src={
                selectedMovie.backdropPath 
                  ? `https://image.tmdb.org/t/p/w500${selectedMovie.backdropPath}` 
                  : (
                    selectedMovie.posterPath 
                      ? `https://image.tmdb.org/t/p/w500${selectedMovie.posterPath}` 
                      : '/placeholder.png'
                  )
              } 
              alt={selectedMovie.title || selectedMovie.name || 'Movie Poster'} 
              onError={(e) => { e.target.src = '/placeholder.png'; }}
            />
            
            <p className="client-movies-details-description">
              {selectedMovie.overview || selectedMovie.description || 'No description available'}
            </p>
            
            <div className="client-movies-details-sections">
              <div className="client-movies-details-additional-info">
                <div className="client-movies-details-info-grid">
                  <div className="client-movies-details-info-item">
                    <h4>Popularity</h4>
                    <p>{selectedMovie.popularity ? selectedMovie.popularity.toFixed(2) : 'N/A'}</p>
                  </div>
                  <div className="client-movies-details-info-item">
                    <h4>Release Date</h4>
                    <p>{selectedMovie.releaseDate ? new Date(selectedMovie.releaseDate).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>
              </div>
              
              <div className="client-movies-details-media">
                <div className="client-movies-media-header">
                  <h3>Videos</h3>
                </div>
                {selectedMovie.videos && selectedMovie.videos.length > 0 ? (
                  <div className="client-movies-video-carousel">
                    {selectedMovie.videos.length > 1 && (
                      <button 
                        className="client-movies-video-nav-btn prev-video-btn"
                        onClick={() => {
                          const currentIndex = selectedMovie.videos.findIndex(v => v.id === currentVideo.id);
                          const prevIndex = currentIndex > 0 ? currentIndex - 1 : selectedMovie.videos.length - 1;
                          setCurrentVideo(selectedMovie.videos[prevIndex]);
                        }}
                      >
                        ◀
                      </button>
                    )}
                    
                    <div className="client-movies-media-grid">
                      {currentVideo && currentVideo.url ? (
                        <div key={currentVideo.id} className="client-movies-media-item client-movies-video-container">
                          {currentVideo.url.includes('youtube.com') || currentVideo.url.includes('youtu.be') ? (
                            <iframe
                              src={getYouTubeEmbedUrl(currentVideo.url)}
                              title={currentVideo.name || 'YouTube Video'}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          ) : (
                            <video 
                              controls 
                              src={currentVideo.url} 
                              onError={(e) => {
                                console.error('Video Playback Error Details:', {
                                  errorEvent: e,
                                  videoUrl: currentVideo.url,
                                  videoName: currentVideo.name,
                                  videoId: currentVideo.id,
                                  fullVideoObject: currentVideo
                                });
                                
                                
                                const errorMessage = 
                                  !currentVideo.url ? 'No video URL provided' :
                                  e.target.error ? 
                                    (() => {
                                      switch (e.target.error.code) {
                                        case MediaError.MEDIA_ERR_ABORTED: return 'Fetching process aborted';
                                        case MediaError.MEDIA_ERR_NETWORK: return 'Network error - check your connection';
                                        case MediaError.MEDIA_ERR_DECODE: return 'Decoding error - video format may be incompatible';
                                        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED: return 'Video format not supported';
                                        default: return 'Unknown video playback error';
                                      }
                                    })() :
                                  'Unable to play video';
                                
                                console.error('Video Playback Error:', errorMessage);
                              }}
                            >
                              Your browser does not support the video tag.
                            </video>
                          )}
                          <p>{currentVideo.name || 'Video'}</p>
                        </div>
                      ) : (
                        <p>No valid video available</p>
                      )}
                    </div>
                    
                    {selectedMovie.videos.length > 1 && (
                      <button 
                        className="client-movies-video-nav-btn next-video-btn"
                        onClick={() => {
                          const currentIndex = selectedMovie.videos.findIndex(v => v.id === currentVideo.id);
                          const nextIndex = currentIndex < selectedMovie.videos.length - 1 ? currentIndex + 1 : 0;
                          setCurrentVideo(selectedMovie.videos[nextIndex]);
                        }}
                      >
                        ▶
                      </button>
                    )}
                  </div>
                ) : (
                  <p>No videos available</p>
                )}
              </div>

              <div className="client-movies-details-photos">
                <div className="client-movies-photos-header">
                  <h3>Photos</h3>
                </div>
                <div className="client-movies-photos-grid">
                  {selectedMovie.photos && selectedMovie.photos.length > 0 ? (
                    selectedMovie.photos.map(photo => (
                      <div key={photo.id} className="client-movies-photo-item">
                        <img 
                          src={`https://image.tmdb.org/t/p/w500${photo.url}`} 
                          alt={photo.description || 'Movie Photo'} 
                          onError={(e) => { e.target.src = '/placeholder.png'; }}
                        />
                      </div>
                    ))
                  ) : (
                    <p>No photos available</p>
                  )}
                </div>
              </div>

              <div className="client-movies-details-cast">
                <div className="client-movies-cast-header">
                  <h3>Cast</h3>
                </div>
                <div className="client-movies-cast-grid">
                  {selectedMovie.casts && selectedMovie.casts.length > 0 ? (
                    selectedMovie.casts.map((actor) => (
                      <div key={actor.id} className="client-movies-cast-member">
                        <div className="client-movies-cast-member-image-container">
                          <img 
                            src={actor.url ? `https://image.tmdb.org/t/p/w500${actor.url}` : '/placeholder.png'} 
                            alt={actor.name || 'Actor'} 
                            onError={(e) => { e.target.src = '/placeholder.png'; }}
                          />
                        </div>
                        <p>
                          {actor.name || 'Unknown Actor'}
                        </p>
                        <p>
                          {actor.characterName || ''}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No cast information available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="client-movies-content">
          <h1>Movie List</h1>
          {movies.length === 0 ? (
            <div className="client-movies-empty">
              <p>No movies found. Start by searching and adding movies!</p>
            </div>
          ) : (
            <div className="client-movies-grid">
              {movies.map(movie => {
                const year = movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : '';
                
                return (
                  <div 
                    key={movie.id} 
                    className="client-movie-card" 
                    onClick={() => handleMovieClick(movie.id)}
                  >
                    <div className="client-movie-card-image">
                      <img 
                        src={movie.posterPath ? 
                            `https://image.tmdb.org/t/p/w500${movie.posterPath}` : 
                            '/placeholder.png'
                        } 
                        alt={movie.title} 
                        onError={(e) => { e.target.src = '/placeholder.png'; }}
                      />
                    </div>
                    <div className="client-movie-card-details">
                      <h3>{movie.title}</h3>
                      <p>{year}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientMovies;