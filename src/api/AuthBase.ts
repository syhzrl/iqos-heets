import Gateway from 'api/types/Gateway';
import { GatewayResponse } from 'api/types/types';

export interface LoginParams {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: {
        role: string;
        isEmailVerified: boolean;
        email: string;
        name: string;
        id: string;
    };
    tokens: {
        access: {
            token: string;
            expires: string;
        };
        refresh: {
            token: string;
            expires: string;
        };
    }
}

export abstract class IAuthGateway extends Gateway {
    abstract login(params: LoginParams): GatewayResponse<LoginResponse | null>;
}
