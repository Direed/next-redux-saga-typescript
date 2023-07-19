import { Form, Input } from 'antd';
import { TField } from 'components/Form/Form';

const { TextArea } = Input;

export const FormTextArea = ({
  name,
  label,
  rules,
  placeholder,
}: TField) => (
  <Form.Item
    name={name}
    label={label}
    rules={rules}
  >
    <TextArea
      autoSize
      maxLength={500}
      placeholder={placeholder}
      style={{ width: '100%' }}
    />
  </Form.Item>
);