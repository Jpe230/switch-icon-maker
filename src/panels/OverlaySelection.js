import { Button } from '@mui/joy';
import * as React from 'react';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';
import { useDispatch } from 'react-redux'

export default function OverlaySelection() {

  const dispatch = useDispatch();
  
  const handleClick = (v) => {
    dispatch.overlay.set(v);
    dispatch.panel.next();
  };

  return (
    <Grid container spacing={2}  alignItems="stretch">
      <Grid xs={12}>
      <Typography level="h2" sx={{ textAlign: 'center' }} >
        Select an overlay
      </Typography>
      </Grid>
      <Grid xs={4}>
        <Button
          onClick={() => handleClick("http://localhost:3000/overlay.png")}
          variant="outlined"
          sx={{
            width: '100%'
          }}>
          <img alt="overlay" src='http://localhost:3000/overlay.png' style={{ margin: 'auto', width: 150 }} />
        </Button>
      </Grid>
      <Grid xs={4}>
        <Button
          onClick={() => handleClick("http://localhost:3000/overlay.png")}
          variant="outlined"
          sx={{
            width: '100%'
          }}>
          <img alt="overlay" src='http://localhost:3000/overlay.png' style={{ margin: 'auto', width: 150 }} />
        </Button>
      </Grid>
      <Grid xs={4}>
        <Button
          onClick={() => handleClick("")}
          variant="outlined"
          sx={{
            width: '100%',
            height: '100%'
          }}>
          No overlay
        </Button>
      </Grid>
    </Grid>

  );

}
