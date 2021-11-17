import { EDIT_TEMPLATE_TEXT } from '../actionTypes';

export const editTemplateText = (text: string) => {
  return {
    type: EDIT_TEMPLATE_TEXT,
    payload: text,
  };
};
