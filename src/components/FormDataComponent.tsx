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
  Switch
} from '@mui/material';
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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelectFormType } from '../hooks/useSelectFormType';
import { ColumnType } from '../types';
import { updateFormData } from '../redux/actions/formData';


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
};

export const FormDataComponent: FC<FormDataComponentProps> = ({
  type,
  required,
  css_selector,
  index,
  additional,
  title,
  args,
}) => {
  const dispatch = useAppDispatch();
  const { selectFormTypes } = useSelectFormType();
  const colTytleTypes = useMemo(
    () => [{ name: 'Выберете тип', icon: '', type: '' }, ...selectFormTypes],
    []
  );

  return (
    <Card id="form_data">
      <Box
        sx={{margin: '0 0 0.75rem 0'}}
        className="align_center"
      >
        <Box className="justify_center" >
          <Box className="index_container">{index! + 1}</Box>
          <Box sx={{ ml: 1 }}>
            <Select
              value={type}
              IconComponent={() => null}
              className="type_container"
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
                    className="align_center"
                    
                  >
                    <div style={{ display: "flex", marginRight: "16.5px", alignItems: "center"}}>
                    {icon}
                    </div>
                    {name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <Box className="justify_center" sx={{ ml: 'auto' }}>
          <FormControlLabel
            control={<Switch className="styled_switch"  disableRipple  value={required}
  onChange={() =>
    dispatch(
      updateBaseField(css_selector, {
        title,
        type,
        required: !required,
      })
    )
  }/>
             
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
            className="justify_start"
            sx={{
              margin: '10px 0',
            }}
          >
            <Typography variant="subtitle1">Выпадающий список</Typography>
            <Switch
             disableRipple
            className="styled_switch"
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
          <Box className="justify_start">
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
                  <Box className="justify_start" sx={{ mb: 1.5 }} key={idx}>
                    <span className="index_container">{idx + 1}</span>
                    <Box sx={{ ml: 1 }}>
                      <TextField
                        value={el.col_title}
                        placeholder="Название столбца"
                        variant="standard"
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
                        className="type_container"
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
