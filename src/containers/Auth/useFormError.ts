import { useEffect } from 'react';
import { FormInstance } from 'rc-field-form/lib/interface';

import { TError } from 'types';

export const useFormError = (
  form: FormInstance,
  fieldName: string,
  error: TError,
) => {
  useEffect(() => {
    if(error) {
      form.setFields([{
        name: fieldName,
        errors: [error?.message],
      }]);
    }

  }, [error]);
};