import { AuthState } from '.';

const getLoginAttempting = (state: AuthState): boolean => state.actions.login || false;
const getLoginError = (state: AuthState): string => state.error.login || '';

const getAuthToken = (state: AuthState): string => state.authToken || '';

const getStartupAttempting = (state: AuthState): boolean => state.actions.startup || false;
const getStartupError = (state: AuthState): string => state.error.startup || '';

export default {
    getLoginAttempting,
    getLoginError,

    getAuthToken,

    getStartupAttempting,
    getStartupError,
};
