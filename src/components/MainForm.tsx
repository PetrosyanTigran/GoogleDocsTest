import { EmptyForm } from './EmptyForm';
import { FC, FormEvent } from 'react';
import { RootState } from '../redux/store';
import { useAppSelector } from '../redux/hooks';
import { FormDataComponent, FormDataComponentProps } from './FormDataComponent';
import { AttachmentComponent } from './AttachmentComponent';
import { AttachmentsFormDataType } from '../types';

export const MainForm: FC = () => {
  const state = useAppSelector((state: RootState) => state.formReducer);

  if (state.form_data!.length === 0 && state.attachments.length === 0)
    return <EmptyForm />;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <form id="my_form" onSubmit={handleSubmit}>
      {state.form_data &&
        state.form_data.length > 0 &&
        state.form_data.map((el: FormDataComponentProps, idx: number) => {
          return (
            <FormDataComponent
              title={el.title}
              type={el.type}
              required={el.required}
              css_selector={el.css_selector}
              key={el.css_selector}
              index={idx}
              additional={el.additional}
              args={el.args}
              name={el.title}
            />
          );
        })}
      {state.attachments &&
        state.attachments.length > 0 &&
        state.attachments.map((el: AttachmentsFormDataType, idx: number) => {
          return (
            <AttachmentComponent
              title={el.title}
              required={el.required}
              key={idx}
              idx={idx}
              name={el.title}
            />
          );
        })}
    </form>
  );
};
