import { CSSProperties } from 'react';
import { Row, RowProps } from 'antd';
import Media from 'react-media-next';
import classNames from 'classnames';

import { mediaQueries } from 'config';

import { Menu, TMenuItem } from '../Menu';
import { HeaderIcon } from './HeaderIcon';

import styles from './Header.module.scss';

export interface IHeader {
  leftTo?: string;
  leftOnClick?: () => void;
  leftClose?: boolean;
  rightTo?: string;
  rightText?: string;
  rightIcon?: React.ReactNode;
  rightOnClick?: () => void;
  title?: React.ReactNode | string;
  rightDisabled?: boolean;
  absolute?: boolean;
  iconColor?: string;

  rightMenu?: boolean;
  menuItems?: TMenuItem[];
}

export const Header = ({
  // left button
  leftTo,
  leftOnClick,
  leftClose,
  // rigth button
  rightTo,
  rightText,
  rightIcon,
  rightOnClick,
  rightDisabled,

  title,
  iconColor,

  rightMenu,
  menuItems,

  margin,
  padding,
  absolute,
  justify = 'space-between',
}: IHeader & RowProps & CSSProperties) => (
  <Media queries={mediaQueries}>
    {screen =>
      <Row
        justify={screen.smallScreen ? justify : 'end'}
        align='middle'
        style={{
          margin,
          padding,
        }}
        className={classNames(styles.toastHeader, { [styles.absolute]: absolute })}
      >
        {screen.smallScreen && (
          <HeaderIcon
            to={leftTo}
            leftClose={leftClose}
            onClick={leftOnClick}
            iconColor={iconColor}
            leftIcon
          />
        )}
        {title && (
          <span className={styles.toastHeaderTitle}>
            {title}
          </span>
        )}
        {!rightMenu && (
          <HeaderIcon
            to={rightTo}
            text={rightText}
            icon={rightIcon}
            iconColor={iconColor}
            onClick={rightOnClick}
            disabled={rightDisabled}
          />
        )}
        {rightMenu && (
          <Menu iconColor={iconColor} menuItems={menuItems as TMenuItem[]} />
        )}
      </Row>
    }
  </Media>
);