import { FC, ChangeEvent } from 'react';
import AttachmentIcon from '@mui/icons-material/Attachment';
import {
  Typography,
  Button,
  TextField,
  Theme,
  Card,
  CardActions,
  CardContent,
} from '@mui/material';

import { makeStyles, styled } from '@mui/styles';
import { editTemplateText } from '../redux/actions';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { createAttachment } from '../redux/actions/attachmentsActions';
import { EditIcons } from './EditIcons';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '860px',
    height: '264px',
    borderRadius: '8px',
    padding: '16px 0 0 0',
  },
  typography: {
    width: '623px',
    height: '42px',
  },
}));

const StyledAttachmentButton = styled(Button)({
  color: '#5C5C5C',
  backgroundColor: 'white',
  border: '1px solid #E2E2E2',
  boxSizing: 'border-box',
  borderRadius: '4px',
  '&:hover': {
    borderColor: '1px solid #E2E2E2',
    boxShadow: '1px solid #E2E2E2',
    border: '1px solid #E2E2E2',
  },
  '&:active': {
    backgroundColor: 'white',
    borderColor: '1px solid #E2E2E2',
    boxShadow: '1px solid #E2E2E2',
  },
  '&:focus': {
    backgroundColor: 'white',
    borderColor: '1px solid #E2E2E2',
    boxShadow: '1px solid #E2E2E2',
  },
});

const StyledConfirmButton = styled(Button)({
  width: '141px',
  height: '50px',
  padding: '13px 24px',
  borderRadius: '6px',
});

export const FormPanel: FC<{}> = () => {
  const template_name = useAppSelector(
    (state: RootState) => state.formReducer?.template_name
  );
  const dispatch = useAppDispatch();

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h1" className={classes.typography}>
          Конструктор шаблонов
        </Typography>
        <StyledConfirmButton
          color="primary"
          variant="contained"
          form="my_form"
          type="submit"
          value="Submit"
        >
          <Typography variant="button">Сохранить</Typography>
        </StyledConfirmButton>
      </CardContent>
      <CardActions sx={{ padding: '1rem' }}>
        <TextField
          type="text"
          variant="outlined"
          fullWidth
          label="Название шаблона"
          value={template_name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch(editTemplateText(e.target.value))
          }
          inputProps={{ style: { fontWeight: 500 } }}
          InputLabelProps={{ style: { fontWeight: 500 } }}
        />
      </CardActions>
      <CardContent sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <EditIcons />
        <StyledAttachmentButton
          startIcon={<AttachmentIcon />}
          variant="outlined"
          color="primary"
          onClick={() => dispatch(createAttachment())}
          sx={{ ml: 'auto' }}
        >
          <Typography variant="subtitle2">Поле для вложений</Typography>
        </StyledAttachmentButton>
      </CardContent>
    </Card>
  );
};
