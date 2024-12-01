import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Login from './pages/Public/Login/Login';
import Dashboard from './pages/Main/Dashboard/Dashboard';
import Main from './pages/Main/Main';
import Register from './pages/Public/Register/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: 'admin/login',
    element: <Login />
  },
  {
    path: 'admin/register',
    element: <Register />
  },
  {
    path: '/main',
    element: <Main />,
    children: [
      {
        path: 'dashboard', // Relative path (automatically resolves to /main/dashboard)
        element: <Dashboard />,
      },
    ],
  },
]);

// Define the App component
function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
