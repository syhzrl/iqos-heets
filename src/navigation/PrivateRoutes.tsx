import React, { FunctionComponent } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Utils from '../lib/Utils';

const PrivateRoute: FunctionComponent = () => {
    const isAuthenticated = Utils.Auth.getAuthToken();

    if (!isAuthenticated) return <Navigate replace to='/login' />;

    return (
        <div style={{ display: 'flex' }}>
            <Outlet />
        </div>
    );
};

export default PrivateRoute;
