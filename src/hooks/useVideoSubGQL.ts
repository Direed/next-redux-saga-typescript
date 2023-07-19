import { message } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';
// @ts-ignore
import { GraphQLError } from 'graphql/error/GraphQLError';

import { queryRecordedVideosByChainId } from 'graphql/queries';
import { onCreateRecordedVideo, onDeleteRecordedVideo, onUpdateRecordedVideo } from 'graphql/subscriptions';
import { createdChainVideosFetchGraphAction } from 'redux-base/actions';

export const useVideoCreateSubGQL = (chainId: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    handleLiveDataCreate();

    return () => subscription?.unsubscribe();
  }, []);

  let subscription: any;

  const handleLiveDataCreate = () => {
    // @ts-ignore
    subscription = API.graphql(graphqlOperation(onCreateRecordedVideo)).subscribe({
      next: () => {
        dispatch(createdChainVideosFetchGraphAction({
          schema: queryRecordedVideosByChainId,
          variables: { chainId },
        }));
      },
      error: (error: GraphQLError) => {
        if(error?.errors) {
          message.error(error?.errors[0]);
        }
      },
    });
  };
};

export const useVideoUpdateSubGQL = (chainId: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    handleLiveDataUpdate();

    return () => subscription?.unsubscribe();
  }, []);

  let subscription: any;

  const handleLiveDataUpdate = () => {
    // @ts-ignore
    subscription = API.graphql(graphqlOperation(onUpdateRecordedVideo)).subscribe({
      next: () => {
        dispatch(createdChainVideosFetchGraphAction({
          schema: queryRecordedVideosByChainId,
          variables: { chainId },
        }));
      },
      error: (error: GraphQLError) => {
        if(error?.errors) {
          message.error(error?.errors[0]);
        }
      },
    });
  };
};

export const useVideoDeleteSubGQL = (chainId: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    handleLiveDataDelete();

    return () => subscription?.unsubscribe();
  }, []);

  let subscription: any;

  const handleLiveDataDelete = () => {
    // @ts-ignore
    subscription = API.graphql(graphqlOperation(onDeleteRecordedVideo)).subscribe({
      next: () => {
        dispatch(createdChainVideosFetchGraphAction({
          schema: queryRecordedVideosByChainId,
          variables: { chainId },
        }));
      },
      error: (error: GraphQLError) => {
        if(error?.errors) {
          message.error(error?.errors[0]);
        }
      },
    });
  };
};