import { Form, Input, Select } from 'antd';
//@ts-ignore there is no package with types
import { getCountries, getCountryCallingCode, isValidPhoneNumber } from 'react-phone-number-input/input';

import { useMemoState } from 'hooks';
import { formatPhoneNumber } from 'utils';

import { TField } from 'components/Form/Form';

const { Option } = Select;

export const FormPhoneInput = ({
  formInstance,
  name,
  codeName,
  label,
  rules = [],
}: TField) => {
  const { prefix } = formInstance?.getFieldsValue();

  const [phone, setPhone] = useMemoState('');
  const [prefixValue, setPrefixValue] = useMemoState(prefix);

  const onChangePhone = ({ target }: React.ChangeEvent<HTMLInputElement>) => setPhone(target.value);
  const onChangePrefix = (value: string) => setPrefixValue(value);

  const checkConfirm = () => {
    const phoneNum = formatPhoneNumber(`${prefix}${phone}`);

    if (phoneNum && phone && !isValidPhoneNumber(phoneNum)) {
      return Promise.reject(new Error('Phone number is incorrect!'));
    }

    return Promise.resolve();
  };

  const prefixSelector = (
    <Form.Item noStyle name={codeName}>
      <Select
        showSearch
        filterOption={(input, option) => String(option?.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}
        style={{ width: 130 }}
        onChange={onChangePrefix}
        value={prefixValue}
      >
        {getCountries().map((country: string) => (
          <Option
            key={country}
            value={`${country} +${getCountryCallingCode(country)}`}
          >
            {country} +{getCountryCallingCode(country)}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[...rules, { validator: checkConfirm }]}
    >
      <Input
        value={phone}
        onChange={onChangePhone}
        addonBefore={prefixSelector}
        style={{ width: '100%' }}
      />
    </Form.Item>
  );
};