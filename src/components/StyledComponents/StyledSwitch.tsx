import styled from '@emotion/styled';
import { SwitchProps, Switch, ThemeOptions } from '@mui/material';

export const StyledSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))((theme: ThemeOptions) => ({
  width: 42,
  height: 26,
  margin: '0 10px',
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor:
          theme?.palette?.mode! === 'dark' ? '#1A65DA' : '#2872E5',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#175AC3',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme?.palette?.mode! === 'light'
          ? theme?.palette?.grey![100]
          : theme?.palette?.grey![600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme?.palette?.mode! === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme?.palette?.mode === 'light' ? '#E9E9EA' : '#E2E2E2',
    opacity: 1,
    transition: theme?.transitions?.create!(['background-color'], {
      duration: 500,
    }),
  },
}));
