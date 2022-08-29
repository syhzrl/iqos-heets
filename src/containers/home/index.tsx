import React, { useState, useEffect, CSSProperties, FunctionComponent } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CustomLoadingOverlay from 'components/LoadingOverlay';

import Selectors from 'redux/Selectors';

import NavMenu from '../../navigation/components/NavMenu';
import Header from '../../components/Header';

export interface StylesDictionary {
    [Key: string]: CSSProperties;
}

const HomeScreen: FunctionComponent = () => {
    const editing = useSelector(Selectors.getFaqFaqsEditing);
    const location = useLocation();
    const { pathname } = location;

    const [selectedScreenName, setSelectedScreenName] = useState('');

    useEffect(() => {
        switch (pathname) {
            case '/faq': setSelectedScreenName('Frequently Asked Questions'); break;
            case '/agebot': setSelectedScreenName('AgeBot Copies'); break;
            case '/analytics': setSelectedScreenName('Channel Analytics'); break;
            default: setSelectedScreenName(''); break;
        }
    }, [pathname]);

    return (
        <div style={styles.background}>
            <NavMenu />
            <Header text={selectedScreenName} />

            <CustomLoadingOverlay active={editing} />

            <Outlet />
        </div>
    );
};

const styles: StylesDictionary = {
    background: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '200%',
    },
    card: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '40%',
        height: '60%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0px auto',
        borderRadius: 5,
    },
};

export default HomeScreen;
