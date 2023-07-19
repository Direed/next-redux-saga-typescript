import { useEffect } from 'react';
import { Row } from 'antd';
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from 'react-grid-dnd';
import { useDispatch } from 'react-redux';

import { updateRecordedVideo } from 'graphql/mutations';
import { createdChainVideoUpdateGraphAction } from 'redux-base/actions';

import { TChainVideo } from 'types';
import { useMemoState } from 'hooks';

import { ToastButton } from 'components/AntdComponents';

interface IChainArrange {
  videos: TChainVideo[] | null;
  setVideos: (videos: TChainVideo[]) => void;
  stepIncrease: () => void;
  stepDecrease: () => void;
}

export const Arrange = ({
  videos,
  setVideos,
  stepIncrease,
  stepDecrease,
}: IChainArrange) => {
  const dispatch = useDispatch();
  const [isChangedOrder, setIsChangedOrder] = useMemoState(false);

  useEffect(() => {
    setIsChangedOrder(false);
  }, []);

  const onChangePostiton = (sourceId: string, sourceIndex: number, targetIndex: number) => {
    const nextState = swap(videos as TChainVideo[], sourceIndex, targetIndex);
    setVideos(nextState);
    setIsChangedOrder(true);
  };

  const moveForward = () => {
    stepIncrease();

    if(isChangedOrder) {
      videos?.map((video, index) => {
        dispatch(createdChainVideoUpdateGraphAction({
          schema: updateRecordedVideo,
          variables: {
            input: {
              ...video,
              stitchPosition: index + 1,
            },
          },
        }));
      });
    }
  };

  return (
    <>
      <GridContextProvider onChange={onChangePostiton}>
        <GridDropZone
          id='videos'
          boxesPerRow={3}
          rowHeight={150}
          style={{
            flex: 1,
            margin: '0 -5px',
          }}
          onTouchStart={() => document.body.style.overflow = 'hidden'}
          onTouchEnd={() => document.body.style.overflow = 'auto'}
        >
          {(videos || []).map(video => (
            <GridItem style={{ padding: 5 }} key={video?.id}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: `no-repeat center/cover url(${video?.snapshotUrl})`,
                  borderRadius: 10,
                  border: '1px dashed #DDE5EC',
                }}
              />
            </GridItem>
          ))}
        </GridDropZone>
      </GridContextProvider>
      <Row>
        <ToastButton
          block
          text='Finalize'
          type='primary'
          onClick={moveForward}
          margin='0 0 10px 0'
        />
        <ToastButton
          block
          text='Back'
          onClick={stepDecrease}
        />
      </Row>
    </>
  );
};