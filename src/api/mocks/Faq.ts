import { GatewayResponse, GatewayResponseStatus } from 'api/types/types';
import Gateway from 'api/types/Gateway';

import { IFaq } from 'entities/faq';

const simulateApi = (response: any) => {
    return new Promise(res => {
        setTimeout(() => {
            res(response);
        }, 1000);
    });
};

export default class FaqGateway extends Gateway {
    async getFaq(): GatewayResponse<IFaq[]> {
        const response = await simulateApi([{
            id: '1', // 1
            title: 'Promoszz',
            messages: [{
                text: 'Welcome to Promos.',
                type: 'Text',
            }],
            orderId: 0,
            children: [{
                id: '1-1',
                title: 'Promos',
                messages: [{
                    text: 'Welcome to Promos.',
                    type: 'Text',
                }],
                orderId: 0,
                children: [],
            }, {
                id: '1-2',
                title: 'The caption is here',
                messages: [{
                    caption: 'The caption is here',
                    text: 'The link will be here',
                    type: 'Video',
                }],
                orderId: 1,
            }],
        }, {
            id: '2',
            title: 'Promos',
            messages: [{
                text: 'Welcome to Promos.',
                type: 'Text',
            }],
            orderId: 1,
        }]);

        return {
            status: GatewayResponseStatus.Success,
            data: response as IFaq[],
        };
    }

    async createFaq(): GatewayResponse<IFaq> {
        const response = await simulateApi({
            id: '61ce93cdf06bd3236fbf2974',
            title: 'second doc from root1',
            messages: [{
                text: 'second doc from root1',
                type: 'Text',
            }],
            parentId: '2', // 61ce8580ca2a431f02b252eb
            orderId: 0,
        });

        return {
            status: GatewayResponseStatus.Success,
            data: response as IFaq,
        };
    }

    async editFaq(): GatewayResponse<IFaq> {
        const response = await simulateApi({
            id: '61ce93cdf06bd3236fbf2974',
            title: 'second doc from root1',
            messages: [{
                text: 'second doc from root1',
                type: 'Text',
            }],
            parentId: '61ce8580ca2a431f02b252eb',
            orderId: 0,
        });

        return {
            status: GatewayResponseStatus.Success,
            data: response as IFaq,
        };
    }

    async deleteFaq(): GatewayResponse<string> {
        const response = await simulateApi('OK');

        return {
            status: GatewayResponseStatus.Success,
            data: response as string,
        };
    }
}
