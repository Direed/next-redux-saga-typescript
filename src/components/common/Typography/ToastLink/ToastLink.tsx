import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import Link from "next/link";

import styles from './ToastLink.module.scss';

interface IToastLink {
  to?: string;
  href?: string;
  onlyIcon?: boolean;
  black?: boolean;
  white?: boolean;
}

export const ToastLink: React.FC<IToastLink & CSSProperties> = ({
  to,
  href,
  children,
  onlyIcon,
  black,
  white,
  color,
  fontSize,
}) => {
  const style = {
    color,
    ...(black && { color: '#1D1F21' }),
    ...(white && { color: '#FFFFFF' }),
    fontSize,
  };
  const cl = classNames(styles.toastLink, { [styles.onlyIcon]: onlyIcon });

  if(to) {
    return (
      <Link href={to}>
        <a
          className={cl}
          style={style}
        >{children}</a>
      </Link>
    );
  }

  return (
    <a
      className={cl}
      href={href}
      target='_blank'
      style={style}
    >
      {children}
    </a>
  );
};
