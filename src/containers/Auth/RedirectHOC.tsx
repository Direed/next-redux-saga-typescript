import React, { useEffect } from 'react';
// import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRouter } from "next/router";

import Links from 'links';
import { RootState } from 'index';
import { TCreatedChain, TUser } from 'types';

export const withRedirectHOC = <T, >(WrappedComponent: React.FC<T>) => (props: T) => {
  const router = useRouter();
  console.log(router)
  // const location = useLocation<Record<string, string>>();


  const user = useSelector((state: RootState) => state.auth.user) as TUser;
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const notAuthChain = useSelector((state: RootState) => state.createChain.notAuthChain) as TCreatedChain;
  const isNotLoggedInParticipant = useSelector((state: RootState) => state.createChain.isNotLoggedInParticipant);
  const isNotLoggedInRecipient = useSelector((state: RootState) => state.createChain.isNotLoggedInRecipient);

  useEffect(() => {
    if(isLoggedIn && user) {

      if (notAuthChain) {
        router.replace(`${Links.Chain}/${notAuthChain?.chainId}/${user?.attributes?.sub}`);
      }

      if(isNotLoggedInParticipant) {
        router.replace(Links.ToastRecorder);
      }

      if(isNotLoggedInRecipient) {
        router.replace({
          pathname: Links.ToastRecorder,
          // state: { chainRecipient: true },
        });
        localStorage.setItem("chainRecipient", "true")
      }

      // if (localStorage.getItem("redirectFrom")) {
      //   router.replace(localStorage.getItem("redirectFrom"));
      // }
      //
      if ((router.asPath === "/login" || router.asPath === "/") && !isNotLoggedInParticipant && !notAuthChain) {
        router.replace(Links.Home);
      }
    }

  }, [user, isLoggedIn, notAuthChain]);

  return <WrappedComponent {...props}/>;
};

