import Media from 'react-media-next';
import { Typography } from 'antd';
import classNames from 'classnames';

import { mediaQueries } from 'config';

import { ToastText } from 'components/common';

import styles from './LogoBlock.module.scss';

const { Title } = Typography;

interface ILogoBlock {
  title: string;
  name?: string;
  text: string;
  isNotLoggedInParticipant?: boolean;
}

export const LogoBlock = ({ title, text, name, isNotLoggedInParticipant }: ILogoBlock) => {
  let infoText = text;

  if(isNotLoggedInParticipant) {
    infoText = `Please sign in to record your video for ${name} video chain`;
  } else if (name) {
    infoText = `Your video chain for ${name} has been created.`;
  }

  return (
    <Media queries={mediaQueries}>
      {screen =>
        <div className={classNames(styles.logoBlock, { [styles.bigScreen]: screen.bigScreen })}>
          <div className={styles.logo} />
          <Title style={{ fontWeight: 700 }}>{title}</Title>

          <ToastText style={{ color: name && '#8bd89f' }} text={infoText} />

        </div>
      }
    </Media>
  );
};