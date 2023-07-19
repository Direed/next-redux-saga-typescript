import React, {useEffect, useState} from 'react';
import Chain from "../../../../src/containers/ChainPages/Chain/Chain";
import Links from "../../../../src/links";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {RootState} from "../../../../src";

const Index = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isShowContent, setIsShowContent] = useState(false)

  useEffect(() => {
    if(user && router.query.userId !== user.attributes.sub) {
      router.push(Links.Home, undefined, { shallow: true });
    } else {
      setIsShowContent(true);
    }
  }, [])

  return isShowContent && <Chain />;
};

export default Index;