import React, { Children } from 'react';
import { Navigate } from 'react-router';
import useAuth from '../hooks/UseAuth';
import useRole from '../hooks/useRole';
import Loading from '../pages/shared/Loading';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (!user || role !== 'admin') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
};

export default AdminRoute;