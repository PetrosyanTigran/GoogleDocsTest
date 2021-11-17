import { UPDATE_BASE_FIELD, REMOVE_FIELD } from '../actionTypes';

export const updateBaseField = (
  css_selector: string,
  changeInput: { title?: string; type?: string; required?: boolean }
) => {
  return {
    type: UPDATE_BASE_FIELD,
    payload: {
      css_selector,
      changeInput,
    },
  };
};

export const removeField = (css_selector: string) => {
  return {
    type: REMOVE_FIELD,
    payload: {
      css_selector,
    },
  };
};
