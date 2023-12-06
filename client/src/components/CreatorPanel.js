import { useState } from 'react';

import ImageSelectionModal from './modal/ImageSelectionModal';

import IconCanvas from './canvas/IconCanvas';
import OverlayCanvas from './canvas/OverlayCanvas';

import OpenInNew from '@mui/icons-material/OpenInNewRounded';

import { Typography, Slider, Button, Sheet, Stack, Grid, Box } from '@mui/joy';
import { styled } from '@mui/joy/styles';

import theme from '../theme';

const IconCreator = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
  ...theme.typography['body-sm'],
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}));

const containerStyle = {
  height: '100%',
  aspectRatio: '2/3',
  margin: 'auto',
  position: 'relative'
};


export default function CreatorPanel({ game, isInView, exportIcons }) {

  const [zoomState, setZoom] = useState(100);

  const [xRange, setXRange] = useState(0);
  const [yRange, setYRange] = useState(0);
  const [yState, setY] = useState(0);
  const [xState, setX] = useState(0);

  const [open, setOpen] = useState(false);
  const [imageUrl, setImage] = useState();

  const onCloseModal = (event, reason) => {
    if (reason && reason === "backdropClick")
      return;
    setOpen(false)
  };

  const handleZoomChange = (event, newValue) => {
    setZoom(newValue);
  };

  const handleXChange = (event, newValue) => {
    setX(newValue);
  };

  const handleYChange = (event, newValue) => {
    setY(newValue);
  };

  const handleImageChange = (newValue) => {
    setOpen(false);
    setImage(newValue);
    setX(0);
    setY(0);
    setZoom(100);
  }

  const setRange = (x, y) => {
    setXRange(x);
    setYRange(y);
  }

  return (
    <IconCreator>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: 0,
          height: '100%',
          padding: theme.spacing(1)
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={2}>
          </Grid>
          <Grid xs={8}>
            <Typography level="title-md" sx={{ textAlign: 'center' }}>
              Title: {game.titleName}
            </Typography>
            <Typography level="body-sm" sx={{ textAlign: 'center' }}>
              Id: {game.titleId}
            </Typography>
          </Grid>
          <Grid xs={2}>
            <Button onClick={exportIcons} startDecorator={<OpenInNew />}>
              Export icons
            </Button>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            flexGrow: '1',
            position: 'relative',
            padding: theme.spacing(1),
            background: theme.vars.palette.background.level2,
          }}
        >
          <div style={{ ...containerStyle }}>
            <IconCanvas zIndex={1} isInView={isInView} zoom={zoomState} x={xState} y={yState} urlImage={imageUrl} canvasRef={game.bgCanvasRef} />
            <OverlayCanvas zIndex={2} isInView={isInView} cbCanvasSize={setRange} canvasRef={game.overlayCanvasRef} />
          </div>
        </Box>

        <Stack>
          <Button sx={{ padding: theme.spacing(1), margin: theme.spacing(1) }} color="neutral" onClick={() => setOpen(true)}>
            Select Image
          </Button>
          <Typography gutterBottom>
            Zoom:
          </Typography>
          <Slider valueLabelDisplay="on" value={zoomState} onChange={handleZoomChange} min={50} max={250} />
          <Typography gutterBottom>
            X Position:
          </Typography>
          <Slider valueLabelDisplay="on" value={xState} onChange={handleXChange} min={xRange / -2} max={xRange / 2} />
          <Typography gutterBottom>
            Y Position:
          </Typography>
          <Slider valueLabelDisplay="on" value={yState} onChange={handleYChange} min={yRange / -2} max={yRange / 2} />
        </Stack>
      </Box>
      <ImageSelectionModal open={open} onClose={onCloseModal} titleName={game.titleName} onImageChange={handleImageChange} />
    </IconCreator>
  );
}