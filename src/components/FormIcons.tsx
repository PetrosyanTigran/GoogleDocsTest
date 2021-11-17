import { Box, Button } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import PersonIcon from '@mui/icons-material/Person';
import CreateIcon from '@mui/icons-material/Create';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TableViewIcon from '@mui/icons-material/TableView';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import { styled, makeStyles } from '@mui/styles';
import { useAppDispatch } from '../redux/hooks';
import { createFormData } from '../redux/actions/formData';

const StyledButton = styled(Button)({
  display: 'inline-flex',
  flexGrow: 0,
  flex: '1 1 auto',
  margin: '5px',
  width: 'auto',
  color: '#5C5C5C',
  borderColor: '1px solid #E2E2E2',
  border: '1px solid #E2E2E2',
  fontWeight: 'normal',
  borderRadius: '4px',
  fontSize: '14px',
  boxSizing: 'border-box',
  '&:hover': {
    borderColor: '1px solid #E2E2E2',
    border: '1px solid #E2E2E2',

    boxShadow: '#5C5C5C',
  },
  '&:active': {
    boxShadow: '#5C5C5C',
    borderColor: '1px solid #E2E2E2',
    border: '1px solid #E2E2E2',
  },
  '&:focus': {
    boxShadow: '#5C5C5C',
  },
});

const useStyles = makeStyles({
  root: {
    padding: '12px',
    position: 'absolute',
    width: '516px',
    height: '104px',
    left: '205px',
    bottom: '0px',
    background: '#FFFFFF',
    boxShadow: '0px -5px 20px rgba(0, 0, 0, 0.05)',
    borderRadius: '8px 8px 0px 0px',
    display: 'flex',
    flexDirection: 'column',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: '0 -5px',
  },
});

export const FormIcons = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.flex}>
        <StyledButton
          variant="outlined"
          fullWidth
          size="small"
          startIcon={<CalendarTodayIcon />}
          onClick={() => dispatch(createFormData('date'))}
        >
          Дата
        </StyledButton>

        <StyledButton
          variant="outlined"
          fullWidth
          size="small"
          startIcon={<TextFieldsIcon />}
          onClick={() => dispatch(createFormData('text_options'))}
        >
          Текст
        </StyledButton>

        <StyledButton
          variant="outlined"
          fullWidth
          size="small"
          startIcon={<PersonIcon />}
          onClick={() => dispatch(createFormData('user'))}
        >
          Сотрудник
        </StyledButton>

        <StyledButton
          variant="outlined"
          fullWidth
          size="small"
          startIcon={<CreateIcon />}
          onClick={() => dispatch(createFormData('signer'))}
        >
          Подписант
        </StyledButton>
      </Box>
      <Box className={classes.flex}>
        <StyledButton
          variant="outlined"
          fullWidth
          size="small"
          startIcon={<LocationOnIcon />}
          onClick={() => dispatch(createFormData('location'))}
        >
          Место
        </StyledButton>

        <StyledButton
          variant="outlined"
          fullWidth
          size="small"
          startIcon={<TableViewIcon />}
          onClick={() => dispatch(createFormData('table'))}
        >
          Таблица
        </StyledButton>

        <StyledButton
          variant="outlined"
          fullWidth
          size="small"
          startIcon={<AccessTimeIcon />}
          onClick={() => dispatch(createFormData('time'))}
        >
          Время
        </StyledButton>

        <StyledButton
          variant="outlined"
          fullWidth
          size="small"
          startIcon={<EventIcon />}
          onClick={() => dispatch(createFormData('datetime'))}
        >
          Дата и время
        </StyledButton>
      </Box>
    </Box>
  );
};
