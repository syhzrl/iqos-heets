import React, { FunctionComponent } from 'react';
import SVG from 'react-inlinesvg';
import { css } from 'styled-components';
import { useLocation } from 'react-router';

import Selectors from 'redux/Selectors';
import Actions from 'redux/Actions';
import { RootState, AppDispatch } from 'redux/store';
import { connect, useDispatch } from 'react-redux';

import Button from 'components/Button';
import HeaderButton from 'components/HeaderButton';

import Icons from 'assets/icons/Index';
import Colors from 'assets/themes/Colors';

import NavActions from 'lib/NavActions';

interface NavMenuProps {
    isLanu: boolean;
    setIsLanu: (state: boolean) => void;
    getAllFaqReset: () => void;
    getAllFaqs: () => void;
}

const NavMenu: FunctionComponent<NavMenuProps> = (props: NavMenuProps) => {
    const { isLanu, getAllFaqReset, getAllFaqs, setIsLanu } = props;

    const dispatch = useDispatch();
    const location = useLocation();

    const onLogout = () => {
        dispatch(Actions.authLogout());
    };

    const faqClickHandler = () => {
        NavActions.navToHome();
    };

    const ageBotlickHandler = () => {
        NavActions.navToAgeBot();
    };

    const analyticsClickHandler = () => {
        NavActions.navToAnalytics();
    };

    const lauClickHandler = () => {
        getAllFaqReset();
        setIsLanu(false);
        getAllFaqs();
    };

    const lanuClickHandler = () => {
        getAllFaqReset();
        setIsLanu(true);
        getAllFaqs();
    };

    return (
        <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <HeaderButton
                    text='LAU'
                    onClick={lauClickHandler}
                    isSelected={!isLanu}
                />
                <HeaderButton
                    text='LANU'
                    onClick={lanuClickHandler}
                    isSelected={isLanu}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>

                <HeaderButton text='FAQ' onClick={faqClickHandler} isSelected={location.pathname === '/faq'} />
                <HeaderButton text='Agebot' onClick={ageBotlickHandler} isSelected={location.pathname === '/agebot'} />
                <HeaderButton text='Channel Analytics' onClick={analyticsClickHandler} isSelected={location.pathname === '/analytics'} />

                <div style={{ position: 'absolute', right: 20, top: '125px' }}>
                    <Button
                        onClick={onLogout}
                        css={styles.logoutIcon}
                        style={{ width: 40, height: 40 }}
                    >
                        <SVG src={Icons.LogOutIcon} id='logout' />
                    </Button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    logoutIcon: css`
        background-color: transparent;
        width: 50px;
        height: 50px;
        
        #logout {
            width: 50px;
            height: 50px;
            color: ${Colors.secondary};
            &:hover{
                color: white;
            }
        }
    `,
};

const mapStateToProps = (state: RootState) => ({
    isLanu: Selectors.getFaqGetIsLANU(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    setIsLanu: (state: boolean) => dispatch(Actions.setIsLanu(state)),
    getAllFaqReset: () => dispatch(Actions.getReset()),
    getAllFaqs: () => dispatch(Actions.getAttempt()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
