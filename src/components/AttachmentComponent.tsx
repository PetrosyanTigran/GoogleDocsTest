import {
  Box,
  Card,
  FormControlLabel,
  TextField,
  IconButton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { StyledSwitch } from './StyledComponents/StyledSwitch';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC, ChangeEvent } from 'react';
import { useAppDispatch } from '../redux/hooks';
import {
  removeAttachment,
  updateAttachment,
} from '../redux/actions/attachmentsActions';

const useStyles = makeStyles({
  root: {
    borderRadius: '8px',
    padding: '32px',
    marginBottom: '1.3rem',
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexStart: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

type AttachmentComponentProps = {
  title: string;
  required: boolean;
  idx: number;
  name: string;
  attachment_error_text?: string;
};
export const AttachmentComponent: FC<AttachmentComponentProps> = ({
  title,
  required,
  idx,
  attachment_error_text,
}) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  return (
    <Card className={classes.root}>
      <Box className={classes.flex}>
        <span>Вложение</span>
        <Box>
          <FormControlLabel
            control={
              <StyledSwitch
                value={required}
                onChange={() =>
                  dispatch(
                    updateAttachment(idx, {
                      required: !required,
                      title,
                    })
                  )
                }
              />
            }
            label="Не обязательно"
          />

          <IconButton onClick={() => dispatch(removeAttachment(idx))}>
            <DeleteIcon color="action" />
          </IconButton>
        </Box>
      </Box>
      <TextField
        type="text"
        fullWidth
        value={title}
        error={!!attachment_error_text!}
        placeholder="Название вложения"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          dispatch(
            updateAttachment(idx, {
              required,
              title: e.target.value,
            })
          )
        }
      />
    </Card>
  );
};
