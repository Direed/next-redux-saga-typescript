import { CSSProperties } from 'react';
import classNames from 'classnames';

import styles from './Wrapper.module.scss';

interface IWrapper {
  id?: string;
  className?: string;

  style?: Record<string, unknown>;
  displayFlex?: boolean;
  column?: boolean;
  noPadding?: boolean;
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
}

export const Wrapper: React.FC<IWrapper & CSSProperties> = ({
  id,
  children,
  className,

  flex,
  height,
  displayFlex,
  column,
  justify,
  noPadding,
  style,
}) => (
  <div
    id={id}
    style={{
      flex,
      height,
      ...(displayFlex && { display: 'flex' }),
      ...(column && { flexDirection: 'column' }),
      ...(justify && { justifyContent: justify }),
      ...(noPadding && { padding: 0 }),
      ...style,
    }}
    className={classNames(className, styles.wrapper)}
  >
    {children}
  </div>
);