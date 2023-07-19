import React from 'react';
import {RecipientDeadline} from "../../../../src/containers/ChainPages/Chain/helpers";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {RootState} from "../../../../src";
import {createdChainUpdateGraphAction} from "../../../../src/redux-base/actions";

const RecipientDate = () => {
  const router = useRouter()
  const isLoading = useSelector((state: RootState) => state.createChain.isLoading);
  const createdChain = useSelector((state: RootState) => state.createChain.createdChain);

  return (
    <RecipientDeadline
      isLoading={isLoading}
      createdChain={createdChain}
      createdChainUpdateGraphAction={createdChainUpdateGraphAction}
      goBack={router.back}
    />
  );
};

export default RecipientDate;