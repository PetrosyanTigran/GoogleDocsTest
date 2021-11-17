import { EDIT_HTML_FIELD } from '../actionTypes';

export const editHTMLText = (html: string) => {
  return {
    type: EDIT_HTML_FIELD,
    payload: html,
  };
};
