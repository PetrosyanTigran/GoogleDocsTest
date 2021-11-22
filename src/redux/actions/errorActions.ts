import {
  SET_TEMPLATE_NAME_ERROR_MESSAGE,
  CLEAR_TEMPLATE_NAME_ERROR_MESSAGE,
  SET_TITLE_ERROR_MESSAGE,
  CLEAR_TITLE_ERROR_MESSAGE,
  SET_COL_TITLE_ERROR_MESSAGE,
  CLEAR_COL_TITLE_ERROR_MESSAGE,
  SET_TEXT_OPTIONS_ERROR_MESSAGE,
  CLEAR_TEXT_OPTIONS_ERROR_MESSAGE,
  SET_ATTACHMENT_ERROR_TEXT,
  CLEAR_ATTACHMENT_ERROR_TEXT,
} from '../actionTypes';

export const setTemplateNameErrorMessage = () => {
  return {
    type: SET_TEMPLATE_NAME_ERROR_MESSAGE,
  };
};

export const clearTemplateNameErrorMessage = () => {
  return {
    type: CLEAR_TEMPLATE_NAME_ERROR_MESSAGE,
  };
};

export const setFormDataErrorMessage = (cssSelector: string) => {
  return {
    type: SET_TITLE_ERROR_MESSAGE,
    payload: {
      cssSelector,
    },
  };
};

export const clearFormDataErrorMessage = (cssSelector: string) => {
  return {
    type: CLEAR_TITLE_ERROR_MESSAGE,
    payload: {
      cssSelector,
    },
  };
};

export const setColTitleErrorMessage = (cssSelector: string, idx: number) => {
  return {
    type: SET_COL_TITLE_ERROR_MESSAGE,
    payload: {
      cssSelector,
      idx,
    },
  };
};

export const clearColTitleErrorMessage = (cssSelector: string, idx: number) => {
  return {
    type: CLEAR_COL_TITLE_ERROR_MESSAGE,
    payload: {
      cssSelector,
      idx,
    },
  };
};

export const setTextOptionsErrorMessage = (
  cssSelector: string,
  idx: number
) => {
  return {
    type: SET_TEXT_OPTIONS_ERROR_MESSAGE,
    payload: {
      cssSelector,
      idx,
    },
  };
};

export const clearTextOptionsErrorMessage = (
  cssSelector: string,
  idx: number
) => {
  return {
    type: CLEAR_TEXT_OPTIONS_ERROR_MESSAGE,
    payload: {
      cssSelector,
      idx,
    },
  };
};

export const setAttachmentErrorText = (idx: number) => {
  return {
    type: SET_ATTACHMENT_ERROR_TEXT,
    payload: {
      idx,
    },
  };
};

export const clearAttachmentErrorText = (idx: number) => {
  return {
    type: CLEAR_ATTACHMENT_ERROR_TEXT,
    payload: {
      idx,
    },
  };
};
