import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

function valuetext(value) {
  return `${value}`;
}

function RangeSlider() {
  const [value, setValue] = useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Time range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}

export default RangeSlider;
