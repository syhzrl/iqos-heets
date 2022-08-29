import { AnalyticsTypeEnum, IAnalyticsSelector, IFollowersAnalytics, IGrowthAnalytics, IInteractionsAnalytics, ILanguagesAnalytics, INotificationsAnalytics, IOverview, IPostsAnalytics, IViewsBySourceAnalytics } from 'entities/analytics';
import { AnalyticsState } from '.';

const getSelectedAnalyticsType = (state: AnalyticsState): AnalyticsTypeEnum => state.selectedAnalyticsType || AnalyticsTypeEnum.growth;

const getAnalyticsAttempting = (state: AnalyticsState): boolean => state.actions.getAnalyticsData || false;
const getAnalyticsError = (state: AnalyticsState): string => state.error.getAnalyticsData || '';
const getAnalyticsSelector = (state: AnalyticsState): IAnalyticsSelector => state.analyticsSelector || undefined;

const getAnalyticsToDownloadAttempting = (state: AnalyticsState): boolean => state.actions.getAnalyticsToDownload || false;
const getAnalyticsToDownloadError = (state: AnalyticsState): string => state.error.getAnalyticsToDownload || '';

const isMasterExportModalOpen = (state: AnalyticsState): boolean => state.isMasterExportModalOpen || false;

const masterExportAttempting = (state: AnalyticsState): boolean => state.actions.masterExport || false;
const masterExportError = (state: AnalyticsState): string => state.error.masterExport || '';

const getOverviewAttempting = (state: AnalyticsState): boolean => state.actions.getOverview || false;
const getOverviewError = (state: AnalyticsState): string => state.error.getOverview || '';
const getOverview = (state: AnalyticsState): IOverview => state.overview || null;

export default {
    getSelectedAnalyticsType,

    getAnalyticsAttempting,
    getAnalyticsError,
    getAnalyticsSelector,

    getAnalyticsToDownloadAttempting,
    getAnalyticsToDownloadError,

    isMasterExportModalOpen,

    masterExportAttempting,
    masterExportError,

    getOverviewAttempting,
    getOverviewError,
    getOverview,
};
