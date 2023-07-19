import { ArrowLeftOutlined, CloseOutlined } from '@ant-design/icons';

import { ToastButton } from 'components/AntdComponents';
import { ToastLink } from '../Typography';

interface IHeaderIcon {
  to?: string;
  text?: string;
  icon?: React.ReactNode;
  iconColor?: string;
  leftIcon?: boolean;
  leftClose?: boolean;
  onClick?: () => void;

  disabled?: boolean;
}

export const HeaderIcon = ({
  to,
  text,
  icon,
  iconColor,
  leftClose,
  leftIcon,
  onClick,
  disabled,
}: IHeaderIcon) => {
  const iconStyle = { color: iconColor };

  let ico = icon;

  if(leftIcon) {
    ico = leftClose ? <CloseOutlined style={iconStyle} /> : <ArrowLeftOutlined style={iconStyle} />;
  }

  if(to) {
    return (
      <ToastLink
        to={to}
        onlyIcon={!text && !ico}
      >
        {text}{ico}
      </ToastLink>
    );
  }

  if(onClick) {
    return (
      <ToastButton
        onClick={onClick}
        icon={ico}
        text={text}
        disabled={disabled}
      />
    );
  }

  return null;
};
