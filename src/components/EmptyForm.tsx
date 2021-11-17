import { Card, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    padding: '32px',
    position: 'relative',
    width: '684px',
    height: '88px',
    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.02)',
    borderRadius: '8px',
  },
  center: {
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    '-ms-transform': 'translate(-50%, -50%)',
    transform: ' translate(-50%, -50%)',
  },
});

export const EmptyForm = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Typography color="primary" className={classes.center} variant="h2">
        Нет ни одного пункта
      </Typography>
    </Card>
  );
};
