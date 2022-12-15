import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './home';
import Podcast from './podcast';
import Episode from './episode';
import Error404 from './404';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/podcast/:podcastId" element={<Podcast />} />
          <Route path="/podcast/:podcastId/episode/:episodeId" element={<Episode />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
  </React.StrictMode>
);
