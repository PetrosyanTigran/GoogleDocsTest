import {
  FormType,
  FormDataType,
  AttachmentsFormDataType,
  ColumnType,
} from '../types';

export const clearFormFromErrors = (form: FormType) => {
  delete form.template_name_error;
  form.form_data.forEach((el: FormDataType) => {
    delete el.title_error;
    delete el.additional;
    el.args?.columns?.forEach((col: ColumnType) => {
      delete col?.col_title_error;
    });
    form.attachments.forEach((el: AttachmentsFormDataType) => {
      delete el.attachment_error_text;
    });
  });
  return form;
};
