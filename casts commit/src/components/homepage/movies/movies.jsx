import React, { useState, useEffect } from 'react';
import { useUser } from '../../../contexts/UserContext';
import { useViewMovie } from '../../../contexts/ViewMovieContext';
import { useUpdateMovie } from '../../../contexts/UpdateMovieContext';
import { useUpdateVideos } from '../../../contexts/UpdateVideosContext';
import { UpdateVideosProvider } from '../../../contexts/UpdateVideosContext';
import { useDeleteVideos } from '../../../contexts/DeleteVideosContext';
import { DeleteVideosProvider } from '../../../contexts/DeleteVideosContext';
import { useDeletePhotos } from '../../../contexts/DeletePhotosContext';
import { DeletePhotosProvider } from '../../../contexts/DeletePhotosContext';
import { useDeleteCast } from '../../../contexts/DeleteCastContext';
import { DeleteCastProvider } from '../../../contexts/DeleteCastContext';
import { useDeleteMovie } from '../../../contexts/DeleteMovieContext';
import { DeleteMovieProvider } from '../../../contexts/DeleteMovieContext';
import { UpdateCastsProvider, useUpdateCasts } from '../../../contexts/UpdateCastsContext';
import './movies.css';

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

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedOverview, setEditedOverview] = useState('');
  const [editedPopularity, setEditedPopularity] = useState('');
  const [editedReleaseDate, setEditedReleaseDate] = useState('');
  const [editedVideoName, setEditedVideoName] = useState('');

  const { user, accessToken } = useUser();
  const { 
    getUserMovies, 
    getMovieDetails, 
    updateMovie, 
    deleteCasts, 
    deletePhotos, 
    deleteVideos 
  } = useViewMovie();
  const { updateMovie: contextUpdateMovie } = useUpdateMovie();
  const { updateVideos } = useUpdateVideos();
  const { deleteVideo } = useDeleteVideos();
  const { deletePhoto } = useDeletePhotos();
  const { updateCast } = useUpdateCasts();
  const { deleteCast } = useDeleteCast();
  const { deleteMovie } = useDeleteMovie();

  useEffect(() => {
    const fetchUserMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!user) {
          throw new Error('No user logged in');
        }
        if (!getUserMovies) {
          throw new Error('getUserMovies function is not available');
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
      const response = await fetch(`/movies/${movieId}/details`, {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response text:', errorText);
        throw new Error(`Failed to fetch movie details. Status: ${response.status}, ${errorText}`);
      }
      const movieData = await response.json();
      console.log('Full Response:', JSON.stringify(movieData, null, 2));
      const movie = movieData.movie || 
                    movieData.data || 
                    movieData.Movie || 
                    movieData;
      console.log('Extracted Movie Object:', movie);
      console.log('Movie Title:', movie?.title);
      console.log('Movie Overview:', movie?.overview);

      const processedMovieDetails = {
        ...movie,
        casts: movieData.casts || movieData.Casts || [],
        videos: movieData.videos || movieData.Videos || [],
        photos: movieData.photos || movieData.Photos || [],
        createdAt: movie.createdAt || movie.created_at || movie.dateCreated || null,
        updatedAt: movie.updatedAt || movie.updated_at || movie.dateUpdated || null
      };

      console.log('Processed Movie Details:', processedMovieDetails);
      if (!processedMovieDetails.title) {
        console.warn('Movie details missing title');
        return;
      }
      setSelectedMovie(processedMovieDetails);
      setCurrentVideo(processedMovieDetails.videos && processedMovieDetails.videos.length > 0 ? processedMovieDetails.videos[0] : null);
    } catch (error) {
      console.error('Detailed error fetching movie details:', error);
    }
  };

  const handleDeleteMovie = async () => {
    try {
      if (!selectedMovie) return;

      await deleteMovie(selectedMovie.id, user.id);
      setMovies(movies.filter(movie => movie.id !== selectedMovie.id));
      setSelectedMovie(null);
      console.log(`Movie ${selectedMovie.id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  useEffect(() => {
    if (isEditing && selectedMovie) {
      setEditedTitle(selectedMovie.title || '');
      setEditedOverview(selectedMovie.overview || '');
      setEditedPopularity(selectedMovie.popularity ? selectedMovie.popularity.toString() : '');
      setEditedReleaseDate(safeFormatDate(selectedMovie.releaseDate));
      setEditedVideoName(currentVideo?.name || '');
    }
  }, [isEditing, selectedMovie, currentVideo]);

  const handleOverviewChange = (e) => {
    setEditedOverview(e.target.value);
  };

  const handleTitleChange = (e) => setEditedTitle(e.target.value);
  const handlePopularityChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setEditedPopularity(value);
    }
  };
  const handleReleaseDateChange = (e) => setEditedReleaseDate(e.target.value);
  const handleVideoNameChange = (e) => setEditedVideoName(e.target.value);

  const handleRemoveVideo = async (videoId) => {
    try {
      await deleteVideo(videoId, user.id);
      const updatedVideos = selectedMovie.videos.filter(video => video.id !== videoId);
      setSelectedMovie({
        ...selectedMovie,
        videos: updatedVideos
      });
      console.log(`Video ${videoId} deleted successfully`);
    } catch (error) {
      console.error('Error removing video:', error);
    }
  };

  const handleRemovePhoto = async (photoId) => {
    try {
      await deletePhoto(photoId, user.id);
      const updatedPhotos = selectedMovie.photos.filter(photo => photo.id !== photoId);
      setSelectedMovie({
        ...selectedMovie,
        photos: updatedPhotos
      });
      console.log(`Photo ${photoId} deleted successfully`);
    } catch (error) {
      console.error('Error removing photo:', error);
    }
  };

  const handleCastNameChange = async (index, newName) => {
    try {
      const currentCast = selectedMovie.casts[index];
      
      // Update cast in the database
      await updateCast(currentCast.id, {
        name: newName,
        characterName: currentCast.characterName
      });

      // Update local state
      const updatedCasts = [...selectedMovie.casts];
      updatedCasts[index] = {
        ...updatedCasts[index],
        name: newName
      };
      setSelectedMovie(prevMovie => ({
        ...prevMovie,
        casts: updatedCasts
      }));

      console.log(`Cast name updated for ID ${currentCast.id}`);
    } catch (error) {
      console.error('Error updating cast name:', error);
      // Optionally, show an error message to the user
    }
  };
  
  const handleCharacterNameChange = async (index, newCharacterName) => {
    try {
      const currentCast = selectedMovie.casts[index];
      
      // Update cast in the database
      await updateCast(currentCast.id, {
        name: currentCast.name,
        characterName: newCharacterName
      });

      // Update local state
      const updatedCasts = [...selectedMovie.casts];
      updatedCasts[index] = {
        ...updatedCasts[index],
        characterName: newCharacterName
      };
      setSelectedMovie(prevMovie => ({
        ...prevMovie,
        casts: updatedCasts
      }));

      console.log(`Character name updated for cast ID ${currentCast.id}`);
    } catch (error) {
      console.error('Error updating character name:', error);
      // Optionally, show an error message to the user
    }
  };

  const handleRemoveCast = async (castId) => {
    try {
      await deleteCast(castId, user.id);
      const updatedCasts = selectedMovie.casts.filter(cast => cast.id !== castId);
      setSelectedMovie({
        ...selectedMovie,
        casts: updatedCasts
      });
      console.log(`Cast ${castId} deleted successfully`);
    } catch (error) {
      console.error('Error removing cast:', error);
    }
  };

  const handleEditMovie = async () => {
    try {
      let movieUpdateNeeded = false;
      let videoUpdateNeeded = false;

      const updatedMovieData = {
        id: selectedMovie.id,
        title: editedTitle.trim(),
        overview: editedOverview.trim(),
        popularity: editedPopularity ? parseFloat(editedPopularity) : selectedMovie.popularity || 0,
        releaseDate: editedReleaseDate || selectedMovie.releaseDate || null,
        tmdbId: selectedMovie.tmdbId || null,
        voteAverage: selectedMovie.voteAverage || 0,
        backdropPath: selectedMovie.backdropPath || '',
        posterPath: selectedMovie.posterPath || '',
        isFeatured: selectedMovie.isFeatured || false
      };

      const movieFields = ['title', 'overview', 'popularity', 'releaseDate'];
      movieUpdateNeeded = movieFields.some(field => 
        updatedMovieData[field] !== selectedMovie[field]
      );

      const updatedVideo = {
        id: currentVideo.id,
        name: editedVideoName.trim(),
        url: currentVideo.url,
        user_id: currentVideo.user_id || currentVideo.userId,
        movie_id: currentVideo.movie_id || currentVideo.movieId,
        site: currentVideo.site,
        video_key: currentVideo.video_key || currentVideo.videoKey,
        video_type: currentVideo.video_type || currentVideo.videoType,
        official: currentVideo.official
      };

      const videoFields = ['name', 'url', 'site', 'video_key', 'video_type', 'official'];
      videoUpdateNeeded = videoFields.some(field => 
        updatedVideo[field] !== currentVideo[field]
      );

      if (movieUpdateNeeded) {
        console.log('Updating movie:', updatedMovieData);
        let result;
        try {
          result = await contextUpdateMovie(selectedMovie.id, updatedMovieData);
          console.log('Movie update result:', result);
        } catch (updateError) {
          console.warn('Movie update encountered an error:', updateError);
          result = selectedMovie;
        }

        if (!result) {
          console.error('No movie data available after update');
          result = selectedMovie;
        }

        console.log('Attempting to refresh movies for user:', user.id);
        const refreshedMovies = await getUserMovies(user.id);
        console.log('Refreshed movies:', refreshedMovies);

        setMovies([...refreshedMovies]);

        const updatedMovieInList = refreshedMovies.find(movie => movie.id === result.id);
        if (updatedMovieInList) {
          try {
            const fullMovieDetails = await handleMovieClick(updatedMovieInList.id);
            if (fullMovieDetails) {
              setSelectedMovie(fullMovieDetails);
              console.log('Updated selected movie:', fullMovieDetails);
            }
          } catch (error) {
            console.error('Error re-fetching movie details:', error);
            setSelectedMovie(updatedMovieInList);
          }
        }
      }

      if (videoUpdateNeeded) {
        console.log('Attempting to update video:', {
          movieId: selectedMovie.id,
          videoData: updatedVideo,
          videoDataStringified: JSON.stringify(updatedVideo, null, 2)
        });
        await updateVideos({
          movieId: selectedMovie.id, 
          videoData: updatedVideo, 
          editedVideoName: editedVideoName.trim(),
          user: user,
          accessToken: accessToken
        });
        console.log('Video update successful');
      }

      setIsEditing(false);
      setSelectedMovie(null); 
      setTimeout(() => {
        const updatedMovieInList = movies.find(movie => movie.id === selectedMovie.id);
        if (updatedMovieInList) {
          handleMovieClick(updatedMovieInList.id); 
        }
      }, 300); 
    } catch (error) {
      console.error('Unexpected error in handleEditMovie:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="movies-loading">
        <p>Loading your movie collection...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movies-error">
        <p>Error: {error}</p>
        <p>Please try refreshing the page or logging in again.</p>
      </div>
    );
  }

  return (
    <div 
      className="movies-container" 
      style={{
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none'
      }}
    >
      {selectedMovie ? (
        <div 
          className="movies-details-content"
          style={{
            overflowY: 'auto',
            height: '100%',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <div className="movies-details-card">
            <div className="movies-details-header">
              {isEditing ? (
                <input 
                  type="text"
                  id="edit-movie-title"
                  className="movies-edit-title-input"
                  value={editedTitle}
                  onChange={handleTitleChange}
                  placeholder="Enter movie title"
                />
              ) : (
                <h2>{selectedMovie.title || selectedMovie.name || 'No Title'}</h2>
              )}
              <div className="movies-edit-actions">
                <button 
                  className="movies-details-close" 
                  onClick={() => setSelectedMovie(null)}
                >
                  ×
                </button>
              </div>
            </div>
            
            <img 
              className="movies-details-poster"
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
            
            <p className="movies-details-description">
              {isEditing ? (
                <textarea
                  id="edit-movie-overview"
                  className="movies-edit-overview-input"
                  value={editedOverview}
                  onChange={handleOverviewChange}
                  placeholder="Enter a detailed overview of the movie"
                  rows="6"
                />
              ) : (
                selectedMovie.overview || selectedMovie.description || 'No description available'
              )}
            </p>
            
            <div className="movies-details-sections">
              <div className="movies-details-additional-info">
                <div className="movies-details-info-grid">
                  <div className="movies-details-info-item">
                    <h4>Popularity</h4>
                    {isEditing ? (
                      <input
                        type="number"
                        id="edit-movie-popularity"
                        className="movies-edit-popularity-input"
                        value={editedPopularity}
                        onChange={handlePopularityChange}
                        placeholder="Enter popularity"
                        step="0.01"
                        min="0"
                      />
                    ) : (
                      <p>{selectedMovie.popularity ? selectedMovie.popularity.toFixed(2) : 'N/A'}</p>
                    )}
                  </div>
                  <div className="movies-details-info-item">
                    <h4>Release Date</h4>
                    {isEditing ? (
                      <input
                        type="date"
                        id="edit-movie-release-date"
                        className="movies-edit-release-date-input"
                        value={editedReleaseDate}
                        onChange={handleReleaseDateChange}
                      />
                    ) : (
                      <p>{selectedMovie.releaseDate ? new Date(selectedMovie.releaseDate).toLocaleDateString() : 'N/A'}</p>
                    )}
                  </div>
                  <div className="movies-details-info-item">
                    <h4>Date Created</h4>
                    <p>
                      {selectedMovie.createdAt 
                        ? new Date(selectedMovie.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : 'N/A'}
                    </p>
                  </div>
                  <div className="movies-details-info-item">
                    <h4>Date Updated</h4>
                    <p>
                      {selectedMovie.updatedAt 
                        ? new Date(selectedMovie.updatedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="movies-details-media">
                <div className="movies-media-header">
                  <h3>Videos</h3>
                  {}
                </div>
                {selectedMovie.videos && selectedMovie.videos.length > 0 ? (
                  <div className="movies-video-carousel">
                    {selectedMovie.videos.length > 1 && (
                      <button 
                        className="movies-video-nav-btn prev-video-btn"
                        onClick={() => {
                          const currentIndex = selectedMovie.videos.findIndex(v => v.id === currentVideo.id);
                          const prevIndex = currentIndex > 0 ? currentIndex - 1 : selectedMovie.videos.length - 1;
                          setCurrentVideo(selectedMovie.videos[prevIndex]);
                        }}
                      >
                        ◀
                      </button>
                    )}
                    
                    <div className="movies-media-grid">
                      {currentVideo && currentVideo.url ? (
                        <div key={currentVideo.id} className="movies-media-item movies-video-container">
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
                          {isEditing ? (
                            <div className="movies-video-edit-controls">
                              <input 
                                type="text" 
                                className="movies-video-name-input"
                                value={editedVideoName}
                                onChange={handleVideoNameChange}
                                placeholder="Enter video name"
                              />
                              <button 
                                className="movies-video-remove-btn"
                                id={`remove-video-${currentVideo.id}`}
                                onClick={() => handleRemoveVideo(currentVideo.id)}
                              >
                                Remove Video
                              </button>
                            </div>
                          ) : (
                            <p>{currentVideo.name || 'Video'}</p>
                          )}
                        </div>
                      ) : (
                        <p>No valid video available</p>
                      )}
                    </div>
                    
                    {selectedMovie.videos.length > 1 && (
                      <button 
                        className="movies-video-nav-btn next-video-btn"
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

              <div className="movies-details-photos">
                <div className="movies-photos-header">
                  <h3>Photos</h3>
                  {}
                </div>
                <div className="movies-photos-grid">
                  {selectedMovie.photos && selectedMovie.photos.length > 0 ? (
                    selectedMovie.photos.map(photo => (
                      <div key={photo.id} className="movies-photo-item">
                        <img 
                          src={`https://image.tmdb.org/t/p/w500${photo.url}`} 
                          alt={photo.description || 'Movie Photo'} 
                          onError={(e) => { e.target.src = '/placeholder.png'; }}
                        />
                        {isEditing && (
                          <button 
                            className="movies-photo-remove-btn"
                            id={`remove-photo-${photo.id}`}
                            onClick={() => handleRemovePhoto(photo.id)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No photos available</p>
                  )}
                </div>
              </div>

              <div className="movies-details-cast">
                <div className="movies-cast-header">
                  <h3>Cast</h3>
                </div>
                <div className="movies-cast-grid">
                  {selectedMovie.casts && selectedMovie.casts.length > 0 ? (
                    selectedMovie.casts.map((actor, index) => (
                      <div key={actor.id} className="movies-cast-member">
                        <div className="movies-cast-member-image-container">
                          <img 
                            src={actor.url ? `https://image.tmdb.org/t/p/w500${actor.url}` : '/placeholder.png'} 
                            alt={actor.name || 'Actor'} 
                            onError={(e) => { e.target.src = '/placeholder.png'; }}
                          />
                          {isEditing && (
                            <button 
                              className="movies-cast-remove-btn"
                              id={`remove-cast-${actor.id}`}
                              onClick={() => handleRemoveCast(actor.id)}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        {isEditing ? (
                          <div className="movies-cast-edit-controls">
                            <input 
                              type="text" 
                              className="movies-cast-name-input"
                              value={actor.name || ''}
                              onChange={(e) => handleCastNameChange(index, e.target.value)}
                              placeholder="Actor Name"
                            />
                            <input 
                              type="text" 
                              className="movies-cast-character-input"
                              value={actor.characterName || ''}
                              onChange={(e) => handleCharacterNameChange(index, e.target.value)}
                              placeholder="Character Name"
                            />
                          </div>
                        ) : (
                          <>
                            <p>
                              {actor.name || 'Unknown Actor'}
                            </p>
                            <p>
                              {actor.characterName || ''}
                            </p>
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No cast information available</p>
                  )}
                </div>
              </div>

              <div className="movies-actions">
                {!isEditing && (
                  <button 
                    id="edit-movie-btn"
                    className="movies-action-btn movies-edit-btn"
                    onClick={() => {
                      setIsEditing(true);
                    }}
                  >
                    Edit Movie
                  </button>
                )}
                {isEditing && (
                  <button 
                    id="save-edit-btn"
                    className="movies-action-btn movies-save-btn"
                    onClick={handleEditMovie}
                  >
                    Done Edit
                  </button>
                )}
                {isEditing && (
                  <button 
                    id="delete-movie-btn"
                    className="movies-action-btn movies-delete-btn"
                    onClick={handleDeleteMovie}
                  >
                    Delete Movie
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="movies-content">
          <h1>My Movies</h1>
          {movies.length === 0 ? (
            <div className="movies-empty">
              <p>No movies found. Start by searching and adding movies!</p>
            </div>
          ) : (
            <div className="movies-grid">
              {movies.map(movie => {
                return (
                  <div 
                    key={movie.id} 
                    className="movie-card" 
                    onClick={() => handleMovieClick(movie.id)}
                  >
                    <div className="movie-card-image">
                      <img 
                        src={movie.posterPath ? `https://image.tmdb.org/t/p/w500${movie.posterPath}` : '/placeholder.png'} 
                        alt={movie.title} 
                        onError={(e) => { e.target.src = '/placeholder.png'; }}
                      />
                    </div>
                    <div className="movie-card-details">
                      <h3>{movie.title}</h3>
                      <p>
                        {(() => {
                          const year = 
                            movie.releaseYear || 
                            movie.year || 
                            (movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'Year Unknown');
                          
                          return year;
                        })()}
                      </p>
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

const MoviesWithProvider = () => {
  return (
    <DeleteMovieProvider>
      <DeleteCastProvider>
        <DeletePhotosProvider>
          <DeleteVideosProvider>
            <UpdateVideosProvider>
              <UpdateCastsProvider>
                <Movies />
              </UpdateCastsProvider>
            </UpdateVideosProvider>
          </DeleteVideosProvider>
        </DeletePhotosProvider>
      </DeleteCastProvider>
    </DeleteMovieProvider>
  );
};

export default MoviesWithProvider;