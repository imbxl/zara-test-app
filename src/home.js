//Libraries & Components
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// Helpers
import { getPodcasts } from './podcastAPI'

export default function Home({setLoading}) {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState("");
  const [podcasts, setPodcasts] = useState([]);
  
  // Handle change from input filter
  const handleFilter = (value) => {console.log('Filter'); setFilter(value)};
  
  // Handle Click from Podcast
  const handleClick = (id) => navigate('/podcast/'+id);

  useEffect( () => {
    return () => {
      setLoading(true);
    }
  }, [setLoading]);
  
  useEffect(() => {
    getPodcasts(filter, (count, data)=>{
      setCount(count);
      setPodcasts(data);
      setLoading(false);
    }, null);
  }, [filter, setLoading]);
  
  return (
    <>
      <Stack justifyContent="flex-end" alignItems="center" direction="row" spacing={2}>
        <Chip label={count} color="primary" />
        <TextField label="Filter podcasts..." size="small" onChange={(element)=>handleFilter(element.target.value)} />
      </Stack>
      <Grid spacing={2} container className="podcastsList">
        {podcasts.map(item => {
          let id = item.id.attributes['im:id'],
            title = item.title.label,
            author = item['im:artist'].label,
            img = item['im:image'][2].label;
            
          return(<Grid item xl={3} lg={4} md={6} xs={12} key={id}><Card>
            <CardActionArea onClick={()=>handleClick(id)}>
              <CardMedia
                component="img"
                height="60"
                image={img}
                alt={title}
              />
              <CardContent>
                <Typography variant="subtitle2" component="div">
                {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Author: {author}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card></Grid>);
        })}
      </Grid>
    </>
  );
}