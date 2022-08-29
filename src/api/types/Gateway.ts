import apisauce, { ApiResponse, ApisauceInstance } from 'apisauce';

import NavActions from 'lib/NavActions';
import { GatewayResponseAwaited, GatewayResponseStatus, GatewayResponseError, GatewayResponseSuccess } from './types';

interface IHeaders {
    [key: string]: string;
}

interface ApiError {
    code: number;
    message: string;
}

export default class Gateway {
    protected api: ApisauceInstance;

    constructor(baseURL: string) {
        const headers: IHeaders = {
            'Content-Type': 'application/json',
        };

        const config = {
            baseURL,
            headers,
            timeout: 10000,
        };

        this.api = apisauce.create(config);
    }

    process<T>(response: ApiResponse<T | ApiError>): GatewayResponseAwaited<T> {
        const { ok, problem, data, status } = response;

        if (status === 401) {
            NavActions.navResetToLogin();

            return {
                status: GatewayResponseStatus.Error,
                code: '401',
                name: 'Session timeout',
                message: 'Please try logging in again.',
            } as GatewayResponseError;
        }

        if (!ok || problem) {
            let name = 'Error';
            let message = 'Something went wrong. Please try again.';

            if (problem === 'NETWORK_ERROR') {
                name = 'No Internet connnection';
                message = 'There appears to be no Internet connection. Please check your Internet connection.';
            }

            if (problem === 'CLIENT_ERROR') {
                if (typeof data === 'string') message = data;
                else if (data) {
                    const { code = '', message: error = '' } = data as ApiError;

                    if (code && error) {
                        return {
                            status: GatewayResponseStatus.Error,
                            code: problem,
                            name: code.toString(),
                            message: error,
                        };
                    }
                }
            }

            return {
                status: GatewayResponseStatus.Error,
                code: problem,
                name,
                message,
            } as GatewayResponseError;
        }

        return {
            status: GatewayResponseStatus.Success,
            data,
        } as GatewayResponseSuccess<T>;
    }
}
