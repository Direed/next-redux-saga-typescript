import { useRef } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';

import styles from './VideoPlayer.module.scss';

interface IVideoPlayer {
  poster?: string;
  src?: string;
}

export const VideoPlayer = ({
  poster,
  src,
}: IVideoPlayer) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const playVideo = () => videoRef?.current?.play();

  if(!src) {
    return (
      <div className={styles.videoPlayerText}>
        The video has not been uploaded yet.
        You can close this page and come back later or wait, it will update automatically!
      </div>
    );
  }

  return (
    <div className={styles.videoPlayerContainer} onClick={playVideo}>

      <CaretRightOutlined className={styles.videoPlayerIcon} />

      <video
        ref={videoRef}
        poster={poster}
        className={styles.videoPlayer}
      >
        <source src={src} type='video/mp4'/>
        Your browser does not support the video tag.
      </video>
    </div>
  );
};