import { CSSProperties } from 'react';

import styles from './ToastText.module.scss';

interface IToastText {
  text: string | React.ReactNode;
  black?: boolean;
  white?: boolean;
  style?: Record<string, unknown>
}

export const ToastText = ({
  text,
  style,
  black,
  white,
  margin,
  fontSize,
  textAlign,
  fontWeight,
  lineHeight,
}: IToastText & CSSProperties) => (
  <p
    className={styles.toastText}
    style={{
      ...style,
      ...(black && { color: '#1D1F21' }),
      ...(white && { color: '#FFFFFF' }),
      lineHeight,
      fontWeight,
      textAlign,
      fontSize,
      margin,
    }}
  >
    {text}
  </p>
);