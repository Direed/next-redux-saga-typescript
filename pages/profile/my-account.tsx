import React from 'react';
import {MyAccount} from "../../src/containers/Profile/helpers";
import {Spin} from "antd";
import {connect} from "react-redux";
import {RootState} from "../../src";
import {useRouter} from "next/router";
import {TUser} from "../../src/types";

interface IPrivateRoute {
  isLoading: boolean;
  user: TUser;
}

const MyAccountPage = ({ isLoading, user }: IPrivateRoute) => {
  const router = useRouter();
  return (
    <Spin spinning={isLoading} tip='Loading...'>
      <MyAccount user={user} goBack={router.back} />
    </Spin>
  );
};

export default connect((state: RootState) => ({
  isLoading: state.auth.isLoading,
  user: state.auth.user,
}))(MyAccountPage);