import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';

function Toast({ openToast, toastMessage }) {
  const [state, setState] = useState({
    open: openToast,
    vertical: 'bottom',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      key={vertical + horizontal}
    >
      <Alert severity="success">{toastMessage}</Alert>
    </Snackbar>
  );
}

export default Toast;
