import { RouteChildrenProps } from 'react-router-dom';

import { TError, TUser } from 'types';

export interface ICoreLayoutProps extends RouteChildrenProps {
  children: React.ReactNode;
  user: TUser;
  isLoggedIn: boolean;
  loginSuccess: (user: TUser) => void;
  showError: (error: TError) => void;
}
