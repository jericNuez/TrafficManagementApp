import './List.css';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import firebaseService from '../../services/firebase/firebase-service';

const columns = [
  {
    field: 'plateNumber',
    headerName: 'Plate Number',
    width: 150,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
  },
  {
    field: 'eventType',
    headerName: 'EventType',
    width: 200,
  },
  {
    field: 'location',
    headerName: 'Location',
    width: 200,
  },
  {
    field: 'timeStamp',
    headerName: 'Date Created',
    width: 200,
  },
];

function List() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetch = firebaseService.getAll().on('value', (snapshot) => {
      snapshot &&
        snapshot.forEach((data) => {
          const dataVal = data.val();
          setRows((prev) => {
            return [
              ...prev,
              {
                id: data.key,
                plateNumber: dataVal.plateNumber,
                description: dataVal.description,
                eventType: dataVal.eventType,
                location: dataVal.location,
                timeStamp: new Date(dataVal.timeStamp).toLocaleDateString(),
              },
            ];
          });
        });
    });
    return () => fetch();
  }, []);
  return (
    <>
      <Box
        sx={{
          padding: '20px 16px',
          position: 'absolute',
        }}
      >
        <Button onClick={() => navigate('/list/add-event')} variant="outlined">
          Add new event
        </Button>
      </Box>
      <div className="list-container">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </>
  );
}

export default List;
