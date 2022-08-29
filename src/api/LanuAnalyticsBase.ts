import Gateway from 'api/types/Gateway';
import { GatewayResponse } from 'api/types/types';
import {
    IFollowersAnalytics,
    IGrowthAnalytics,
    IHourAnalytics,
    IInteractionsAnalytics,
    ILanguagesAnalytics,
    IMasterExport,
    INotificationsAnalytics,
    IOverview,
    IPostsAnalytics,
    IViewsBySourceAnalytics,
} from 'entities/analytics';

export interface GetAnalyticsDataParams {
    date: {
        dateFrom: string;
        dateTo: string;
    }
    authToken: string;
}

export interface GetOverviewParams {
    authToken: string;
}

export abstract class ILanuAnalyticsGateway extends Gateway {
    abstract getGrowth(params: GetAnalyticsDataParams): GatewayResponse<IGrowthAnalytics[]>;

    abstract getFollowers(params: GetAnalyticsDataParams): GatewayResponse<IFollowersAnalytics[]>;

    abstract getNotifications(params: GetAnalyticsDataParams): GatewayResponse<INotificationsAnalytics[]>;

    abstract getViewsBySource(params: GetAnalyticsDataParams): GatewayResponse<IViewsBySourceAnalytics[]>;

    abstract getLanguages(params: GetAnalyticsDataParams): GatewayResponse<ILanguagesAnalytics[]>;

    abstract getInteractions(params: GetAnalyticsDataParams): GatewayResponse<IInteractionsAnalytics[]>;

    abstract getPosts(params: GetAnalyticsDataParams): GatewayResponse<IPostsAnalytics[]>;

    abstract getHour(params: GetAnalyticsDataParams): GatewayResponse<IHourAnalytics[]>;

    abstract masterExport(params: GetAnalyticsDataParams): GatewayResponse<IMasterExport>;

    abstract getOverview(params: GetOverviewParams): GatewayResponse<IOverview>;
}
