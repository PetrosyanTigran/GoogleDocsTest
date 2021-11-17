import { Card, CardContent, Theme } from '@mui/material';
import { DraftEditor } from './DraftEditor';
import { makeStyles } from '@mui/styles';
import { FormIcons } from './FormIcons';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: 'center',
    padding: '32px',
    marginTop: '35px',
    position: 'static',
    width: '860px',
    minHeight: '650px',
    left: '0px',
    top: '280px',
    background: '#FFFFFF',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: ' 4px',
  },
}));

export const TemplateEditor = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <DraftEditor />
      </CardContent>
      <FormIcons />
    </Card>
  );
};
