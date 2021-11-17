import { useMemo } from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import PersonIcon from '@mui/icons-material/Person';
import CreateIcon from '@mui/icons-material/Create';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TableViewIcon from '@mui/icons-material/TableView';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';

export const useSelectFormType = () => {
  const selectFormTypes = useMemo(
    () => [
      { name: 'Текст', type: 'text_options', icon: <TextFieldsIcon /> },
      { name: 'Дата', type: 'date', icon: <CalendarTodayIcon /> },
      { name: 'Время', type: 'time', icon: <AccessTimeIcon /> },
      { name: 'Дата и время', type: 'datetime', icon: <EventIcon /> },
      { name: 'Место', type: 'location', icon: <LocationOnIcon /> },
      { name: 'Сотрудник', type: 'user', icon: <PersonIcon /> },
      { name: 'Подписант', type: 'signer', icon: <CreateIcon /> },
      { name: 'Таблица', type: 'table', icon: <TableViewIcon /> },
    ],
    []
  );

  return {
    selectFormTypes,
  };
};
