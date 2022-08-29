import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'reactstrap';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import ErrorBoundary from './ErrorBoundary';
import Routes from '../navigation/Routes';

const Full: FunctionComponent = () => {
    const dispatch = useDispatch();
    const loading = useSelector(Selectors.getAuthStartupAttempting);

    useEffect(() => {
        dispatch(Actions.authStartupAttempt());
    }, []);

    if (loading) {
        return <Spinner color='warning' size='lg' />;
    }

    return (
        <ErrorBoundary>
            <Routes />
        </ErrorBoundary>
    );
};

export default Full;
