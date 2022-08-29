import { ApiResponse } from 'apisauce';
import { GatewayResponse } from 'api/types/types';

import { IAnalyticsSelector, IFollowersAnalytics, IGrowthAnalytics, IHourAnalytics, IInteractionsAnalytics, ILanguagesAnalytics, IMasterExport, INewLanguagesAnalytics, INotificationsAnalytics, IOverview, IPostsAnalytics, IViewsBySourceAnalytics } from 'entities/analytics';

import { GetAnalyticsDataParams, GetOverviewParams, IAnalyticsGateway } from './AnalyticsBase';

const getHeaders = (authToken: string) => ({
    headers: {
        Authorization: `Bearer ${authToken}`,
    },
});

export default class AnalyticsGateway extends IAnalyticsGateway {
    async getGrowth(params: GetAnalyticsDataParams): GatewayResponse<IGrowthAnalytics[]> {
        const response: ApiResponse<IGrowthAnalytics[]> = await this.api.get('/v1/analytics/growth', params.date, getHeaders(params.authToken));
        return this.process(response);
    }

    async getFollowers(params: GetAnalyticsDataParams): GatewayResponse<IFollowersAnalytics[]> {
        const response: ApiResponse<IFollowersAnalytics[]> = await this.api.get('/v1/analytics/followers', params.date, getHeaders(params.authToken));
        return this.process(response);
    }

    async getNotifications(params: GetAnalyticsDataParams): GatewayResponse<INotificationsAnalytics[]> {
        const response: ApiResponse<INotificationsAnalytics[]> = await this.api.get('/v1/analytics/notifications', params.date, getHeaders(params.authToken));
        return this.process(response);
    }

    async getViewsBySource(params: GetAnalyticsDataParams): GatewayResponse<IViewsBySourceAnalytics[]> {
        const response: ApiResponse<IViewsBySourceAnalytics[]> = await this.api.get('/v1/analytics/viewsBySource', params.date, getHeaders(params.authToken));
        return this.process(response);
    }

    async getLanguages(params: GetAnalyticsDataParams): GatewayResponse<INewLanguagesAnalytics[]> {
        const response: ApiResponse<INewLanguagesAnalytics[]> = await this.api.get('/v1/analytics/languages', params.date, getHeaders(params.authToken));
        return this.process(response);
    }

    async getInteractions(params: GetAnalyticsDataParams): GatewayResponse<IInteractionsAnalytics[]> {
        const response: ApiResponse<IInteractionsAnalytics[]> = await this.api.get('/v1/analytics/interactions', params.date, getHeaders(params.authToken));
        return this.process(response);
    }

    async getPosts(params: GetAnalyticsDataParams): GatewayResponse<IPostsAnalytics[]> {
        const response: ApiResponse<IPostsAnalytics[]> = await this.api.get('/v1/analytics/posts', params.date, getHeaders(params.authToken));
        return this.process(response);
    }

    async getHour(params: GetAnalyticsDataParams): GatewayResponse<IHourAnalytics[]> {
        const response: ApiResponse<IHourAnalytics[]> = await this.api.get('/v1/analytics/hours', params.date, getHeaders(params.authToken));
        return this.process(response);
    }

    async masterExport(params: GetAnalyticsDataParams): GatewayResponse<IMasterExport> {
        const response: ApiResponse<IMasterExport> = await this.api.get('/v1/analytics/masterExport', params.date, getHeaders(params.authToken));
        return this.process(response);
    }

    async getOverview(params: GetOverviewParams): GatewayResponse<IOverview> {
        const response: ApiResponse<IOverview> = await this.api.get('/v1/analytics/overview', {}, getHeaders(params.authToken));
        return this.process(response);
    }
}
