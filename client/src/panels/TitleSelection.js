import { useState, useEffect, createRef } from 'react';

import { Sheet, Tabs, TabList, Tab, TabPanel, Grid } from '@mui/joy';
import { styled } from '@mui/joy/styles';

import ImagePanel from '../components/CreatorPanel';

import { useDispatch, useSelector } from 'react-redux'

import theme from '../theme';

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

  const gamesStete = useSelector((state) => state.titles);
  const [games, setGames] = useState([]);
  const [indexView, setView] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (gamesStete) {
      let mGames = gamesStete.map(g => {

        let bgRef = g.bgCanvasRef ?? createRef(null);
        let overlayRef = g.overlayCanvasRef ?? createRef(null);
        return {
          ...g,
          bgCanvasRef: bgRef,
          overlayCanvasRef: overlayRef
        }

      });

      setGames([...mGames]);
    }
  }, [gamesStete]);

  const exportIcons = () => {
    games.forEach((g) => {
      let overlayCanvas = g.overlayCanvasRef.current;
      let bgCanvas = g.bgCanvasRef.current;
      let bgCtx = bgCanvas.getContext('2d');
      bgCtx.drawImage(overlayCanvas, 0, 0);
      var dataURL = bgCanvas.toDataURL("image/jpeg");
      dispatch.titles.updateDataUri(g.titleId, dataURL);
    });

    dispatch.panel.next();
  }

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
              {games && games.map((game, i) =>

                <Tab key={`tab-${game.titleName}-${i}`} sx={{
                  flex: 'none',
                  scrollSnapAlign: 'start',
                  py: theme.spacing(1.2)
                }}>
                  {game.titleName}
                </Tab>
              )}
            </TabList>
            {games && games.map((game, i) =>
              <TabPanel
                keepMounted={true}
                key={`tabpanel-${game.titleName}-${i}`}
                value={i}
                sx={{
                  position: 'relative'
                }}>
                <ImagePanel game={game} isInView={indexView === i} exportIcons={exportIcons} />
              </TabPanel>
            )}
          </Tabs>
        </TabContainer>
      </Grid>
    </Grid>

  );
}