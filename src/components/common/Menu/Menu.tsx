import { Popover, PopoverProps } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

import { ToastButton } from 'components/AntdComponents';

import styles from './Menu.module.scss';
import { CSSProperties } from 'react';

interface IMenu {
  iconColor?: string;
  menuItems: TMenuItem[];
  onClick?: () => void;
}

export type TMenuItem = {
  border?: boolean;
  disabled?: boolean;
  text: string;
  color?: string;
  onClick: () => void;
}

export const Menu = ({ menuItems, iconColor, title, onClick }: IMenu & PopoverProps & CSSProperties) => (
  <Popover
    title={title}
    trigger='click'
    placement='leftTop'
    content={<div className={styles.menuContainer}>
      {menuItems.map(item => (
        <ToastButton
          key={item.text}
          block
          type='text'
          text={item.text}
          onClick={item.onClick}
          disabled={item.disabled}
          style={{
            padding: '13px 16px',
            borderRadius: 0,
            ...(item.border && { borderBottom: '1px solid rgba(60, 60, 67, 0.36)' }),
            ...(item.color && { color: item.color }),
          }}
        />
      ))}
    </div>}
    overlayClassName={styles.menuOverlay}
  >
    <MoreOutlined
      onClick={onClick}
      style={{
        color: iconColor,
        fontSize: 22,
      }}
    />
  </Popover>
);