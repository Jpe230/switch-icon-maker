import * as React from 'react';
import { useRef, useEffect } from 'react';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Box from '@mui/joy/Box';
import Slider from '@mui/joy/Slider';
import Typography from '@mui/joy/Typography';
import theme from '../theme';
import IconCanvas from './canvas/IconCanvas';
import OverlayCanvas from './canvas/OverlayCanvas';

const ImageContainer = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
  ...theme.typography['body-sm'],
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  padding: theme.spacing(1)
}));

const containerStyle = {
  height: '100%',
  aspectRatio: '2/3',
  margin: 'auto',
  position: 'relative'
};

const canvasStyle = {
  position: 'absolute',
  height: ' 100%',
  width: '100%',
  left: 0,
  top: 0,
};

export default function ImagePanel({ game }) {
  return (
    <ImageContainer>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: 0,
          height: '100%',
        }}
      >
        <Typography level="title-md" sx={{ textAlign: 'center' }}>
          Title: {game}
        </Typography>
        <Typography level="body-sm" sx={{ textAlign: 'center' }}>
          Id: 123123
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexGrow: '1',
            position: 'relative',
            padding: theme.spacing(1)
          }}
        >
          <div style={{ ...containerStyle }}>
            <OverlayCanvas zIndex={2}/>
            <IconCanvas zIndex={1} />
          </div>

        </Box>

        <Slider />
        <Slider />
        <Slider />
      </Box>
    </ImageContainer>
  );
}