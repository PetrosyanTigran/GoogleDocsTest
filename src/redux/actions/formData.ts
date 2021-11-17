import { CREATE_FORM_DATA, UPDATE_FORM_DATA } from '../actionTypes';
import { v4 as uuidv4 } from 'uuid';
import { FormDataType } from '../../types';

export const createFormData = (type: string) => {
  return {
    type: CREATE_FORM_DATA,
    payload: {
      title: '',
      type,
      error_message: '',
      css_selector: `#${uuidv4()}`,
      required: true,
      additional: false,
    },
  };
};

export const updateFormData = (
  css_selector: string,
  changeInput: FormDataType
) => {
  return {
    type: UPDATE_FORM_DATA,
    payload: {
      css_selector,
      changeInput,
    },
  };
};
