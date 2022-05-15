import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Defaults } from '../constants/Defaults';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from '@mui/material';
import CustomDatePicker from './CustomDatePicker';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function SideBar({ open, handleDrawerClose }) {
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
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Box sx={{ margin: '23px' }}>
        <Typography
          sx={{ fontWeight: 'bold' }}
          variant="subtitle1"
          component="div"
        >
          Event Types
        </Typography>
        <FormGroup sx={{ alignItems: 'start' }}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) => (localStorage.overSpeeding = e.target.checked)}
                defaultChecked
              />
            }
            labelPlacement="start"
            label="Overspeeding"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) =>
                  (localStorage.illegalParking = e.target.checked)
                }
              />
            }
            labelPlacement="start"
            label="Illegal Parking"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(e) =>
                  (localStorage.recklessDriving = e.target.checked)
                }
              />
            }
            labelPlacement="start"
            label="Reckless Driving"
          />
        </FormGroup>
      </Box>
      <Box sx={{ margin: '23px' }}>
        <Typography
          sx={{ fontWeight: 'bold' }}
          variant="subtitle1"
          component="div"
        >
          Date Range
        </Typography>
        <Box sx={{ flexGrow: 1, mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CustomDatePicker
                onChangeValue={(value) =>
                  (localStorage.startDate = new Date(
                    value
                  ).toLocaleDateString())
                }
                label="Start Date"
              />
            </Grid>
            <Grid item xs={6}>
              <CustomDatePicker
                onChangeValue={(value) =>
                  (localStorage.endDate = new Date(value).toLocaleDateString())
                }
                label="End Date"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Drawer>
  );
}
export default SideBar;
