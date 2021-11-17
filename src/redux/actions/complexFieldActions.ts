import {
  UPDATE_COMPLEX_FIELD_TEXT,
  UPDATE_COMPLEX_FIELD_TABLE,
  CREATE_TABLE_COLUMN,
  REMOVE_TABLE_COLUMN,
  CREATE_TEXT_OPTION,
} from '../actionTypes';

/************************* TEXT **************************/

export const updateComplexFieldTypeText = (
  css_selector: string,
  changeInput: {
    title?: string;
    type?: string;
    required?: boolean;
    additional: boolean;
    args?: {
      options?: string[];
    };
  }
) => {
  return {
    type: UPDATE_COMPLEX_FIELD_TEXT,
    payload: {
      css_selector,
      changeInput,
    },
  };
};

export const createTextOption = (css_selector: string) => {
  return {
    type: CREATE_TEXT_OPTION,
    payload: {
      css_selector,
    },
  };
};

/************************* TABLE *****************************************/

export const updateComplexFieldTypeTable = (
  css_selector: string,
  changeInput: {
    title?: string;
    type?: string;
    required?: boolean;
    args?: {
      columns?: {
        col_title?: string;
        col_type?: string;
      }[];
    };
  }
) => {
  return {
    type: UPDATE_COMPLEX_FIELD_TABLE,
    payload: {
      css_selector,
      changeInput,
    },
  };
};

export const createTableColumn = (css_selector: string) => {
  return {
    type: CREATE_TABLE_COLUMN,
    payload: {
      css_selector,
      col_title: '',
      col_type: '',
    },
  };
};

export const removeTableColumn = (css_selector: string) => {
  return {
    type: REMOVE_TABLE_COLUMN,
    payload: {
      css_selector,
    },
  };
};
