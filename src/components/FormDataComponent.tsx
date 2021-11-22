import { FC, ChangeEvent, useMemo } from 'react';
import {
  Card,
  Box,
  TextField,
  Button,
  IconButton,
  FormControlLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  updateBaseField,
  removeField,
  updateComplexFieldTypeText,
  createTableColumn,
  removeTableColumn,
  createTextOption,
  updateComplexFieldTypeTable,
} from '../redux/actions';
import { useAppDispatch } from '../redux/hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import { StyledSwitch } from './StyledComponents/StyledSwitch';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelectFormType } from '../hooks/useSelectFormType';
import { ColumnType } from '../types';
import { updateFormData } from '../redux/actions/formData';

const useStyles = makeStyles({
  root: {
    borderRadius: '8px',
    padding: '32px',
    marginBottom: '1.3rem',
    width: '684px',
    background: '#FFFFFF',
    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.02)',
  },
  flex: {
    display: 'flex',
    justifyContent: 'center',
  },
  flexStart: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  numberBox: {
    width: '36px',
    height: '36px',
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
    color: '#5C5C5C',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeBox: {
    height: '36px',
    borderRadius: '4px',
    border: 'none',
    padding: '12px, 12px, 12px, 8px',
    backgroundColor: '#f5f5f5',
    color: '#5C5C5C',
    '&:hover': {
      borderColor: '1px solid #E2E2E2',
      boxShadow: '1px solid #E2E2E2',
      border: '1px solid #E2E2E2',
    },
    '&:active': {
      backgroundColor: 'white',
      borderColor: '1px solid #E2E2E2',
      border: '1px solid #E2E2E2',
      boxShadow: '1px solid #E2E2E2',
    },
    '&:focus': {
      backgroundColor: 'white',
      borderColor: '1px solid #E2E2E2',
      boxShadow: '1px solid #E2E2E2',
      border: '1px solid #E2E2E2',
    },
  },
});

type ArgsType = {
  options: string[];
  columns: {
    col_title: string;
    col_type: string;
  }[];
};

export type FormDataComponentProps = {
  title: string;
  type: string;
  css_selector: string;
  required: boolean;
  index?: number;
  additional?: false;
  args: ArgsType;
  name: string;
  title_error?: string;
};

