import { Avatar, IconButton, Toolbar, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { Defaults } from '../constants/Defaults';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import tmsLogo from '../assets/images/tms-topbar-logo.png';
import { deepPurple } from '@mui/material/colors';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${Defaults.DRAWER_WIDTH}px)`,
    marginLeft: `${Defaults.DRAWER_WIDTH}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
function TopNav({ open, handleDrawerOpen }) {
  return (
    <AppBar color="secondary" position="fixed" open={open}>
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <ChevronRightIcon />
        </IconButton>
        <img alt="tmsLogo" src={tmsLogo} />
        <span style={{ flex: 1 }}></span>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>JD</Avatar>
        <span style={{ margin: '0 15px' }}>
          <Typography variant="body" component="span" gutterBottom>
            John Doe
          </Typography>
        </span>
      </Toolbar>
    </AppBar>
  );
}
export default TopNav;
