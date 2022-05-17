import { Box, CssBaseline } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import TabBar from '../components/TabBar';
import { Defaults } from '../constants/Defaults';
import List from './list/List';
import Map from './map/Map';
import TopNav from './TopNav';
import { Route, Routes } from 'react-router-dom';
import Grid from './grid/Grid';
import Login from './login/Login';
import Register from './registration/Register';
import { auth } from '../firebase.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import AddEvent from './add-event/AddEvent';

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

const tabItems = ['Map', 'List', 'Grid'];
const linkItems = ['/', '/list', '/grid'];

function MainContent() {
  const [open, setOpen] = useState(false);
  const [user] = useAuthState(auth);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  return (
    <Box sx={{ display: 'flex' }}>
      {user ? (
        <>
          <CssBaseline />
          <TopNav open={open} handleDrawerOpen={handleDrawerOpen} />
          {/* <SideBar open={open} handleDrawerClose={handleDrawerClose} /> */}
          <Main open={open}>
            <DrawerHeader />
            <div style={Styles.tabBar}>
              <TabBar itemOptions={tabItems} linkItems={linkItems} />
            </div>
            <Routes>
              <Route path="*" element={<Map />} />
              <Route path="/list" exact element={<List />} />
              <Route path="/grid" exact element={<Grid />} />
              <Route path="/list/add-event" exact element={<AddEvent />} />
            </Routes>
          </Main>
        </>
      ) : (
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="/sign-up" exact element={<Register />} />
        </Routes>
      )}
    </Box>
  );
}

const Styles = {
  tabBar: {
    position: 'fixed',
    top: '64px',
    right: 0,
    zIndex: 401,
    backgroundColor: 'white',
    margin: 16,
    borderRadius: '4px',
  },
};

export default MainContent;
