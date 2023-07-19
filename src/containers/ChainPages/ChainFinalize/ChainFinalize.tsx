import { Spin } from 'antd';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { updateToastChain } from 'graphql/mutations';
import { getToastChain, queryRecordedVideosByChainId } from 'graphql/queries';
import {
  stitchVideosPostRequest, createdChainUpdateGraphAction,
  createdChainFetchGraphAction, createdChainVideosFetchGraphAction,
} from 'redux-base/actions';

import Links from 'links';
import { RootState } from 'index';
import { useMemoState } from 'hooks';
import { TChainVideo, TCreatedChain, TUser } from 'types';

import { Steps } from 'components/common';

import { Arrange } from './helpers';
import {useRouter} from "next/router";

const mapStateToProps = (state: RootState) => ({
  isLoading: state.createChain.isLoading,
  user: state.auth.user,
  chainVideos: state.createChain.chainVideos,
  createdChain: state.createChain.createdChain,
});

const mapDispatchToProps = {
  stitchVideosPostRequest,
  createdChainFetchGraphAction,
  createdChainUpdateGraphAction,
  createdChainVideosFetchGraphAction,
};

interface IChainFinalize {
  user: TUser;
  isLoading: boolean;
  chainVideos: TChainVideo[] | null;
  createdChain: TCreatedChain;

  createdChainFetchGraphAction: (data: { schema: unknown; variables: Record<string, unknown> }) => void;
  createdChainVideosFetchGraphAction: (data: { schema: unknown; variables: { chainId: string }}) => void;
  createdChainUpdateGraphAction: (data: { schema: unknown; variables: Record<string, unknown> }) => void;
}

const ChainFinalize = ({
  user,
  chainVideos,
  createdChain,
  isLoading,

  createdChainFetchGraphAction,
  createdChainUpdateGraphAction,
  createdChainVideosFetchGraphAction,
}: IChainFinalize) => {
  const [step] = useMemoState(0);
  const router = useRouter();
  // const [addTransition, setAddTransition] = useMemoState(false);
  const [videos, setVideos] = useMemoState<TChainVideo[] | null>(null);
  const STEPS_COUNT = 1;

  useEffect(() => {
    if(createdChain && createdChain.initiatorId !== user?.attributes.sub) {
      router.push(Links.Home);
    }

    setVideos(chainVideos);
  }, [chainVideos]);

  useEffect(() => {
    if(!createdChain) {
      createdChainFetchGraphAction({
        schema: getToastChain,
        variables: { chainId: router.query.chainId },
      });
    }

    if(!chainVideos?.length && router.query.chainId) {
      createdChainVideosFetchGraphAction({
        schema: queryRecordedVideosByChainId,
        variables: { chainId: String(router.query.chainId) },
      });
    }
  }, []);

  const handleFinalize = () => {
    createdChainUpdateGraphAction({
      schema: updateToastChain,
      variables: {
        input: {
          chainId: router.query.chainId,
          finalized: true,
        },
      },
    });
    router.push({
      pathname: `${Links.Chain}/${router.query.chainId}/${user?.attributes.sub}`,
      // state: { refetchVideos: true },
    });
  };

  // const stepDecrease = () => setStep(step - 1);
  // const stepIncrease = () => setStep(step + 1);

  if(step === 0) {
    return (
      <Spin spinning={isLoading} tip='Loading...'>
        <Steps stepsCount={STEPS_COUNT} step={step} title='Sort your videos'>
          <Arrange
            videos={videos}
            setVideos={setVideos}
            stepIncrease={handleFinalize}
            stepDecrease={router.back}
          />
        </Steps>
      </Spin>
    );
  }

  return null;
};

export default connect(mapStateToProps, mapDispatchToProps)(ChainFinalize);