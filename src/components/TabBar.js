import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Colors } from '../constants/Colors';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function TabBar({ itemOptions, size, textSize, linkItems }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(itemOptions[0]);

  const handleChange = (_event, itemSelected) => {
    const link = linkItems[itemOptions.indexOf(itemSelected)];
    if (linkItems) {
      navigate(link, { replace: true });
    }
    itemSelected !== null && setSelected(itemSelected);
  };

  useEffect(() => {
    linkItems && setSelected(itemOptions[linkItems.indexOf(location.pathname)]);
  }, [location.pathname, linkItems, itemOptions]);

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
