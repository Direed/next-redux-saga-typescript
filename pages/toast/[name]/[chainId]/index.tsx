import React from 'react';
import Toast from "../../../../src/containers/ToastPages/Toast/Toast";
import { GoToMobile } from "../../../../src/containers";
import { isBrowser } from "react-device-detect";

const Index = () => {
  if (isBrowser && process.env.NODE_ENV === 'production') {
    return <GoToMobile />;
  }
  return (
    <Toast />
  );
};

export default Index;