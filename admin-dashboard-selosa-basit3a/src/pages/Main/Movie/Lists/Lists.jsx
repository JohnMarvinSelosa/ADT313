import { useNavigate } from 'react-router-dom';
import './Lists.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import the icons
// import { AuthContext } from '../../../context/context'; // Corrected import


const Lists = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  
  const [lists, setLists] = useState([]);

  const getMovies = () => {
    // Get the movies from the API or database
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
          const tempLists = [...lists];
          const index = lists.findIndex((movie) => movie.id === id);
          if (index !== undefined || index !== -1) {
            tempLists.splice(index, 1);
            setLists(tempLists);
          }
        });
    }
  };

  return (
    <div className="lists-container">
      <div className="create-container">
        <button
          type="button"
          onClick={() => {
            navigate('/main/movies/form');
          }}
          className="action-button"
        >
          Create New
        </button>
      </div>
      <div className="table-container">
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
                    type="button"
                    style={{ width: '30%' }}
                    onClick={() => {
                      navigate('/main/movies/form/' + movie.id);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} style={{ marginRight: '8px' }} /> Edit
                  </button>
                  <button
                    className="delete-button"
                    type="button"
                    style={{ width: '30%' }}
                    onClick={() => handleDelete(movie.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} style={{ marginRight: '8px' }} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lists;
