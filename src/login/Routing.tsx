/* eslint-disable max-len */
import {  memo } from 'react';
import {
  Navigate,
  Route, Routes, useLocation,
} from 'react-router-dom';
import BasicTable from '../table/TableComponent';
import Login from './Login';
import { PrivateRoute } from './PrivateRoute';



const Routing = function (): JSX.Element {
  const location = useLocation();

  if (location.pathname === '/' || location.pathname === '') {
    return <Navigate to={`login`} />;
  }

  return (
    <Routes>
      <Route path={'login'} element={<Login />} />
      <Route
        path={'table'}
        element={(
          <PrivateRoute>
            <BasicTable />
          </PrivateRoute>
        )}
      />
    </Routes>
  );
};

export default memo(Routing);
