import { SlideProps } from '@mui/material';

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
  title_error?: string;
  type: string;
  css_selector?: string;
  required: boolean;
  additional?: false;
  args?: {
    columns?: {
      col_title_error?: string;
      col_title?: string;
      col_type?: string;
    }[];
    options?: string[];
  };
};

export type AttachmentsFormDataType = {
  attachment_error_text?: string;
  title: string;
  required: boolean;
};

export type FormType = {
  template_name: string;
  template_name_error?: '';
  project: number;
  html_body: string;
  form_data: FormDataType[];
  attachments: AttachmentsFormDataType[];
};

export type ColumnType = {
  col_type?: string;
  col_title?: string;
  col_title_error?: string;
};

export type TransitionProps = Omit<SlideProps, 'direction'>;
