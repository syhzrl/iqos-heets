import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginActionPayload, AuthReduxState } from './types';

const initialState: AuthReduxState = {
    actions: {
        login: false,
        startup: true,
        logout: false,
    },
    authToken: '',
    error: {
        login: '',
        startup: '',
        logout: '',
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authStartupAttempt: (state) => {
            state.actions.startup = true;
            state.error.startup = '';
        },
        authStartupSuccess: (state) => {
            state.actions.startup = false;
        },
        authStartupFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.startup = false;
            if (action.payload) state.error.startup = action.payload;
        },
        authLoginAttempt: (state, _action: LoginActionPayload) => {
            state.actions.login = true;
            state.error.login = '';
        },
        authLoginSuccess: (state, action: PayloadAction<string>) => {
            state.actions.login = false;
            state.authToken = action.payload;
        },
        authLoginFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.login = false;
            if (action.payload) {
                state.error.login = action.payload;
            }
        },
        authLogout: (state) => {
            state.actions.login = false;
            state.authToken = '';
        },
    },
});

export type AuthState = typeof initialState;

export default {
    actions: authSlice.actions,
    reducers: authSlice.reducer,
};
