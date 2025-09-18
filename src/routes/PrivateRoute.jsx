import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/UseAuth';
import Loading from '../pages/shared/Loading';


const PrivateRoute = ({children}) => {
const { user,loading } = useAuth()

  const location = useLocation();

  if (loading) {
    return <Loading></Loading>;
  }
 if (!user) {
        return <Navigate state={{ from: location.pathname }} to="/login"></Navigate>
    }

    return children;
};
export default PrivateRoute;