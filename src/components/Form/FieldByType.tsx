import { FormInstance } from 'rc-field-form/lib/interface';

import { FormInput, FormPhoneInput, FormTextArea } from 'components/FormComponents';
import { TField } from './Form';

export const FieldByType = ({ field, form }: { form: FormInstance; field: TField }) => {
  switch(field.type) {
    case 'text':
      return (
        <FormInput
          formInstance={form}
          name={field.name}
          label={field.label}
          rules={field.rules}
          placeholder={field.placeholder}
          tooltip={field.tooltip}
        />
      );
    case 'textArea':
      return (
        <FormTextArea
          formInstance={form}
          name={field.name}
          label={field.label}
          rules={field.rules}
          placeholder={field.placeholder}
          tooltip={field.tooltip}
        />
      );
    case 'phone':
      return (
        <FormPhoneInput
          formInstance={form}
          name={field.name}
          label={field.label}
          rules={field.rules}
          codeName={field.codeName}
          tooltip={field.tooltip}
        />
      );
    default: return null;
  }
};