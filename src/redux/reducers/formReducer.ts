import {
  EDIT_TEMPLATE_TEXT,
  EDIT_HTML_FIELD,
  UPDATE_BASE_FIELD,
  REMOVE_FIELD,
  UPDATE_COMPLEX_FIELD_TEXT,
  UPDATE_COMPLEX_FIELD_TABLE,
  CREATE_ATTACHMENT,
  CREATE_TABLE_COLUMN,
  REMOVE_TABLE_COLUMN,
  CREATE_TEXT_OPTION,
  REMOVE_ATTACHMENT,
  UPDATE_ATTACHMENT,
  CREATE_FORM_DATA,
  UPDATE_FORM_DATA,
} from '../actionTypes';
import { AnyAction } from 'redux';
import { FormDataType } from '../../types';

const initialState = {
  template_name: '',
  project: 1,
  html_body: '<hmtl></html>',
  form_data: [],
  attachments: [],
} as any;

export const formReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CREATE_FORM_DATA: {
      const { title, type, css_selector, required, additional, error_message } =
        action.payload;
      if (type === 'table') {
        return {
          ...state,
          form_data: [
            ...state.form_data,
            {
              title,
              type,
              css_selector,
              error_message,
              required,
              args: {
                columns: [],
              },
            },
          ],
        };
      } else if (type === 'text_options') {
        return {
          ...state,
          form_data: [
            ...state.form_data,
            {
              title,
              type,
              css_selector,
              additional,
              error_message,
              required,
              args: {
                options: [],
              },
            },
          ],
        };
      } else {
        return {
          ...state,
          form_data: [
            ...state.form_data,
            {
              title,
              type,
              css_selector,
              error_message,
              required,
            },
          ],
        };
      }
    }

    case UPDATE_FORM_DATA: {
      const { css_selector, changeInput } = action.payload;

      return {
        ...state,
        form_data: state.form_data.map((el: FormDataType) => {
          if (css_selector === el.css_selector) {
            let data = {
              ...el,
              title: changeInput.title,
              type: changeInput.type,
              required: changeInput.required,
            } as any;

            if (changeInput.type === 'table') {
              data.args = {
                columns: [],
              };
              delete data?.additional;
            } else if (changeInput.type === 'text_options') {
              data.args = {
                options: [],
              };
              data.additional = false;
            } else {
              delete data.args;
              delete data?.additional;
            }
            return data;
          } else return el;
        }),
      };
    }

    case EDIT_TEMPLATE_TEXT:
      return {
        ...state,
        template_name: action.payload,
      };

    case EDIT_HTML_FIELD: {
      return {
        ...state,
        html_body: action.payload,
      };
    }

    case UPDATE_BASE_FIELD: {
      const { css_selector, changeInput } = action.payload;

      return {
        ...state,
        form_data: state.form_data.map((el: FormDataType) =>
          el.css_selector === css_selector
            ? {
                ...el,
                title: changeInput.title,
                type: changeInput.type,
                required: changeInput.required,
              }
            : el
        ),
      };
    }

    case REMOVE_FIELD: {
      const { css_selector } = action.payload;
      return {
        ...state,
        form_data: [
          ...state.form_data.filter(
            (el: FormDataType) => el.css_selector !== css_selector
          ),
        ],
      };
    }

    /************************ Text ********************************/

    case UPDATE_COMPLEX_FIELD_TEXT: {
      const { css_selector, changeInput } = action.payload;
      return {
        ...state,
        form_data: state.form_data.map((el: FormDataType) =>
          el.css_selector === css_selector
            ? {
                ...el,
                title: changeInput.title,
                type: changeInput.type,
                required: changeInput.required,
                additional: changeInput.additional!,
                args: {
                  options: changeInput.args.options!,
                },
              }
            : el
        ),
      };
    }

    case CREATE_TEXT_OPTION: {
      const { css_selector } = action.payload;
      return {
        ...state,
        form_data: state.form_data.map((el: FormDataType) =>
          el.css_selector === css_selector
            ? {
                ...el,
                args: {
                  options: [...el?.args?.options!, ''],
                },
              }
            : el
        ),
      };
    }

    /************************** TABLE **************************************************/

    case UPDATE_COMPLEX_FIELD_TABLE: {
      const { css_selector, changeInput } = action.payload;
      return {
        ...state,
        form_data: state.form_data.map((el: FormDataType) =>
          el.css_selector === css_selector
            ? {
                ...el,
                title: changeInput.title,
                type: changeInput.type,
                required: changeInput.required,
                args: changeInput.args,
              }
            : el
        ),
      };
    }

    case CREATE_TABLE_COLUMN: {
      const { col_title, col_type, css_selector } = action.payload;

      return {
        ...state,
        form_data: [
          ...state.form_data.map((el: FormDataType) =>
            el.css_selector === css_selector
              ? {
                  ...el,
                  args: {
                    columns: [...el?.args?.columns!, { col_title, col_type }],
                  },
                }
              : el
          ),
        ],
      };
    }

    case REMOVE_TABLE_COLUMN: {
      const { css_selector } = action.payload;
      return {
        ...state,
        form_data: [
          ...state.form_data.map((el: FormDataType) =>
            el.css_selector === css_selector
              ? {
                  ...el,
                  args: {
                    columns: [...el?.args?.columns!.slice(0, -1)!],
                  },
                }
              : el
          ),
        ],
      };
    }

    /******************************** Attachment  ***********************************************/
    case CREATE_ATTACHMENT: {
      const { title, required } = action.payload;
      return {
        ...state,
        attachments: [...state.attachments, { title, required }],
      };
    }

    case REMOVE_ATTACHMENT: {
      const { idx } = action.payload;
      return {
        ...state,
        attachments: state.attachments.filter(
          (_: any, index: number) => idx !== index
        ),
      };
    }

    case UPDATE_ATTACHMENT: {
      const { title, required, idx } = action.payload;
      return {
        ...state,
        attachments: state.attachments.map((el: any, index: number) =>
          index === idx
            ? {
                title,
                required,
              }
            : el
        ),
      };
    }

    default:
      return state;
  }
};
