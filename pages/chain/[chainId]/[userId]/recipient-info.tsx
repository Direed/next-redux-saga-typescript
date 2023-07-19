import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../../../src";
import {RecipientInfo} from "../../../../src/containers/ChainPages/Chain/helpers";
import {createdChainUpdateGraphAction, imageAddOrEditRequestAction} from "../../../../src/redux-base/actions";
import {useRouter} from "next/router";

const RecipientInfoPage = () => {
  const router = useRouter()
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.createChain.isLoading);
  const createdChain = useSelector((state: RootState) => state.createChain.createdChain);

  return (
    <RecipientInfo
      user={user}
      isLoading={isLoading}
      createdChain={createdChain}
      imageAddOrEditRequestAction={imageAddOrEditRequestAction}
      createdChainUpdateGraphAction={createdChainUpdateGraphAction}
      goBack={router.back}
    />
  );
};

export default RecipientInfoPage;