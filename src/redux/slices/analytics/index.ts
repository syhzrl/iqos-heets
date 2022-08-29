import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Utils from 'lib/Utils';
import dayjs from 'dayjs';
import {
    AnalyticsTypeEnum,
    IFollowersAnalytics,
    IGrowthAnalytics,
    IInteractionsAnalytics,
    ILanguagesAnalytics,
    INotificationsAnalytics,
    IPostsAnalytics,
    IViewsBySourceAnalytics,
    IParsedLanguagesAnalytics,
    IHourAnalytics,
    INewLanguagesAnalytics,
    IAnalyticsSelector,
    IMasterExport,
    IOverview,
} from 'entities/analytics';

import SpreadSheetColumns, { ISpreadsheetColumn } from 'lib/SpreadSheetColumns';
import xlsx, { IContent } from 'json-as-xlsx';

import {
    AnalyticsReduxState,
    GetAnalyticsDataActionPayload,
} from './types';

const initialState: AnalyticsReduxState = {
    actions: {
        getAnalyticsData: false,
        getAnalyticsToDownload: false,
        masterExport: false,
        getOverview: false,
    },
    selectedAnalyticsType: AnalyticsTypeEnum.growth,
    analyticsSelector: {
        growth: [],
        followers: [],
        notifications: [],
        viewsBySource: [],
        languages: [],
        interactions: [],
        posts: [],
        hour: [],
    },
    analyticsToDownload: [],
    isMasterExportModalOpen: false,
    overview: {
        followers: {
            current: 0,
            previous: 0,
        },
        enabledNotifications: {
            enabled: 0,
            total: 0,
        },
        viewsPerPost: {
            current: 0,
            previous: 0,
        },
        sharesPerPost: {
            current: 0,
            previous: 0,
        },
    },
    error: {
        getAnalyticsData: '',
        getAnalyticsToDownload: '',
        masterExport: '',
        getOverview: '',
    },
};

