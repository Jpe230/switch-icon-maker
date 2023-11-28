import * as React from 'react';
import { useState } from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import { useSelector } from 'react-redux'

import Container from '@mui/joy/Container';
import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';
import IconButton from '@mui/joy/IconButton';

import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

import appTheme from './theme';

import StepIndicator from './components/StepIndicator';
import PanelContainer from './components/PanelContainer';

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="lg"
      variant="soft"
      color="neutral"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
      sx={{
        position: 'fixed',
        zIndex: 999,
        top: '1rem',
        right: '1rem',
        borderRadius: '50%',
        boxShadow: 'sm',
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function App() {
  return (
    <CssVarsProvider disableTransitionOnChange theme={appTheme}>
      <CssBaseline />
      
      <Box sx={{
        position: 'fixed',
        zIndex: 100,
        top: 0,
        right: 0,
        left: 0,
        maxWidth: '1200px',
        margin: 'auto'
      }}>
        <StepIndicator/>
      </Box>

      <Container sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch'
      }}>
        <Box sx={{
          display: 'flex',
          flexGrow: '1',
        }}>
          <PanelContainer />
        </Box>
      </Container>
    </CssVarsProvider>
  );
}