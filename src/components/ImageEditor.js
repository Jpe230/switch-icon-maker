import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import theme from '../theme';
import ImagePanel from './ImagePanel';

const TabContainer = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
  ...theme.typography['body-sm'],
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}));

export default function ImageEditor() {

  let gameTitles = [
    "Homebrew Menu",
    "Tinfoil",
    "Super Mario Bros. Wonder",
    "Pokémon Violet",
    "Game Builder Garage",
    "Metroid Dread",
    "Kirby and the Forgotten Land",
    "WarioWare: Move It!",
    "The Legend of Zelda: Link's Awakening",
    "Pokémon Brilliant Diamond",
    "Metroid Prime Remastered",
    "Super Mario 64",
    "Super Mario 3D World + Bowser's Fury",
    "Völgarr the Viking",
    "Völgarr the Viking",
    "Völgarr the Viking",
    "Völgarr the Viking",
    "Völgarr the Viking",
    "Völgarr the Viking",
    "Völgarr the Viking",
    "Völgarr the Viking",
    "Völgarr the Viking",
    "Völgarr the Viking",
    "Völgarr the Viking",
    "Völgarr the Viking",
    "Völgarr the Viking",
    "Völgarr the Viking",
    "Völgarr the Viking",
    "Völgarr the Viking",
    "Völgarr the Viking",
  ];

  let onTabChange = (e, index) => {
    console.log(e);
  }

  return (
    <Grid container sx={{ flexGrow: 1 }}>
      <Grid xs={12} position={'relative'}>
        <TabContainer>
          <Tabs
            aria-label="Vertical tabs"
            orientation="vertical"
            sx={{ minWidth: 300, height: '100%' }}
            onChange={onTabChange}
            size="sm"
          >
            <TabList sx={{
              overflow: 'auto',
              scrollSnapType: 'x mandatory',
              '&::-webkit-scrollbar': { display: 'none' },
              maxWidth: 200
            }}>
              {gameTitles.map((object, i) =>
                <>
                  <Tab sx={{ flex: 'none', scrollSnapAlign: 'start', py: theme.spacing(1.2) }}>
                    {object}
                  </Tab>
                  <Divider />
                </>
              )}
            </TabList>
            {gameTitles.map((object, i) =>
              <TabPanel value={i} sx={{position: 'relative'}}>
                <ImagePanel game={object} />
              </TabPanel>
            )}
          </Tabs>
        </TabContainer>
      </Grid>
    </Grid>

  );
}