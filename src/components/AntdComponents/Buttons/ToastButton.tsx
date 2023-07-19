import React, { CSSProperties } from 'react';
import { Button } from 'antd';
import { BaseButtonProps, NativeButtonProps } from 'antd/es/button/button';
import classNames from 'classnames';

import styles from './ToastButton.module.scss';

interface IButton {
  id?: string,
  text?: string | React.ReactNode;
}

export const ToastButton = ({
  id,
  type,
  block,
  style,
  loading,
  onClick,
  width,
  margin,
  htmlType,
  shape,
  icon,
  text,
  size,
  danger,
  disabled,
  form,
}: IButton & NativeButtonProps & BaseButtonProps & CSSProperties) => (
  <div
    className={classNames(
      styles.toastButton,
      {
        [styles.small]: size === 'small',
        [styles.middle]: size === 'middle',
        [styles.onlyIcon]: icon && !text,
      },
    )}
    style={{ width: block ? '100%' : width }}
  >
    <Button
      id={id}
      icon={icon}
      type={type}
      size={size}
      block={block}
      shape={shape}
      loading={loading}
      htmlType={htmlType}
      onClick={onClick}
      danger={danger}
      disabled={disabled}
      form={form}
      style={{
        margin,
        width,
        ...style,
      }}
    >
      {text}
    </Button>
  </div>

);