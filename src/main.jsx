import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { store } from './app/store.js';
import Home from './routes/Home.jsx';
import MovieDetails from './routes/MovieDetails';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TvDetails from './routes/TvDetails.jsx';
import Movies from './routes/Movies.jsx';
import TvShows from './routes/TvShows.jsx';
import Login from './routes/Login.jsx';
import Signup from './routes/Signup.jsx';
import Watchlist from './routes/Watchlist.jsx';
// import Search from './routes/Search.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, //Layout component
    children: [
      { path: '/', element: <Home /> },
      { path: '/movie', element: <Movies /> },
      { path: '/tv', element: <TvShows /> },
      { path: '/movie/:movieId', element: <MovieDetails /> },
      { path: '/tv/:tvId', element: <TvDetails /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/watchlist', element: <Watchlist /> },
      // { path: '/search', element: <Search /> },
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
