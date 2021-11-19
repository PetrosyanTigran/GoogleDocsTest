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
import "./../scss/TamplateEditor.scss"
import calendar_today from "../components/assets/icons/calendar_today.svg"
import text from "../components/assets/icons/text.svg"
import person from "../components/assets/icons/person.svg"
import pen from "../components/assets/icons/pen.svg"
import map from "../components/assets/icons/map.svg"
import table from "../components/assets/icons/table.svg"
import time from "../components/assets/icons/time.svg"
import date_and_time from "../components/assets/icons/date_and_time.svg"
import { width } from '@mui/system';
export const FormIcons = () => {
  const dispatch = useAppDispatch();

  return (
    <Box  id="form_icons">
      <Box className="justify_start">
        <Button
        className="form_icon"
          variant="outlined"
          fullWidth
          size="small"
          startIcon={<img src={calendar_today} alt=""/>}
          onClick={() => dispatch(createFormData('date'))}
        >
          Дата
        </Button>

        <Button
        className="form_icon"
          variant="outlined"
          fullWidth
          size="small"
          startIcon={<img src={text} alt=""/>}
          onClick={() => dispatch(createFormData('text_options'))}
        >
          Текст
        </Button>

        <Button
        className="form_icon"
          variant="outlined"
          fullWidth
          size="small"
          startIcon={<img src={person} alt=""/>}
          onClick={() => dispatch(createFormData('user'))}
        >
          Сотрудник
        </Button>

        <Button
        className="form_icon"
          variant="outlined"
          fullWidth
          size="small"
          startIcon={<img src={pen} alt=""/>}

          onClick={() => dispatch(createFormData('signer'))}
        >
          Подписант
        </Button>
      </Box>
      <Box className="justify_start">
        <Button
        className="form_icon"
          variant="outlined"
          fullWidth
          size="small"
          startIcon={<img src={map} style={{width: "12px"}} alt=""/>}
          

          onClick={() => dispatch(createFormData('location'))}
        >
          Место
        </Button>

        <Button
        className="form_icon"
          variant="outlined"
          fullWidth
          size="small"
          startIcon={<img src={table} alt=""/>}

          onClick={() => dispatch(createFormData('table'))}
        >
          Таблица
        </Button>

        <Button
        className="form_icon"
          variant="outlined"
          fullWidth
          size="small"
          startIcon={<img src={time} alt=""/>}

          onClick={() => dispatch(createFormData('time'))}
        >
          Время
        </Button>

        <Button
        className="form_icon"
          variant="outlined"
          fullWidth
          size="small"
          startIcon={<div> <img src={date_and_time} alt=""/> <img src={time} style={{position: "absolute", width: "12px", top: "16px", left: "14px", }} alt=""/> </div>}

          onClick={() => dispatch(createFormData('datetime'))}
        >
          Дата и время
        </Button>
      </Box>
    </Box>
  );
};
