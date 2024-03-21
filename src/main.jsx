import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import store from './app/store.js';
import Home from './routes/Home.jsx';
import MovieDetails from './routes/MovieDetails';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TvDetails from './routes/TvDetails.jsx';
import Movies from './routes/Movies.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, //Layout component
    children: [
      { path: '/', element: <Home /> },
      { path: 'movie', element: <Movies /> },      { path: '/movie/:movieId', element: <MovieDetails /> },
      { path: '/tv/:tvId', element: <TvDetails /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
