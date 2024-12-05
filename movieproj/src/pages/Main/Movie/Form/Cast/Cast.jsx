import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { AuthContext } from '../../../../../context/context';
import axios from 'axios';
import './Cast.css';
import { useParams } from 'react-router-dom';
import NoCastImage from '../../Form/Cast/NO CAST.jpg'; 

function Casts() {
  const { auth } = useContext(AuthContext);
  const [query, setQuery] = useState('');
  const [cast, setCast] = useState([]);
  const [castid, setCastId] = useState(undefined);
  const [selectedcast, setSelectedCast] = useState({});
  const [notfound, setNotFound] = useState(false);
  const [isSaving, setIsSaving] = useState(false); 
  const nameRef = useRef();
  const characterNameRef = useRef();
  const urlRef = useRef();
  const searchRef = useRef();
  const { movieId } = useParams();

  const getAll = useCallback((movie_id) => {
    axios({
      method: 'get',
      url: `/movies/${movie_id}`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${auth.accessToken}`,
      },
    })
      .then((response) => setCast(response.data.casts))
      .catch((error) => console.error('Error fetching Casts:', error));
  }, [auth.accessToken]);

  useEffect(() => {
    getAll(movieId);
  }, [movieId, getAll]);

  const handleSearchPerson = useCallback(async (page = 1) => {
    if (!query.trim()) {
      searchRef.current.style.border = '2px solid red';
      setTimeout(() => (searchRef.current.style.border = ''), 2000);
      return;
    }

    setNotFound(true);

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/person`,
        {
          params: { query, page, include_adult: false, language: 'en-US' },
          headers: {
            Authorization: 'Bearer <Your_TMDB_API_Token>',
          },
        }
      );

      const results = response.data.results;
      if (results.length === 0) {
        console.log('No results found');
        setSelectedCast({});
      } else {
        setSelectedCast(results[0]);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setNotFound(false);
    }
  }, [query]);

  const handlesave = async () => {
    if (isSaving) return;
    setIsSaving(true);

    if (!characterNameRef.current.value.trim()) {
      characterNameRef.current.style.border = '2px solid red';
      setTimeout(() => (characterNameRef.current.style.border = ''), 2000);
      setIsSaving(false);
      return;
    }

    try {
      const datacast = {
        userId: auth.user.userId,
        movieId,
        name: selectedcast?.name || '',
        url: `https://image.tmdb.org/t/p/original/${selectedcast?.profile_path || ''}`,
        characterName: characterNameRef.current.value.trim(),
      };

      await axios.post('/admin/casts', datacast, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });

      alert('Cast added successfully!');
      setSelectedCast({});
      setQuery('');
      getAll(movieId);
    } catch (error) {
      alert('Error saving cast.');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleclear = () => {
    setSelectedCast({});
    setCastId(undefined);
    setQuery('');
  };

  const handledelete = async (id) => {
    const isConfirm = window.confirm('Are you sure you want to delete this cast?');
    if (!isConfirm) return;

    try {
      await axios.delete(`/admin/casts/${id}`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });

      alert('Cast deleted successfully!');
      getAll(movieId);
    } catch (error) {
      console.error('Error deleting cast:', error);
    }
  };

  return (
    <div className="cast-box">
      <div className="Cast-View-Box">
        {cast.length > 0 ? (
          <div className="card-display-cast">
            <div className="card-wrapper">
              {cast.map((actor) => (
                <div key={actor.id} className="card">
                  <div className="buttons-group">
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => handledelete(actor.id)}
                    >
                      Delete
                    </button>
                  </div>
                  <img src={actor.url} alt={actor.name} className="image-casts" />
                  <div className="container">
                    <h4><b>{actor.name}</b></h4>
                    <p>{actor.characterName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="no-cast">
            <h3>No Cast Found</h3>
          </div>
        )}
      </div>

      <div className="Search-Box">
        <div className="search-box-btn">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cast name"
            ref={searchRef}
            className="input-search-person"
          />
          <button
            className="button-search"
            type="button"
            onClick={() => handleSearchPerson(1)}
            disabled={notfound}
          >
            {notfound ? 'Searching...' : 'Search'}
          </button>
          <button
            className="save-button"
            type="button"
            onClick={handlesave}
            disabled={isSaving || !selectedcast.name}
          >
            {isSaving ? 'Saving...' : 'Add Cast'}
          </button>
        </div>
        <div className="cast-detail-box">
          <div className="image-container-center">
            <img
              alt="cast"
              src={
                selectedcast?.profile_path
                  ? `https://image.tmdb.org/t/p/original/${selectedcast.profile_path}`
                  : NoCastImage
              }
              className="img-cast"
            />
          </div>
          <div className="info-text">
            <label>Character Name:</label>
            <input
              ref={characterNameRef}
              className="character-name"
              value={selectedcast.characterName || ''}
              onChange={(e) => setSelectedCast({ ...selectedcast, characterName: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Casts;