export const FormDataComponent: FC<FormDataComponentProps> = ({
  type,
  required,
  css_selector,
  index,
  additional,
  title,
  args,
  title_error,
}) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { selectFormTypes } = useSelectFormType();
  const colTytleTypes = useMemo(
    () => [{ name: 'Выберете тип', icon: '', type: '' }, ...selectFormTypes],
    []
  );

  return (
    <Card className={classes.root}>
      <Box
        sx={{
          margin: '0 0 12px 0',
        }}
        className={classes.flexBetween}
      >
        <Box className={classes.flex}>
          <Box className={classes.numberBox}>{index! + 1}</Box>
          <Box sx={{ ml: 1 }}>
            <Select
              value={type}
              IconComponent={() => null}
              className={classes.typeBox}
              onChange={(e: SelectChangeEvent) =>
                dispatch(
                  updateFormData(css_selector, {
                    type: e.target.value as string,
                    title: '',
                    required: true,
                  })
                )
              }
            >
              {selectFormTypes.map(({ icon, name, type }) => (
                <MenuItem value={type} key={type}>
                  <Box
                    className={classes.flexBetween}
                    sx={{
                      alignItems: 'center',
                    }}
                  >
                    {icon}
                    {name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <Box className={classes.flex} sx={{ ml: 'auto' }}>
          <FormControlLabel
            control={
              <StyledSwitch
                value={required}
                onChange={() =>
                  dispatch(
                    updateBaseField(css_selector, {
                      title,
                      type,
                      required: !required,
                    })
                  )
                }
              />
            }
            label="Не обязательно"
          />

          <IconButton onClick={() => dispatch(removeField(css_selector))}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <TextField
        type="string"
        fullWidth
        error={!!title_error}
        label="Название пункта"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          dispatch(
            updateBaseField(css_selector, {
              title: e.target.value,
              type,
              required,
            })
          )
        }
      />
      {type === 'text_options' ? (
        <>
          <Box
            className={classes.flexStart}
            sx={{
              margin: '10px 0',
            }}
          >
            <Typography variant="subtitle1">Выпадающий список</Typography>
            <StyledSwitch
              value={additional!}
              onChange={() =>
                dispatch(
                  updateComplexFieldTypeText(css_selector, {
                    additional: !additional,
                    title,
                    required,
                    type,
                    args: {
                      options: [],
                    },
                  })
                )
              }
            />
          </Box>
          {additional && args.options.length > 0
            ? args.options.map((el: string, idx: number) => (
                <Box sx={{ marginBottom: '1rem' }} key={idx}>
                  <TextField
                    fullWidth
                    label="Вариант"
                    value={el}
                    error={!el}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      dispatch(
                        updateComplexFieldTypeText(css_selector, {
                          additional,
                          required,
                          title,
                          type,
                          args: {
                            options: args?.options!.map(
                              (el: string, index: number) =>
                                index === idx ? e.target.value : el
                            ),
                          },
                        })
                      )
                    }
                  />
                </Box>
              ))
            : null}
          {additional && (
            <Button
              startIcon={<AddIcon />}
              onClick={() => dispatch(createTextOption(css_selector))}
            >
              Добавить вариант
            </Button>
          )}
        </>
      ) : null}
      {type === 'table' ? (
        <>
          <Box className={classes.flexStart}>
            <Typography variant="subtitle1">Количество столбцов</Typography>
            <IconButton
              onClick={() => dispatch(createTableColumn(css_selector))}
            >
              <AddIcon />
            </IconButton>
            <span>{args?.columns?.length!}</span>
            <IconButton
              onClick={() => dispatch(removeTableColumn(css_selector))}
            >
              <RemoveIcon />
            </IconButton>
          </Box>
          {args.columns && args.columns.length > 0
            ? args.columns.map((el: ColumnType, idx: number) => {
                return (
                  <Box className={classes.flexStart} sx={{ mb: 1.5 }} key={idx}>
                    <span className={classes.numberBox}>{idx + 1}</span>
                    <Box sx={{ ml: 1 }}>
                      <TextField
                        value={el.col_title}
                        placeholder="Название столбца"
                        variant="standard"
                        error={!!el.col_title_error!}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          dispatch(
                            updateComplexFieldTypeTable(css_selector, {
                              type,
                              required,
                              title,
                              args: {
                                columns: args.columns?.map(
                                  (el: ColumnType, index: number) =>
                                    index === idx
                                      ? {
                                          ...el,
                                          col_title: e.target.value,
                                        }
                                      : el
                                ),
                              },
                            })
                          )
                        }
                      />
                    </Box>
                    <Box sx={{ ml: 'auto' }}>
                      <Select
                        className={classes.typeBox}
                        inputProps={{ 'aria-label': 'Without label' }}
                        IconComponent={() => null}
                        value={el.col_type}
                        displayEmpty
                        onChange={(e: SelectChangeEvent) =>
                          dispatch(
                            updateComplexFieldTypeTable(css_selector, {
                              type,
                              required,
                              title,
                              args: {
                                columns: args.columns?.map(
                                  (el: ColumnType, index: number) =>
                                    index === idx
                                      ? {
                                          ...el,
                                          col_type: e.target.value as string,
                                        }
                                      : el
                                ),
                              },
                            })
                          )
                        }
                      >
                        {colTytleTypes.map(({ icon, name, type }) => (
                          <MenuItem value={type} key={type}>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              {icon}
                              {name}
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  </Box>
                );
              })
            : null}
        </>
      ) : null}
    </Card>
  );
};
