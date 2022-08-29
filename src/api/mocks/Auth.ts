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
                role: 'user',
                isEmailVerified: false,
                email: 'liew@double.my',
                name: 'liew',
                id: '61cadbe4d50b6d126dec5580',
            },
            tokens: {
                access: {
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MWNhZGJlNGQ1MGI2ZDEyNmRlYzU1ODAiLCJpYXQiOjE2NDA2ODQ1ODIsImV4cCI6MTY0MDY4NjM4MiwidHlwZSI6ImFjY2VzcyJ9.iMyKlfKAh7CQ4DgDH7dbVVbQbN8wYKAXGlUX5XiPYpc',
                    expires: '2021-12-28T10:13:02.737Z',
                },
                refresh: {
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MWNhZGJlNGQ1MGI2ZDEyNmRlYzU1ODAiLCJpYXQiOjE2NDA2ODQ1ODIsImV4cCI6MTY0MzI3NjU4MiwidHlwZSI6InJlZnJlc2gifQ.Vccoza_wR5x73GD9ckWr1W-r4jt7gTHJUGBr-QUttCE',
                    expires: '2022-01-27T09:43:02.737Z',
                },
            },
        });

        return {
            status: GatewayResponseStatus.Success,
            data: response as LoginResponse,
        };
    }
}
