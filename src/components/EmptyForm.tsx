import { Card, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import no_point from "./assets/icons/no_point.svg"


export const EmptyForm = () => {
  return (
    <Card id="empty_form">
      <img src={no_point} style={{marginRight: "10px"}} alt=""/>
      <Typography color="primary"  variant="h4">
        Нет ни одного пункта
      </Typography>
    </Card>
  );
};
