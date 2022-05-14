import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Colors } from '../constants/Colors';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TabBar({ itemOptions, size, textSize, linkItems }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(itemOptions[0]);

  const handleChange = (_event, itemSelected) => {
    if (linkItems) {
      const link = linkItems[itemOptions.indexOf(itemSelected)];
      navigate(link, { replace: true });
    }
    setSelected(itemSelected);
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
        return linkItems ? (
          <ToggleButton sx={{ fontSize: textSize }} key={itemKey} value={value}>
            {value}
          </ToggleButton>
        ) : (
          <ToggleButton sx={{ fontSize: textSize }} key={itemKey} value={value}>
            {value}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
}

export default TabBar;
