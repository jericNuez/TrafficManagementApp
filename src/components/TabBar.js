import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Colors } from '../constants/Colors';
import { useState } from 'react';

function TabBar({ itemOptions, size, textSize }) {
  const [selected, setSelected] = useState(itemOptions[0]);

  const handleChange = (event, newAlignment) => {
    setSelected(newAlignment);
  };

  return (
    <ToggleButtonGroup
      size={size}
      sx={{
        '& .Mui-selected': {
          color: `${Colors.secondary} !important`,
          backgroundColor: `${Colors.primary} !important`,
        },
      }}
      value={selected}
      exclusive
      onChange={handleChange}
    >
      {itemOptions.map((value, index) => {
        const itemKey = index;
        return (
          <ToggleButton sx={{ fontSize: textSize }} key={itemKey} value={value}>
            {value}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
}

export default TabBar;
