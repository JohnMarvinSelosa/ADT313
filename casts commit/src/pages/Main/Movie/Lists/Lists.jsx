import { useNavigate } from 'react-router-dom';
import './Lists.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Lists = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const [lists, setLists] = useState([]);

  const getMovies = () => {
    axios.get('/movies').then((response) => {
      setLists(response.data);
    });
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handleDelete = (id) => {
    const isConfirm = window.confirm('Are you sure that you want to delete this data?');
    if (isConfirm) {
      axios
        .delete(`/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          const updatedLists = lists.filter((movie) => movie.id !== id);
          setLists(updatedLists);
        })
        .catch((error) => {
          console.error('Error deleting movie:', error);
        });
    }
  };

  return (
    <div className="lists-container">
      <div className="create-container">
        <button
          type="button"
          onClick={() => navigate('/main/movies/form')}
          className="action-button"
        >
          Create New
        </button>
      </div>
      <div className="table-container">
        {lists.length > 0 ? (
          <table className="movie-lists">
            <thead>
              <tr>
                <th>No.</th>
                <th>ID</th>
                <th>Title</th>
                <th>Popularity</th>
                <th>Release Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lists.map((movie, index) => (
                <tr key={movie.id}>
                  <td>{index + 1}</td>
                  <td>{movie.id}</td>
                  <td>{movie.title}</td>
                  <td>{movie.popularity}</td>
                  <td>{movie.releaseDate}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => navigate('/main/movies/form/' + movie.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(movie.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-data">
            <p>No movies found. Please add some!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lists;
