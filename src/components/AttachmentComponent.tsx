import {
  Box,
  Card,
  FormControlLabel,
  TextField,
  IconButton,
  Switch
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC, ChangeEvent } from 'react';
import { useAppDispatch } from '../redux/hooks';
import {
  removeAttachment,
  updateAttachment,
} from '../redux/actions/attachmentsActions';


type AttachmentComponentProps = {
  title: string;
  required: boolean;
  idx: number;
  name: string;
};
export const AttachmentComponent: FC<AttachmentComponentProps> = ({
  title,
  required,
  idx,
}) => {
  const dispatch = useAppDispatch();
  return (
    <Card id="attachment">
      <Box className="justify_between">
        <span>Вложение</span>
        <Box>
          <FormControlLabel
            control={
              <Switch
              disableRipple
              className="styled_switch"
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
