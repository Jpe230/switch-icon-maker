import { useEffect, useState } from 'react';

import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import { DarkModeRounded, LightModeRounded } from '@mui/icons-material';
import { Container, Box, CssBaseline, IconButton } from '@mui/joy';

import StepIndicator from './components/StepIndicator';
import PanelContainer from './components/PanelContainer';

import appTheme from './theme';

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
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
      {mode === 'light' ? <DarkModeRounded /> : <LightModeRounded />}
    </IconButton>
  );
}

export default function App() {
  return (
    <CssVarsProvider disableTransitionOnChange theme={appTheme}>
      <CssBaseline />
      <ColorSchemeToggle />
      <Box sx={{
        position: 'fixed',
        zIndex: 100,
        top: 0,
        right: 0,
        left: 0,
        maxWidth: '1200px',
        margin: 'auto'
      }}>
        <StepIndicator />
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