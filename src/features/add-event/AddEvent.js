import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddEvent.css';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import L from 'leaflet';
import firebaseService from '../../services/firebase/firebase-service';
const icon = L.icon({ iconUrl: iconMarker });

function AddEvent() {
  const [plateNumber, setPlateNumber] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('');
  const [location, setLocation] = useState([]);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const handleChangeEventType = (event) => {
    setEventType(event.target.value);
  };
  const center = [14.487058, 121.045028];
  const [selectedLocation, setSelectedPosition] = useState(center);
  const LocationFinderDummy = () => {
    useMapEvents({
      click(e) {
        setSelectedPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  };

  const SaveEvent = (event) => {
    event.preventDefault();
    const data = {
      plateNumber: plateNumber,
      description: description,
      eventType: eventType,
      location: location,
      timeStamp: new Date().getTime(),
    };
    firebaseService
      .create(data)
      .then(() => {
        clearForm();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const clearForm = () => {
    setPlateNumber('');
    setDescription('');
    setEventType('');
    setLocation([]);
    setSelectedPosition(center);
  };

  return (
    <>
      <Box
        sx={{
          padding: '20px 16px',
          position: 'absolute',
        }}
      >
        <Button onClick={() => navigate('/list')} variant="outlined">
          Back
        </Button>
      </Box>
      <div className="form-container ">
        <form onSubmit={SaveEvent} autoComplete="off">
          <Stack spacing={2}>
            <Typography
              sx={{ fontWeight: 'bold', textAlign: 'center' }}
              variant="h5"
              gutterBottom
              component="div"
            >
              Add new event
            </Typography>

            <TextField
              id="plateNo"
              label="Plate Number"
              variant="outlined"
              value={plateNumber}
              required
              onChange={(e) => setPlateNumber(e.target.value)}
            />
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="eventTypeIdLabel">Event Type</InputLabel>
              <Select
                labelId="eventTypeId"
                id="eventTypeId"
                label="eventType"
                value={eventType}
                onChange={handleChangeEventType}
              >
                <MenuItem value="Illegal Parking">Illegal Parking</MenuItem>
                <MenuItem value="Reckless Driving">Reckless Driving</MenuItem>
                <MenuItem value="Overspeeding">Overspeeding</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="location"
              label="Location"
              variant="outlined"
              value={location}
              required
              onClick={handleOpen}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Stack>
        </form>
      </div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <div>
            <MapContainer center={center} zoom={16} scrollWheelZoom={true}>
              <LocationFinderDummy />
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={selectedLocation} icon={icon}>
                <Popup>
                  <div>{selectedLocation}</div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button sx={{ m: 1 }} onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button
              sx={{ m: 1 }}
              onClick={() => {
                setLocation(selectedLocation);
                handleClose();
              }}
              variant="contained"
            >
              Ok
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 6,
};

export default AddEvent;
