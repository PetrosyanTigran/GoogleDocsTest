export type BaseFieldType =
  | 'date'
  | 'time'
  | 'datetime'
  | 'location'
  | 'user'
  | 'signer';

export type TextFieldTypes = 'text_options';
export type TableFieldTypes = 'table';

export type AllFieldTypes = BaseFieldType | TextFieldTypes | TableFieldTypes;

export type FormDataType = {
  title: string;
  type: string;
  css_selector?: string;
  required: boolean;
  additional?: false;
  error_message?: string;
  args?: {
    columns?: {
      error_message?: string;
      col_title?: string;
      col_type?: string;
    }[];
    options?: string[];
  };
};

export type AttachmentsFormDataType = {
  title: string;
  required: boolean;
};

export type FormType = {
  template_name: string;
  errir_message?: string;
  project: number;
  html_body: string;
  form_data: FormDataType[];
  attachments: AttachmentsFormDataType[];
};

export type ColumnType = {
  col_type?: string;
  col_title?: string;
};
