import { ApiResponse } from 'apisauce';

export type APIResponse<T> = Promise<ApiResponse<T>>;

export enum GatewayResponseStatus {
    Error,
    Success,
}

export type GatewayResponseSuccess<T> = {
    status: GatewayResponseStatus.Success,
    data: T,
}

export type GatewayResponseError = {
    status: GatewayResponseStatus.Error,
    code?: string;
    name?: string;
    message?: string;
}

export type GatewayResponseAwaited<T> = GatewayResponseSuccess<T> | GatewayResponseError;
export type GatewayResponse<T> = Promise<GatewayResponseAwaited<T>>;
