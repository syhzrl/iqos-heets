import { PayloadAction } from '@reduxjs/toolkit';
import { AnalyticsTypeEnum, IAnalyticsSelector, IFollowersAnalytics, IGrowthAnalytics, IInteractionsAnalytics, ILanguagesAnalytics, INotificationsAnalytics, IPostsAnalytics, IViewsBySourceAnalytics, IHourAnalytics, INewLanguagesAnalytics, IOverview } from 'entities/analytics';

export interface AnalyticsReduxState {
    actions: {
        getAnalyticsData: boolean;
        getAnalyticsToDownload: boolean;
        masterExport: boolean;
        getOverview: boolean;
    },
    selectedAnalyticsType: AnalyticsTypeEnum;
    analyticsSelector: IAnalyticsSelector;
    analyticsToDownload: IFollowersAnalytics[]
    | IGrowthAnalytics[]
    | IInteractionsAnalytics[]
    | ILanguagesAnalytics[]
    | INotificationsAnalytics[]
    | IPostsAnalytics[]
    | IViewsBySourceAnalytics[]
    | IHourAnalytics[]
    | INewLanguagesAnalytics[]
    isMasterExportModalOpen: boolean;
    overview: IOverview;
    error: {
        getAnalyticsData: string;
        getAnalyticsToDownload: string;
        masterExport: string;
        getOverview: string;
    },
}

export type GetAnalyticsDataActionPayload = PayloadAction<{
    dateFrom: string;
    dateTo: string;
}>;
