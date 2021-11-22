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
import { AnyAction } from 'redux';
import { AttachmentsFormDataType, ColumnType, FormDataType } from '../../types';
import { ERROR_MESSAGE } from '../../constants';

const initialState = {
  template_name: '',
  project: 1,
  html_body: '<hmtl></html>',
  form_data: [],
  attachments: [],
  template_name_error: '',
} as any;

export const formReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CREATE_FORM_DATA: {
      const { title, type, css_selector, required, additional, title_error } =
        action.payload;
      if (type === 'table') {
        return {
          ...state,

          form_data: [
            ...state.form_data,
            {
              title,
              type,
              title_error,
              css_selector,
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
              title_error,
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
              title_error,
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
      const { col_title, col_type, css_selector, col_title_error } =
        action.payload;

      return {
        ...state,
        form_data: [
          ...state.form_data.map((el: FormDataType) =>
            el.css_selector === css_selector
              ? {
                  ...el,
                  args: {
                    columns: [
                      ...el?.args?.columns!,
                      { col_title, col_type, col_title_error },
                    ],
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
      const { title, required, attachment_error_text } = action.payload;
      return {
        ...state,
        attachments: [
          ...state.attachments,
          { title, required, attachment_error_text },
        ],
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
        attachments: state.attachments.map(
          (el: AttachmentsFormDataType, index: number) =>
            index === idx
              ? {
                  ...el,
                  title,
                  required,
                }
              : el
        ),
      };
    }

    /********************* ERROR_MESSAGE *******************/

    case SET_TEMPLATE_NAME_ERROR_MESSAGE: {
      return {
        ...state,
        template_name_error: ERROR_MESSAGE,
      };
    }

    case CLEAR_TEMPLATE_NAME_ERROR_MESSAGE: {
      return {
        ...state,
        template_name_error: '',
      };
    }

    case SET_TITLE_ERROR_MESSAGE: {
      const { cssSelector } = action.payload;
      return {
        ...state,
        form_data: state.form_data.map((el: FormDataType) =>
          el.css_selector === cssSelector
            ? {
                ...el,
                title_error: ERROR_MESSAGE,
              }
            : el
        ),
      };
    }

    case CLEAR_TITLE_ERROR_MESSAGE: {
      const { cssSelector } = action.payload;
      return {
        ...state,
        form_data: state.form_data.map((el: FormDataType) =>
          el.css_selector === cssSelector
            ? {
                ...el,
                title_error: '',
              }
            : el
        ),
      };
    }

    case SET_COL_TITLE_ERROR_MESSAGE: {
      const { cssSelector, idx } = action.payload;
      return {
        ...state,
        form_data: state.form_data.map((el: FormDataType) => {
          if (el.css_selector === cssSelector) {
            return {
              ...el,
              args: {
                columns: el?.args?.columns!.map(
                  (el: ColumnType, index: number) =>
                    index === idx
                      ? {
                          ...el,
                          col_title_error: ERROR_MESSAGE,
                        }
                      : el
                ),
              },
            };
          } else return el;
        }),
      };
    }

    case CLEAR_COL_TITLE_ERROR_MESSAGE: {
      const { cssSelector, idx } = action.payload;
      return {
        ...state,
        form_data: state.form_data.map((el: FormDataType) => {
          if (el.css_selector === cssSelector) {
            return {
              ...el,
              args: {
                columns: el?.args?.columns!.map(
                  (el: ColumnType, index: number) =>
                    index === idx
                      ? {
                          ...el,
                          col_title_error: '',
                        }
                      : el
                ),
              },
            };
          } else return el;
        }),
      };
    }

    // case SET_TEXT_OPTIONS_ERROR_MESSAGE: {
    //   const { cssSelector, idx } = action.payload;
    //   return {
    //     ...state,
    //     form_data: state.form_data.map((el: FormDataType) => {
    //       if (el.type === 'text_options') {
    //         if (el.css_selector === cssSelector) {
    //           return {
    //             ...el,
    //             args: {
    //               options: el.args?.options?.map(
    //                 (el: string, index: number) => idx === index
    //               ),
    //             },
    //           };
    //         }
    //       }
    //     }),
    //   };
    // }

    case SET_ATTACHMENT_ERROR_TEXT: {
      const { idx } = action.payload;
      return {
        ...state,
        attachments: state.attachments.map(
          (el: AttachmentsFormDataType, index: number) =>
            idx === index
              ? {
                  ...el,
                  attachment_error_text: ERROR_MESSAGE,
                }
              : el
        ),
      };
    }

    case CLEAR_ATTACHMENT_ERROR_TEXT: {
      const { idx } = action.payload;
      return {
        ...state,
        attachments: state.attachments.map(
          (el: AttachmentsFormDataType, index: number) =>
            idx === index
              ? {
                  ...el,
                  attachment_error_text: '',
                }
              : el
        ),
      };
    }

    default:
      return state;
  }
};
