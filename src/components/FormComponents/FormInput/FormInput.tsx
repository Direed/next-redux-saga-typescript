import { Form, Input } from 'antd';
import { TField } from 'components/Form/Form';

export const FormInput = ({
  name,
  label,
  rules,
  placeholder,
  tooltip,
}: TField) => (
  <Form.Item
    name={name}
    label={label}
    rules={rules}
    tooltip={tooltip}
  >
    <Input
      maxLength={100}
      placeholder={placeholder}
      style={{ width: '100%' }}
    />
  </Form.Item>
);