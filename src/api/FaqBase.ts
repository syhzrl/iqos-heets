import Gateway from 'api/types/Gateway';
import { GatewayResponse } from 'api/types/types';

import { IEditFaqDTO, IFaq, IServerFaq, ISearchQuery, ICopyWriting, IAgeCopyWriting } from 'entities/faq';
import { ICreateFaqDTO } from 'redux/slices/faq/types';

export interface GetFaqParams {
    authToken: string;
}

export interface GetFaqResponse {
    welcomeFaq: IFaq;
    data: IFaq[];
}

export interface CreateFaqParams {
    data: ICreateFaqDTO;
    authToken: string;
}

export interface EditFaqParams {
    data: IEditFaqDTO;
    authToken: string;
}

export interface ReorderFaqParams {
    data: {
        id: string;
        direction: string;
    };
    authToken: string;
}

export interface DeleteFaqParams {
    id: string;
    authToken: string;
}

export interface SetWelcomeMsgParams {
    welcomeMsg: string;
    authToken: string;
}

export interface SearchAutocompleteParams {
    query: string;
    authToken: string;
}

export interface SetCopyWritingParams {
    data: ICopyWriting;
    authToken: string;
}

export interface GetCopyWritingParams {
    authToken: string;
}

export interface GetAgeCopyWritingParams {
    authToken: string;
}

export interface SetAgeCopyWritingParams {
    data: IAgeCopyWriting;
    authToken: string;
}

export abstract class IFaqGateway extends Gateway {
    abstract getFaq(params: GetFaqParams): GatewayResponse<GetFaqResponse>;

    abstract createFaq(params: CreateFaqParams): GatewayResponse<IFaq>;

    abstract editFaq(params: EditFaqParams): GatewayResponse<IFaq>;

    abstract reorderFaq(params: ReorderFaqParams): GatewayResponse<IServerFaq[]>;

    abstract deleteFaq(params: DeleteFaqParams): GatewayResponse<string>;

    abstract setWelcomeMsg(params: SetWelcomeMsgParams): GatewayResponse<null>;

    abstract searchAutocomplete(params: SearchAutocompleteParams): GatewayResponse<ISearchQuery[]>;

    abstract getCopyWriting(params: GetCopyWritingParams): GatewayResponse<ICopyWriting>;

    abstract setCopyWriting(params: SetCopyWritingParams): GatewayResponse<null>;

    abstract getAgeCopyWriting(params: GetAgeCopyWritingParams): GatewayResponse<IAgeCopyWriting>;

    abstract setAgeCopyWriting(params: SetAgeCopyWritingParams): GatewayResponse<null>;
}
