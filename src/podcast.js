//Libraries & Components
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

//Extended Components
import PodcastDetail from './podcast_detail';

// Helpers
import { getEpisodes, getPodcast } from './podcastAPI'

export default function Podcast({setLoading}) {
  const navigate = useNavigate();
  const [details, setDetails] = useState(false);
  const [episodes, setEpisodes] = useState(false);
  const { podcastId } = useParams();

  // Handle Click from Podcast
  const handleClick = (episodeId) => navigate('/podcast/'+podcastId+'/episode/'+episodeId);

  useEffect( () => {
    return () => {
      setLoading(true);
    }
  }, [setLoading]);
  
  useEffect(() => {
    getPodcast(podcastId, (data)=>{
      getEpisodes(podcastId, (episodes)=>{
        setDetails(data);
        setEpisodes(episodes);
        setLoading(false);
      });
    });
  }, [podcastId, setLoading]);

  if(episodes !== false){
    console.log(episodes);
    console.log(details);
    return (
    <Grid spacing={2} container className="podcastsDetail">
      <Grid item xl={3} lg={4} md={6} xs={12}>
        <PodcastDetail details={details} />
      </Grid>
      <Grid item xl={9} lg={8} md={6} xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" color="text.primary">
              Episodes: {episodes.length}
            </Typography>
          </CardContent>
        </Card>
        <br/>
        <Card>
          <CardContent>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">date</TableCell>
                  <TableCell align="center">Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {episodes.map(item => {
                  let id = item.trackId,
                    title = item.trackName,
                    date = item.releaseDate,
                    duration = item.releaseDate;
                    return(
                      <TableRow 
                        key={id} onClick={()=>handleClick(id)}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center" component="th" scope="row">{title}</TableCell>
                        <TableCell align="center">{date}</TableCell>
                        <TableCell align="center">{duration}</TableCell>
                      </TableRow>);
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    );
  }
}