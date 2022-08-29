import { PayloadAction } from '@reduxjs/toolkit';

export interface AuthReduxState {
    actions: {
        login: boolean;
        startup: boolean;
        logout: boolean;
    },
    authToken: string;
    error: {
        login: string;
        startup: string;
        logout: string;
    },
}

export type LoginActionPayload = PayloadAction<{
    userName: string;
    password: string;
}>
