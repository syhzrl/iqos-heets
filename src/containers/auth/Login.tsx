import React, { useState, CSSProperties, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import { css } from 'styled-components';
import SVG from 'react-inlinesvg';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import Button from 'components/Button';
import Text from 'components/Text';
import Input from 'components/Input';
import Icon from 'components/Icon';

import Icons from 'assets/icons/Index';
import IqosLoginLogo from 'assets/images/Logo_1024x1024.jpg';
import Colors from 'assets/themes/Colors';
import { AppDispatch, RootState } from 'redux/store';
import Fonts from 'assets/themes/Fonts';

interface LoginProps {
    loading?: boolean;
    login(username: string, password: string): void;
    error?: string;
}

interface StylesDictionary {
    [Key: string]: CSSProperties;
}

const Login: FunctionComponent<LoginProps> = (props: LoginProps) => {
    const { login, loading, error } = props;

    const [showPass, setShowPass] = useState(false);
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginClickHandler = () => {
        login(userName, password);
    };

    const renderCard = () => {
        return (
            <div style={containerStyles.card}>
                <img
                    src={IqosLoginLogo}
                    alt={IqosLoginLogo}
                    style={{
                        height: '170px',
                        width: '170px',
                        borderRadius: 90,
                        marginBottom: 40,
                        objectFit: 'contain',
                    }}
                />

                <div style={{ display: 'flex', flexDirection: 'column' }}>

                    <Label style={styles.label}>Login</Label>
                    <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', background: Colors.primary, borderRadius: '5px' }}>
                        <Icon source={Icons.UsernameIcon} style={{ width: '30px', height: '30px' }} />
                        <Input
                            value={userName}
                            onChange={e => setUsername(e.target.value)}
                            css={styles.inputField}
                            placeholder='Username'
                            onEnterPressed={loginClickHandler}
                        />
                    </div>

                    <Label style={styles.label}>Password</Label>
                    <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', background: Colors.primary, borderRadius: '5px' }}>
                        <Icon source={Icons.LockIcon} style={{ width: '30px', height: '30px' }} />
                        <Input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type={showPass ? 'text' : 'password'}
                            css={styles.inputField}
                            placeholder='Password'
                            onEnterPressed={loginClickHandler}
                        />
                        <Button
                            onClick={() => setShowPass(!showPass)}
                            css={styles.eyeIcon}
                        >
                            <SVG src={Icons.EyeIcon} id='eye' />
                        </Button>
                    </div>
                    {error && <Text style={{ color: 'white' }}>{error}</Text>}
                </div>

                <div style={{ marginTop: 20 }}>
                    <Button
                        label='Login'
                        loading={loading}
                        onClick={loginClickHandler}
                        css={styles.loginButton}
                    />
                </div>

            </div>
        );
    };

    return (
        <div style={containerStyles.background}>
            {renderCard()}
        </div>
    );
};

const containerStyles: StylesDictionary = {
    background: {
        backgroundColor: '#202030',
        position: 'absolute',
        minHeight: '100%',
        minWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '40%',
        minHeight: '600px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0px auto',
        borderRadius: 5,
    },
    inputField: {
        height: '100%',
        border: 'none',
        backgroundColor: Colors.primary,
        outline: 'none',
        color: 'white',
    },
    inputIcons: {
        marginLeft: '10px',
        marginRight: '10px',
    },
    loginButton: {
        height: '50px',
        width: '150px',
        fontSize: '20px',
        borderRadius: '50px',
        border: `1px solid ${Colors.secondary}`,
    },
};

const styles = {
    inputField: css`
        height: 50px;
        border: none;
        background-color: ${Colors.primary};
        outline: none;
        color: white;

        &:hover {
            text-decoration: underline ${Colors.secondary};
        }
    `,
    label: {
        color: 'white',
        fontSize: 24,
        fontFamily: Fonts.primary,
    },
    loginButton: css`
        height: 50px;
        width: 150px;
        font-size: 20px;
        border-radius: 50px;
        border: 1px solid ${Colors.secondary};
        background-color: ${Colors.primary};
        color: ${Colors.secondary};
        transition: 0.3s;

        &:hover {
            border: 1px solid ${Colors.primary};
            background-color: ${Colors.secondary};
            color: ${Colors.primary};
            transition: 0.3s;
        }
    `,
    eyeIcon: css`
        background-color: transparent;
        margin-right: 5px;

        &:hover {
            #eye {
                width: 30px;
                height: 30px;
                color: white;
                transition: 0.3s;
            }
        }

        #eye {
            width: 30px;
            height: 30px;
            transition: 0.3s;
            color: ${Colors.secondary};
        }
    `,
};

Login.defaultProps = {
    loading: false,
    error: '',
};

const mapStateToProps = (state: RootState) => ({
    loading: Selectors.authGetLoginAttempting(state),
    error: Selectors.authGetLoginError(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    login: (userName: string, password: string) =>
        dispatch(Actions.authLoginAttempt({ userName, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
