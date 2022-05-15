import './Grid.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useEffect, useState } from 'react';
import firebaseService from '../../services/firebase/firebase-service';
import Popper from '@mui/material/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import { Paper, Stack } from '@mui/material';

function Grid() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = firebaseService.getAll().on('value', (snapshot) => {
      snapshot &&
        snapshot.forEach((data) => {
          const dataVal = data.val();
          setData((prev) => {
            return [
              ...prev,
              {
                id: data.key,
                plateNumber: dataVal.plateNumber,
                description: dataVal.description,
                eventType: dataVal.eventType,
                location: dataVal.location,
                imageUrl: dataVal.imageUrl,
                timeStamp: new Date(dataVal.timeStamp).toLocaleDateString(),
              },
            ];
          });
        });
    });
    return () => fetch();
  }, []);

  return (
    <div className="grid-container">
      <ImageList cols={4} sx={{ width: '100%' }}>
        {data.map((item) => (
          <ImageListItem key={item.id}>
            <img
              src={`${item.imageUrl}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.imageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.plateNumber}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.plateNumber}
              subtitle={item.eventType}
              actionIcon={
                <PopupState variant="popper" popupId="demo-popup-popper">
                  {(popupState) => (
                    <div>
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`info about ${item.plateNumber}`}
                        {...bindToggle(popupState)}
                      >
                        <InfoIcon />
                      </IconButton>
                      <Popper {...bindPopper(popupState)} transition>
                        {({ TransitionProps }) => (
                          <Fade {...TransitionProps} timeout={350}>
                            <Paper>
                              <Stack sx={{ p: 2 }} spacing={2}>
                                <small>
                                  <b>Plate Number: </b>: {item.plateNumber}
                                </small>
                                <small>
                                  <b>Description: </b>: {item.description}
                                </small>
                                <small>
                                  <b>Event Type: </b>: {item.eventType}
                                </small>
                              </Stack>
                            </Paper>
                          </Fade>
                        )}
                      </Popper>
                    </div>
                  )}
                </PopupState>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default Grid;
