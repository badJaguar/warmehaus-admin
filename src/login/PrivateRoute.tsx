import { memo } from 'react';
import {
  Navigate, useLocation,
} from 'react-router-dom';


interface PrivateRouteProps {
  children: JSX.Element
}

export const PrivateRoute = memo(({ children }: PrivateRouteProps):JSX.Element => {
  const location = useLocation();
const user = sessionStorage.getItem('login')

if (location.pathname === '/' || location.pathname === '') {
  return <Navigate to={``} />;
}

  if (!user) {
    return <Navigate to={'login'} state={{ from: location }} />;
  }

  return children;
});
