import { GatewayResponse, GatewayResponseStatus } from 'api/types/types';
import { LoginResponse } from 'api/AuthBase';

import Gateway from 'api/types/Gateway';

const simulateApi = (response: any) => {
    return new Promise(res => {
        setTimeout(() => {
            res(response);
        }, 1000);
    });
};

export default class AuthGateway extends Gateway {
    async login(): GatewayResponse<LoginResponse> {
        const response = await simulateApi({
            user: {
                role: 'removed for privacy!',
                isEmailVerified: false,
                email: 'removed for privacy!@removed for privacy!',
                name: 'removed for privacy!',
                id: 'removed for privacy!',
            },
            tokens: {
                access: {
                    token: 'removed for privacy!',
                    expires: 'removed for privacy!',
                },
                refresh: {
                    token: 'removed for privacy!',
                    expires: 'removed for privacy!',
                },
            },
        });

        return {
            status: GatewayResponseStatus.Success,
            data: response as LoginResponse,
        };
    }
}
