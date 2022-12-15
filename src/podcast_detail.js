//Libraries & Components
import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function PodcastDetail({details}) {
  return (
    <Card>
    <CardActionArea>
      <CardMedia
        component="img"
        image={details['im:image'][2].label}
        alt={details.title}
        style={{margin: '2rem auto', width: 'auto'}}
      />
      <CardContent>
        <Typography variant="button" color="text.primary">
          {details.title.label}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         by {details['im:artist'].label}
        </Typography>
        <hr/>
        <Typography gutterBottom variant="h6" component="div">
          Description:
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {details.summary.label}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
  );
}