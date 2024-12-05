import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Login from './pages/Public/Login/Login';
import Dashboard from './pages/Main/Dashboard/Dashboard';
import Main from './pages/Main/Main';
import Movie from './pages/Main/Movie/Movie';
import Lists from './pages/Main/Movie/Lists/Lists';
import Form from './pages/Main/Movie/Form/Form';
import Casts from './pages/Main/Movie/Form/Cast/Cast';
import Register from './pages/Public/Register/Register'; 


const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: 'admin/login',
    element: <Login />,
  },
  {
    path: 'admin/register',
    element: <Register />,
  },
  {
    path: '/main',
    element: <Main />,
    children: [
      {
        path: 'dashboard', 
        element: <Dashboard />,
      },
      {
        path: 'movies', 
        element: <Movie />,
        children: [
          {
            index: true, 
            element: <Lists />,
          },
          {
            path: 'form/:movieId?', 
            element: <Form />,
            children: [
              {
                path: 'cast-and-crews', 
                element: <Casts />,
              },
              {
                path: 'photos', 
                element: (
                  <h1>Change this for photos CRUD functionality component.</h1>
                ),
              },
              {
                path: 'videos', 
                element: (
                  <h1>Change this for videos CRUD functionality component.</h1>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
]);


function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
