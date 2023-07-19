import React from 'react';
import CreateToast from "../src/containers/ChainPages/CreateChain/CreateChain";
import { GoToMobile } from "../src/containers";
import { isBrowser } from "react-device-detect";

const CreateChain = () => {
  if (isBrowser && process.env.NODE_ENV === 'production') {
    return <GoToMobile />;
  }
  return (
    <>
      <CreateToast />
    </>

  );
};

export default CreateChain;