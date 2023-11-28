import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Grid from '@mui/joy/Grid';
import theme from '../theme';
import ImagePanel from '../components/CreatorPanel';

import { useSelector } from 'react-redux'

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

export default function TitleSelection() {

  const games = useSelector((state) => state.titles);

  const [indexView, setView] = React.useState(0);

  let onTabChange = (e, index) => {
    setView(index);
  }

  return (
    <Grid container sx={{ flexGrow: 1, paddingTop: '150px' }}>
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
              {games.map((game, i) =>

                <Tab key={`tab-${game.titleName}-${i}`} sx={{
                  flex: 'none',
                  scrollSnapAlign: 'start',
                  py: theme.spacing(1.2)
                }}>
                  {game.titleName}
                </Tab>
              )}
            </TabList>
            {games.map((game, i) =>
              <TabPanel
                keepMounted={true}
                key={`tabpanel-${game.titleName}-${i}`}
                value={i}
                sx={{
                  position: 'relative'
                }}>
                <ImagePanel game={game} isInView={indexView === i} />
              </TabPanel>
            )}
          </Tabs>
        </TabContainer>
      </Grid>
    </Grid>

  );
}