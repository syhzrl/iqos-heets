import { ApiResponse } from 'apisauce';

import { GatewayResponse } from 'api/types/types';
import { IAgeCopyWriting, ICopyWriting, IFaq, ISearchQuery, IServerFaq } from 'entities/faq';

import {
    GetFaqParams,
    GetFaqResponse,
    IFaqGateway,
    CreateFaqParams,
    EditFaqParams,
    DeleteFaqParams,
    ReorderFaqParams,
    SetWelcomeMsgParams,
    SearchAutocompleteParams,
    GetCopyWritingParams,
    SetCopyWritingParams,
    GetAgeCopyWritingParams,
    SetAgeCopyWritingParams,
} from './FaqBase';

const getHeaders = (authToken: string) => ({
    headers: {
        Authorization: `Bearer ${authToken}`,
    },
});

export default class FaqGateway extends IFaqGateway {
    async getFaq(params: GetFaqParams): GatewayResponse<GetFaqResponse> {
        const response: ApiResponse<GetFaqResponse> = await this.api.get('/v1/faq/', {}, getHeaders(params.authToken));
        return this.process(response);
    }

    async createFaq(params: CreateFaqParams): GatewayResponse<IServerFaq> {
        const response: ApiResponse<IServerFaq> = await this.api.post('/v1/faq', params.data, getHeaders(params.authToken));
        return this.process(response);
    }

    async editFaq(params: EditFaqParams): GatewayResponse<IFaq> {
        const response: ApiResponse<IFaq> = await this.api.put('/v1/faq', params.data, getHeaders(params.authToken));
        return this.process(response);
    }

    async reorderFaq(params: ReorderFaqParams): GatewayResponse<IServerFaq[]> {
        const response: ApiResponse<IServerFaq[]> = await this.api.put('/v1/faq/reorder', params.data, getHeaders(params.authToken));
        return this.process(response);
    }

    async deleteFaq(params: DeleteFaqParams): GatewayResponse<string> {
        const data = {
            id: params.id,
        };

        const response: ApiResponse<string> = await this.api.delete('/v1/faq', {}, {
            ...getHeaders(params.authToken), data,
        });

        return this.process(response);
    }

    async setWelcomeMsg(params: SetWelcomeMsgParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.put('/v1/faq/welcomeMessage', {
            welcomeMsg: params.welcomeMsg,
        }, getHeaders(params.authToken));

        return this.process(response);
    }

    async searchAutocomplete(params: SearchAutocompleteParams): GatewayResponse<ISearchQuery[]> {
        const { query, authToken } = params;
        const response: ApiResponse<ISearchQuery[]> = await this.api.post('/v1/faq/search', { query }, getHeaders(authToken));
        return this.process(response);
    }

    async setCopyWriting(params: SetCopyWritingParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.put('/v1/copy/faq', params.data, getHeaders(params.authToken));
        return this.process(response);
    }

    async getCopyWriting(params: GetCopyWritingParams): GatewayResponse<ICopyWriting> {
        const response: ApiResponse<ICopyWriting> = await this.api.get('/v1/copy/faq', {}, getHeaders(params.authToken));
        return this.process(response);
    }

    async getAgeCopyWriting(params: GetAgeCopyWritingParams): GatewayResponse<IAgeCopyWriting> {
        const response: ApiResponse<IAgeCopyWriting> = await this.api.get('/v1/copy/age', {}, getHeaders(params.authToken));
        return this.process(response);
    }

    async setAgeCopyWriting(params: SetAgeCopyWritingParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.put('/v1/copy/age', params.data, getHeaders(params.authToken));
        return this.process(response);
    }
}