const analytics = createSlice({
    name: 'analytics',
    initialState,
    reducers: {
        setAnalyticsType: (state, action: PayloadAction<AnalyticsTypeEnum>) => {
            state.selectedAnalyticsType = action.payload;
        },

        getAnalyticsAttempt: (state, _action: GetAnalyticsDataActionPayload) => {
            state.actions.getAnalyticsData = true;
            state.error.getAnalyticsData = '';
        },
        getAnalyticsSuccess: (state) => {
            state.actions.getAnalyticsData = false;
            state.error.getAnalyticsData = '';
        },
        getAnalyticsFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.getAnalyticsData = false;
            if (action.payload) {
                state.error.getAnalyticsData = action.payload;
            }
        },

        setAnalyticsGrowth: (state, action: PayloadAction<IGrowthAnalytics[]>) => {
            state.analyticsSelector.growth = action.payload;
        },
        setAnalyticsFollowers: (state, action: PayloadAction<IFollowersAnalytics[]>) => {
            state.analyticsSelector.followers = action.payload;
        },
        setAnalyticsNotifications: (state, action: PayloadAction<INotificationsAnalytics[]>) => {
            state.analyticsSelector.notifications = action.payload;
        },
        setAnalyticsViewsBySource: (state, action: PayloadAction<IViewsBySourceAnalytics[]>) => {
            state.analyticsSelector.viewsBySource = action.payload;
        },
        setAnalyticsLanguages: (state, action: PayloadAction<INewLanguagesAnalytics[]>) => {
            const parsedData = Utils.Analytics.prepareLanguageData(action.payload);

            state.analyticsSelector.languages = parsedData;
        },
        setAnalyticsInteractions: (state, action: PayloadAction<IInteractionsAnalytics[]>) => {
            state.analyticsSelector.interactions = action.payload;
        },
        setAnalyticsPosts: (state, action: PayloadAction<IPostsAnalytics[]>) => {
            const parsedData = action.payload.map(item => {
                const { createdAt, updatedAt } = item;

                return {
                    ...item,
                    createdAt: dayjs(createdAt).format('DD-MM-YYYY'),
                    updatedAt: dayjs(updatedAt).format('DD-MM-YYYY'),
                };
            });

            state.analyticsSelector.posts = parsedData;
        },
        setAnalyticsHour: (state, action: PayloadAction<IHourAnalytics[]>) => {
            state.analyticsSelector.hour = action.payload;
        },

        getAnalyticsToDownloadAttempt: (state, _action: GetAnalyticsDataActionPayload) => {
            state.actions.getAnalyticsToDownload = true;
            state.error.getAnalyticsToDownload = '';
        },
        getAnalyticsToDownloadSuccess: (state, action: PayloadAction<
            IFollowersAnalytics[]
            | IGrowthAnalytics[]
            | IInteractionsAnalytics[]
            | ILanguagesAnalytics[]
            | INotificationsAnalytics[]
            | IPostsAnalytics[]
            | IViewsBySourceAnalytics[]
            | IHourAnalytics[]
            | IContent[]
        >) => {
            state.actions.getAnalyticsToDownload = false;
            state.error.getAnalyticsToDownload = '';

            const { GrowthColumns, FollowersColumns, NotificationsColumns, ViewsBySourceColumns, InteractionsColumns, PostsColumns } = SpreadSheetColumns;
            let sheetName = '';
            let sheetColumns: ISpreadsheetColumn[] = [];
            let sheetContent: IContent[] = [];

            switch (state.selectedAnalyticsType) {
                case AnalyticsTypeEnum.growth:
                    sheetName = 'Growth';
                    sheetColumns = GrowthColumns;
                    sheetContent = action.payload as IContent[];
                    break;
                case AnalyticsTypeEnum.followers:
                    sheetName = 'Followers';
                    sheetColumns = FollowersColumns;
                    sheetContent = action.payload as IContent[];
                    break;
                case AnalyticsTypeEnum.notifications:
                    sheetName = 'Notifications';
                    sheetColumns = NotificationsColumns;
                    sheetContent = action.payload as IContent[];
                    break;
                case AnalyticsTypeEnum.viewBySources:
                    sheetName = 'Views By Sources';
                    sheetColumns = ViewsBySourceColumns;
                    sheetContent = action.payload as IContent[];
                    break;
                case AnalyticsTypeEnum.languages:
                    sheetName = 'Languages';
                    sheetContent = Utils.Analytics.prepareLanguageData(action.payload as INewLanguagesAnalytics[]) as IContent[];
                    sheetColumns = Utils.Analytics.prepareDynamicDownloadHeaders(sheetContent as INewLanguagesAnalytics[]);
                    break;
                case AnalyticsTypeEnum.interaction:
                    sheetName = 'Interaction';
                    sheetColumns = InteractionsColumns;
                    sheetContent = action.payload as IContent[];
                    break;
                case AnalyticsTypeEnum.posts:
                    sheetName = 'Posts';
                    sheetColumns = PostsColumns;
                    sheetContent = action.payload as IContent[];
                    break;
                case AnalyticsTypeEnum.hour:
                    sheetName = 'Hour';
                    sheetColumns = Utils.Analytics.prepareDynamicDownloadHeaders(action.payload as IHourAnalytics[]);
                    sheetContent = action.payload as IContent[];
                    break;
                default:
            }

            const dataToDownload = [{
                sheet: sheetName,
                columns: sheetColumns,
                content: sheetContent, // this type is needed for json-as-xlsx
            }];

            xlsx(dataToDownload, { fileName: 'Channel Statistics' });
        },
        getAnalyticsToDownloadFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.getAnalyticsToDownload = false;
            if (action.payload) {
                state.error.getAnalyticsToDownload = action.payload;
            }
        },
        getAnalyticsToDownloadEmpty: (state) => {
            state.actions.getAnalyticsToDownload = false;
            state.error.getAnalyticsToDownload = '';
        },

        setMasterExportModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isMasterExportModalOpen = action.payload;
        },

        masterExportAttempt: (state, _action: GetAnalyticsDataActionPayload) => {
            state.actions.masterExport = true;
            state.error.masterExport = '';
        },
        masterExportSuccess: (state, action: PayloadAction<IMasterExport>) => {
            state.actions.masterExport = false;
            state.error.masterExport = '';

            const {
                GrowthColumns,
                FollowersColumns,
                NotificationsColumns,
                ViewsBySourceColumns,
                InteractionsColumns,
                PostsColumns,
            } = SpreadSheetColumns;

            const { growth, followers, notifications, viewsBySource, languages, interactions, posts, hours } = action.payload;

            const parsedLangData = Utils.Analytics.prepareLanguageData(languages as INewLanguagesAnalytics[]);

            const parsedPostData = posts.map(item => {
                const { createdAt, updatedAt } = item;

                return {
                    ...item,
                    createdAt: dayjs(createdAt as string).format('DD-MM-YYYY'),
                    updatedAt: dayjs(updatedAt as string).format('DD-MM-YYYY'),
                };
            });

            const dataToDownload = [{
                sheet: 'Growth',
                columns: GrowthColumns,
                content: growth as IContent[],
            },
            {
                sheet: 'Followers',
                columns: FollowersColumns,
                content: followers as IContent[],
            },
            {
                sheet: 'Notifications',
                columns: NotificationsColumns,
                content: notifications as IContent[],
            },
            {
                sheet: 'Views By Source',
                columns: ViewsBySourceColumns,
                content: viewsBySource as IContent[],
            },
            {
                sheet: 'Languages',
                columns: Utils.Analytics.prepareDynamicDownloadHeaders(parsedLangData as INewLanguagesAnalytics[]),
                content: parsedLangData as IContent[],
            },
            {
                sheet: 'Interactions',
                columns: InteractionsColumns,
                content: interactions as IContent[],
            },
            {
                sheet: 'Posts',
                columns: PostsColumns,
                content: parsedPostData as IContent[],
            },
            {
                sheet: 'Views By Hour',
                columns: Utils.Analytics.prepareDynamicDownloadHeaders(hours as IHourAnalytics[]),
                content: hours as IContent[],
            }];

            xlsx(dataToDownload, { fileName: 'Channel Statistics Master Export' });
        },
        masterExportFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.masterExport = false;
            if (action.payload) {
                state.error.masterExport = action.payload;
            }
        },
        masterExportEmpty: (state) => {
            state.actions.masterExport = false;
            state.error.masterExport = '';
        },

        getOverviewAttempt: (state) => {
            state.actions.getOverview = true;
            state.error.getOverview = '';
        },
        getOverviewSuccess: (state, action: PayloadAction<IOverview>) => {
            state.actions.getOverview = false;
            state.error.getOverview = '';

            state.overview = action.payload;
        },
        getOverviewFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.getOverview = false;
            if (action.payload) {
                state.error.getOverview = action.payload;
            }
        },
    },
});

export type AnalyticsState = typeof initialState;

export default {
    actions: analytics.actions,
    reducers: analytics.reducer,
};
