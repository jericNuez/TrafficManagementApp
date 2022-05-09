import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Defaults } from '../constants/Defaults';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@mui/material';
import TabBar from './TabBar';
import RangeSlider from './RangeSlider';
import CustomDatePicker from './CustomDatePicker';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const reviewStatusOptions = ['Unreviewed', 'Reviewed', 'Approved', 'Rejected'];

function SideBar({ theme, open, handleDrawerClose }) {
  return (
    <Drawer
      sx={{
        width: Defaults.DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: Defaults.DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Box sx={{ margin: '23px' }}>
        <Typography
          sx={{ fontWeight: 'bold' }}
          variant="subtitle1"
          component="div"
          gutterBotttom
        >
          Event Types
        </Typography>
        <FormGroup sx={{ alignItems: 'start' }}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            labelPlacement="start"
            label="Sidewalk"
          />
          <FormControlLabel
            control={<Checkbox />}
            labelPlacement="start"
            label="Illegal Parking"
          />
        </FormGroup>
      </Box>
      <Box sx={{ margin: '23px' }}>
        <Typography
          sx={{ fontWeight: 'bold' }}
          variant="subtitle1"
          component="div"
          gutterBotttom
        >
          Review Status
        </Typography>
        <TabBar
          size="small"
          textSize="10px"
          itemOptions={reviewStatusOptions}
        />
      </Box>
      <Box sx={{ margin: '23px' }}>
        <Typography
          sx={{ fontWeight: 'bold' }}
          variant="subtitle1"
          component="div"
          gutterBotttom
        >
          Time of Day
        </Typography>
        <RangeSlider />
      </Box>
      <Box sx={{ margin: '23px' }}>
        <Typography
          sx={{ fontWeight: 'bold' }}
          variant="subtitle1"
          component="div"
          gutterBotttom
        >
          Date Range
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CustomDatePicker label="Start Date" />
            </Grid>
            <Grid item xs={6}>
              <CustomDatePicker label="End Date" />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Drawer>
  );
}
export default SideBar;
