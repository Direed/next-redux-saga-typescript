import { Form as AntdForm, FormProps, InputProps } from 'antd';
import { FieldData, Rule, FormInstance } from 'rc-field-form/lib/interface';
import { FormItemLabelProps } from 'antd/lib/form/FormItemLabel';
import { createPortal } from 'react-dom';

import usePortal from 'hooks/usePortal';

import { ToastButton } from 'components/AntdComponents';
import { FieldByType } from './FieldByType';
import { useEffect, useState } from "react";

type ICustomFieldProps = {
  name: string;
  codeName?: string;
  rules?: Rule[];
  formInstance?: FormInstance;
}

export type TField = FieldData & FormItemLabelProps & ICustomFieldProps & InputProps;

interface IForm<Values> {
  form: FormInstance;
  fields: TField[],
  loading?: boolean;
  buttonText?: string;
  buttonId?: string;
  buttonPortal?: string;
  buttonDisabled?: boolean;
  handleSubmit: (formData: Values) => void
}

interface IButton {
  buttonPortal?: string;
  buttonId?: string;
  loading?: boolean;
  buttonText?: string;
  buttonDisabled?: boolean;
  onSubmit: () => void,
}

const Button = ({buttonPortal, buttonId, loading, buttonText, buttonDisabled, onSubmit}: IButton) => {
  if (buttonPortal) {
    const target = usePortal(buttonPortal);

    return (
      createPortal(
        <ToastButton
          id={buttonId}
          type='primary'
          loading={loading}
          text={buttonText}
          margin='0 0 10px 0'
          onClick={onSubmit}
          disabled={buttonDisabled}
          block
        />,
        target,
      )
    );
  }

  return (
    <ToastButton
      id={buttonId}
      type='primary'
      loading={loading}
      text={buttonText}
      margin='0 0 10px 0'
      onClick={onSubmit}
      disabled={buttonDisabled}
      block
    />
  );
};

export const Form = <Values, >({
  form,
  name,
  handleSubmit,
  initialValues,
  validateMessages,

  fields,
  style,

  loading,
  buttonText = 'Save',
  buttonId,
  buttonPortal,
  buttonDisabled,

  children,
}: FormProps & IForm<Values>) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true)
  }, [])

  const onSubmit = async () => {
    const formData: Values = await form?.validateFields();

    handleSubmit(formData);
    form?.submit();
  };

  return (
    <AntdForm
      labelCol={{
        xs: {span: 24},
        sm: {span: 24},
      }}
      form={form}
      name={name}
      style={{
        width: '100%',
        ...style,
      }}
      labelAlign='left'
      initialValues={initialValues}
      validateMessages={validateMessages}
      scrollToFirstError
    >
      {fields.map((field: TField) => (
        <FieldByType
          key={field.name as React.Key}
          form={form}
          field={field}
        />
      ))}
      {children}

      {isReady && (
        <Button
          buttonPortal={buttonPortal}
          buttonId={buttonId}
          loading={loading}
          buttonText={buttonText}
          buttonDisabled={buttonDisabled}
          onSubmit={onSubmit}
        />
      )}
    </AntdForm>
  );
};