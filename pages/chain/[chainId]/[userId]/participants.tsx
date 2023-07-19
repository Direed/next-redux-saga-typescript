import React from 'react';
import {ChainParticipants} from "../../../../src/containers/ChainPages/Chain/helpers";
import {useSelector} from "react-redux";
import {RootState} from "../../../../src";
import {createdChainUpdateGraphAction} from "../../../../src/redux-base/actions";

const Participants = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.createChain.isLoading);
  const chainVideos = useSelector((state: RootState) => state.createChain.chainVideos);
  const createdChain = useSelector((state: RootState) => state.createChain.createdChain);

  return (
    <ChainParticipants
      user={user}
      isLoading={isLoading}
      chainVideos={chainVideos}
      createdChain={createdChain}
      createdChainUpdateGraphAction={createdChainUpdateGraphAction}
    />
  );
};

export default Participants;