//Libraries & Components
import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

//Styles
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

//Extended Components
import Home from './home';
import Podcast from './podcast';
import Episode from './episode';
import Error404 from './404';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Container maxWidth="lg">
      <Grid spacing={2} container justifyContent={"space-between"} alignItems="flex-end" className="podcastsList">
        <Grid item><Link to="/">Podcaster</Link></Grid>
        <Grid item><CircularProgress size={28} disableShrink style={{display: loading ? 'block' : 'none'}} /></Grid>
      </Grid>
      <hr/>
      <Routes>
        <Route index element={<Home setLoading={setLoading} />} />
        <Route path="/podcast/:podcastId" element={<Podcast setLoading={setLoading} />} />
        <Route path="/podcast/:podcastId/episode/:episodeId" element={<Episode setLoading={setLoading} />} />
        <Route path="*" element={<Error404 setLoading={setLoading} />} />
      </Routes>
    </Container>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>
);