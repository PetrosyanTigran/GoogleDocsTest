import { EmptyForm } from './EmptyForm';
import { FC, FormEvent, useCallback } from 'react';
import { RootState } from '../redux/store';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { FormDataComponent, FormDataComponentProps } from './FormDataComponent';
import { AttachmentComponent } from './AttachmentComponent';
import { useSnackbar } from 'notistack';

import {
  AttachmentsFormDataType,
  ColumnType,
  FormDataType,
  FormType,
} from '../types';
import {
  setTemplateNameErrorMessage,
  clearTemplateNameErrorMessage,
  clearFormDataErrorMessage,
  setFormDataErrorMessage,
  setColTitleErrorMessage,
  clearColTitleErrorMessage,
  setAttachmentErrorText,
  clearAttachmentErrorText,
} from '../redux/actions/errorActions';

import { Button, Typography } from '@mui/material';
import { ERROR_MESSAGE } from '../constants';
import { clearFormFromErrors } from '../utils/helpers';

export const MainForm: FC = () => {
  const state = useAppSelector((state: RootState) => state.formReducer);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClick = useCallback(() => {
    enqueueSnackbar(ERROR_MESSAGE, {
      variant: 'default',
      action: (key) => (
        <>
          <Button size="small" onClick={() => closeSnackbar(key)}>
            <Typography variant="button">Понятно</Typography>
          </Button>
        </>
      ),
    });
  }, [enqueueSnackbar, closeSnackbar]);

  const validate = useCallback(
    (formToSubmit: FormType) => {
      if (formToSubmit.template_name === '') {
        dispatch(setTemplateNameErrorMessage());
      } else {
        dispatch(clearTemplateNameErrorMessage());
      }

      if (formToSubmit.form_data.length > 0) {
        formToSubmit.form_data.forEach((el: FormDataType) => {
          if (el.title === '') {
            dispatch(setFormDataErrorMessage(el.css_selector!));
          } else {
            dispatch(clearFormDataErrorMessage(el.css_selector!));
          }
        });
      }

      if (formToSubmit.form_data.length > 0) {
        formToSubmit.form_data.forEach((el: FormDataType) => {
          if (el.type === 'table') {
            el.args?.columns?.forEach((colEl: ColumnType, idx: number) => {
              if (colEl.col_title === '') {
                dispatch(setColTitleErrorMessage(el.css_selector!, idx));
              } else {
                dispatch(clearColTitleErrorMessage(el.css_selector!, idx));
              }
            });
          }
        });
      }

      if (formToSubmit.form_data.length > 0) {
        formToSubmit.form_data.forEach((el: FormDataType) => {
          if (el.type === 'text_options') {
            el.args?.options?.forEach((el: string, idx: number) => {
              if (el === '') {
              } else {
              }
            });
          }
        });
      }

      if (formToSubmit.attachments.length > 0) {
        formToSubmit.attachments.forEach(
          (el: AttachmentsFormDataType, idx: number) => {
            if (el.title === '') {
              dispatch(setAttachmentErrorText(idx));
            } else {
              dispatch(clearAttachmentErrorText(idx));
            }
          }
        );
      }

      if (
        formToSubmit.template_name === '' ||
        formToSubmit.form_data.some(
          (el: FormDataType) =>
            el.title === '' ||
            el?.args?.options?.some((el: string) => el === '') ||
            el?.args?.columns?.some((el: ColumnType) => el.col_title === '') ||
            formToSubmit.attachments.some(
              (el: AttachmentsFormDataType) => el.title === ''
            )
        )
      ) {
        return false;
      }

      return true;
    },
    [state]
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate(state)) {
      const clearedForm = clearFormFromErrors(state);
      console.log(clearedForm);
    } else {
      handleClick();
    }
  };

  if (state.form_data!.length === 0 && state.attachments.length === 0)
    return <EmptyForm />;

  return (
    <form id="my_form" onSubmit={handleSubmit}>
      {state.form_data &&
        state.form_data.length > 0 &&
        state.form_data.map((el: FormDataComponentProps, idx: number) => {
          return (
            <FormDataComponent
              title={el.title}
              type={el.type}
              required={el.required}
              css_selector={el.css_selector}
              key={el.css_selector}
              index={idx}
              additional={el.additional}
              args={el.args}
              name={el.title}
              title_error={el.title_error!}
            />
          );
        })}
      {state.attachments &&
        state.attachments.length > 0 &&
        state.attachments.map((el: AttachmentsFormDataType, idx: number) => {
          return (
            <AttachmentComponent
              title={el.title}
              required={el.required}
              key={idx}
              idx={idx}
              name={el.title}
              attachment_error_text={el?.attachment_error_text!}
            />
          );
        })}
    </form>
  );
};
