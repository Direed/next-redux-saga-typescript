import { useMemoState } from 'hooks';

import Speaker from 'images/speaker.svg';
import SpeakerOff from 'images/speaker-none.svg';
import styles from './Stories.module.scss';

export const MuteButton = ({ videoPlayer }: any) => {
  const [mute, setMute] = useMemoState(false);

  const toggleVoice = () => {
    if(videoPlayer) {
      setMute(!mute);
      videoPlayer.muted = !videoPlayer.muted;
    }
  };

  return (
    <button
      onClick={toggleVoice}
      className={styles.muteButton}
    >
      {mute ? <Speaker /> : <SpeakerOff />}
    </button>
  );
};