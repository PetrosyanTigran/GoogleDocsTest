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
import "../scss/FormPanel.scss"
import { makeStyles, styled } from '@mui/styles';
import { editTemplateText } from '../redux/actions';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { createAttachment } from '../redux/actions/attachmentsActions';
import { EditIcons } from './EditIcons';



export const FormPanel: FC<{}> = () => {
  const template_name = useAppSelector(
    (state: RootState) => state.formReducer?.template_name
  );
  const dispatch = useAppDispatch();


  return (
    <Card  id="form_panel">
      <CardContent
      id="form_panel_content_1"
      >
        <Typography variant="h3">
          Конструктор шаблонов
        </Typography>
        <Button
          color="primary"
          variant="contained"
          form="my_form"
          type="submit"
          value="Submit"
          // style={{width: "141px"}}
        >
          <Typography variant="button" style={{fontSize: "13px", }}>Сохранить</Typography>
        </Button>
      </CardContent>
      <CardActions sx={{ padding: '1rem' }}>
        <TextField
        size="small"
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
      <CardContent id="form_panel_content_2" >
        <EditIcons />
        <Button
         id="styled_attachment_button"
          startIcon={<AttachmentIcon />}
          variant="outlined"
          onClick={() => dispatch(createAttachment())}
          sx={{ ml: 'auto' }}
        >
          <Typography variant="subtitle2">Поле для вложений</Typography>
        </Button>
      </CardContent>
    </Card>
  );
};
