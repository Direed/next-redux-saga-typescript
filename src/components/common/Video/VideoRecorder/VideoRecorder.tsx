import { useEffect } from 'react';
import moment from 'moment';

import { TCreatedChain, TUser } from 'types';
import { useMemoState } from 'hooks';

// import './VideoRecorder.styles.scss';

interface IVideoRecorder {
  videoSaved: boolean;
  onSave: (status: boolean) => void;
  videoDuration?: number;
  initiatedVideo?: boolean;
  user: TUser;
  videoId?: string;
  successText: string;
  createdChain: TCreatedChain;
  chainRecipient?: boolean;
}

export const VideoRecorder = ({
  videoDuration = 120,
  videoId,
  videoSaved,
  createdChain,
  chainRecipient,
  onSave,
  user,
  successText,
  initiatedVideo, // this property need for detect initiated video and dont stich this video with other from chain
}: IVideoRecorder) => {
  const [recObj, setRecObj]= useMemoState<any>(null);
  const [videoElement, setVideoElement]= useMemoState<HTMLVideoElement | null>(null);

  useEffect(() => loadScript('//cdn.addpipe.com/2.0/pipe.js'), []);

  useEffect(() => {
    if(recObj) {
      recObj.onCamAccess = (_: string, allow: boolean) => {

        if(allow) {
          setVideoElement(document.getElementById('pipeVideoInput-video-container') as HTMLVideoElement);
        }
      };

      recObj.onSaveOk = () => onSave(true);
      recObj.onVideoUploadSuccess = () => onSave(true);
    }

    if(videoSaved) {
      removeVideo();
    }

    return () => removeVideo();

  }, [recObj, videoElement, videoSaved]);

  const removeVideo = () => {
    if(videoElement) {
      // now get the stream
      const video = videoElement.srcObject as MediaStream;
      const tracks = video?.getTracks() as MediaStreamTrack[];
      // now close each track by having forEach loop
      tracks.forEach(track => { track.stop(); });
      setVideoElement(null);
    }
  };

  const loadScript = (url: string) => {
    const link = document.createElement('link');
    link.href = '//cdn.addpipe.com/2.0/pipe.css';
    link.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(link);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);

    script.onload = () => {
      const pipeParams = {
        size: {
          width: '100%',
          height: 350,
        },
        qualityurl: 'avq/720p.xml',
        accountHash: 'bf247699f22f0113cfceefb1409db2ef',
        payload: JSON.stringify({
          participantName: user?.attributes.name,
          participantPhone: user?.username,
          participantPhoto: user?.attributes.picture,
          created: moment().unix(),
          recipientName: createdChain?.recipientName,
          initiatorId: createdChain?.initiatorId,
          chainId: createdChain?.chainId,
          videoId,
          ...(initiatedVideo && { initiatedVideo }),
          ...(chainRecipient ? { recipientId: user?.attributes.sub } : { participantId: user?.attributes.sub }),
        }),
        eid: 'zRBj6c',
        mrt: initiatedVideo ? 60 : videoDuration,
        asv: 0,
        dup: 0,
      };
      //@ts-ignore there is no package with types
      PipeSDK.insert('video-container', pipeParams, recorderObject => setRecObj(recorderObject));
    };
  };

  if(videoSaved) {
    return <div className='video-saved'>{successText}</div>;
  }

  return <div id='video-container' />;
};

