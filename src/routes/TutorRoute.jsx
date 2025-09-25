import React from 'react';
import Loading from '../pages/shared/Loading';
import useAuth from '../hooks/UseAuth';
import useRole from '../hooks/useRole';
import { Navigate } from 'react-router';

const TutorRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useRole();

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (!user || role !== 'tutor') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
};

export default TutorRoute;