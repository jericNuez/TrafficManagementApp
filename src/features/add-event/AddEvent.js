import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
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
import { styled } from '@mui/material/styles';
import imagePlaceholder from '../../assets/images/image-placeholder.png';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Swal from 'sweetalert2';
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
import { storage } from '../../firebase';
const icon = L.icon({ iconUrl: iconMarker });

function AddEvent() {
  const [plateNumber, setPlateNumber] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('');
  const [location, setLocation] = useState([]);
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [percent, setPercent] = useState(100);
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
      imageUrl: imageUrl,
    };
    firebaseService
      .create(data)
      .then(() => {
        clearForm();
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          text: 'Successfully added new event.',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/list', { replace: true });
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
    setImage(null);
    setImageUrl(null);
  };

  const handleUpload = () => {
    if (!image) {
      alert('Please upload an image first!');
    }

    const uploadTask = storage.ref(`/images/${image.name}`).put(image);
    //initiates the firebase side uploading
    uploadTask.on(
      'state_changed',
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        const uploadPercentage = Math.round(
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100
        );
        setPercent(uploadPercentage);
        if (uploadPercentage === 100) {
          setImage(null);
          setImageUrl(null);
        }
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setImageUrl(fireBaseUrl);
          });
      }
    );
  };

  return (
    <>
      <Box
        sx={{
          padding: '20px 16px',
          position: 'absolute',
        }}
      >
        <Button
          onClick={() => navigate('/list', { replace: true })}
          variant="outlined"
        >
          Back
        </Button>
      </Box>
      <div className="form-container">
        <form
          style={{ width: '600px' }}
          onSubmit={SaveEvent}
          autoComplete="off"
        >
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontWeight: 'bold', textAlign: 'center' }}
                variant="h5"
                gutterBottom
                component="div"
                color="textColor"
              >
                ADD NEW EVENT
              </Typography>
              <Grid container rowSpacing={1} columnSpacing={1}>
                <Grid item xs={6}>
                  <Stack spacing={2}>
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
                        <MenuItem value="Illegal Parking">
                          Illegal Parking
                        </MenuItem>
                        <MenuItem value="Reckless Driving">
                          Reckless Driving
                        </MenuItem>
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
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={2}>
                    <label
                      style={{ textAlign: 'center' }}
                      htmlFor="contained-button-file"
                    >
                      <Input
                        accept="image/*"
                        id="contained-button-file"
                        type="file"
                        onChange={(e) => {
                          setImage(e.target.files[0]);
                        }}
                      />
                      <img
                        alt="imagePrev"
                        id="imagePreview"
                        style={{ width: '100%' }}
                        src={
                          image
                            ? URL.createObjectURL(image)
                            : imageUrl
                            ? imageUrl
                            : imagePlaceholder
                        }
                      />
                      {!imageUrl && 'Click Image to Browse file'}
                    </label>
                    {image && (
                      <Button
                        variant="contained"
                        color="warning"
                        disabled={percent < 100}
                        component="span"
                        onClick={handleUpload}
                      >
                        Upload
                      </Button>
                    )}
                    {percent !== 100 && (
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                      </Box>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button
                sx={{ width: '100%' }}
                disabled={!imageUrl}
                type="submit"
                variant="contained"
              >
                Save
              </Button>
            </CardActions>
          </Card>
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

const Input = styled('input')({
  display: 'none',
});

export default AddEvent;
