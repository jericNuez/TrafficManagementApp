import { Box, CssBaseline } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useState } from 'react';
import SideBar from '../components/Sidebar';
import TabBar from '../components/TabBar';
import { Defaults } from '../constants/Defaults';
import List from './list/List';
import Map from './map/Map';
import TopNav from './TopNav';
import { Route, Routes } from 'react-router-dom';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${Defaults.DRAWER_WIDTH}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const tabItems = ['Map', 'List', 'Grid', 'Evaluation'];

function MainContent() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopNav open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideBar
        theme={theme}
        open={open}
        handleDrawerClose={handleDrawerClose}
      />
      <Main open={open}>
        <DrawerHeader />
        <div style={Styles.tabBar}>
          <TabBar itemOptions={tabItems} />
        </div>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </Main>
    </Box>
  );
}

const Styles = {
  tabBar: {
    position: 'absolute',
    top: '64px',
    right: 0,
    zIndex: 401,
    backgroundColor: 'white',
    margin: 16,
    borderRadius: '4px',
  },
};

export default MainContent;
