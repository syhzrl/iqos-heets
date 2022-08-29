import React, { FunctionComponent } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HistoryRouter as Router } from 'redux-first-history/rr6';

import { history } from 'redux/store';

import LoginScreen from 'containers/auth/Login';
import HomeScreen from 'containers/home/index';
import FaqScreen from 'containers/home/faq';
import AgeBotScreen from 'containers/home/age';
import AnalyticsScreen from 'containers/home/analytics';

import PrivateRoute from './PrivateRoutes';

const PrivateBucket: FunctionComponent = () => {
    return (
        <Route path='/' element={<PrivateRoute />}>
            <Route element={<HomeScreen />}>
                <Route path='/faq' element={<FaqScreen />} />
                <Route path='/agebot' element={<AgeBotScreen />} />
                <Route path='/analytics' element={<AnalyticsScreen />} />
            </Route>
        </Route>
    );
};

const NavRoutes: FunctionComponent = (props) => {
    return (
        <Router history={history}>
            <Routes>
                <Route path='/' element={<Navigate replace to='/faq' />} />
                <Route path='/login' element={<LoginScreen />} />

                <Route path='*' element={<Navigate replace to='/faq' />} />
                {PrivateBucket(props)}
            </Routes>
        </Router>
    );
};

export default NavRoutes;
