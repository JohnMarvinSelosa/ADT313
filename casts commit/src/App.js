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
import ErrorBoundary from './components/ErrorBoundary';
import RouteError from './pages/Error/RouteError';
import { AuthProvider } from './context/context';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <RouteError />
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <RouteError />
  },
  {
    path: 'admin/login',
    element: <Login />,
    errorElement: <RouteError />
  },
  {
    path: 'admin/register',
    element: <Register />,
    errorElement: <RouteError />
  },
  {
    path: '/main',
    element: <Main />,
    errorElement: <RouteError />,
    children: [
      {
        path: 'dashboard', 
        element: <Dashboard />,
        errorElement: <RouteError />
      },
      {
        path: 'movies', 
        element: <Movie />,
        errorElement: <RouteError />,
        children: [
          {
            index: true, 
            element: <Lists />,
            errorElement: <RouteError />
          },
          {
            path: 'form/:movieId?', 
            element: <Form />,
            errorElement: <RouteError />,
            children: [
              {
                path: 'cast-and-crews', 
                element: <Casts />,
                errorElement: <RouteError />
              },
              {
                path: 'photos', 
                element: (
                  <h1>Change this for photos CRUD functionality component.</h1>
                ),
                errorElement: <RouteError />
              },
              {
                path: 'videos', 
                element: (
                  <h1>Change this for videos CRUD functionality component.</h1>
                ),
                errorElement: <RouteError />
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
    <ErrorBoundary>
      <AuthProvider>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
