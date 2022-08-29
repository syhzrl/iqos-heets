import { IContent } from 'json-as-xlsx';

export enum AnalyticsTypeEnum {
    growth = 1,
    followers = 2,
    notifications = 3,
    viewBySources = 4,
    languages = 5,
    interaction = 6,
    posts = 7,
    hour = 8,
}

export interface IGrowthAnalytics {
    date: string;
    totalFollowers: number;
}

export interface IFollowersAnalytics {
    date: string;
    joined: number;
    left: number;
}

export interface INotificationsAnalytics {
    date: string;
    muted: number;
    unmuted: number;
}

export interface IViewsBySourceAnalytics {
    date: string;
    followers: number;
    other: number;
    channels: number;
    pm: number;
    total: number;
}

export interface ILanguagesAnalytics {
    date: string;
    english: string;
    malay: string;
    'chinese-simp': string;
    'chinese-trad': string;
    indonesia: string;
    japanese: string;
    korean: string;
    total: string;
}

export interface INewLanguagesAnalytics {
    date: string;
    [key: string]: number | string;
}

// English: number;
// Malay: number;
// 'Chinese (Simplified)': number;
// 'Chinese (Traditional)': number;
// Indonesian: number;
// Japanese: number;
// Korean: number;
// Others: number;

export interface IParsedLanguagesAnalytics {
    date: string;
    english: string;
    malay: string;
    'chinese-simp': string;
    'chinese-trad': string;
    indonesia: string;
    japanese: string;
    korean: string;
}

export interface IInteractionsAnalytics {
    date: string;
    views: number;
    shares: number;
}

export interface IPostsAnalytics {
    title: string;
    createdAt: string;
    views: number;
    shares: number;
    updatedAt: string;
}

export interface IHourAnalytics {
    hour: number;
    // views: number;
    // dateRange: string;
    [key: string]: number;
}

export interface IParsedHourAnalytics {
    hour: number;
    views: number;
}

export interface IAnalyticsSelector {
    growth: IGrowthAnalytics[];
    followers: IFollowersAnalytics[];
    notifications: INotificationsAnalytics[];
    viewsBySource: IViewsBySourceAnalytics[];
    languages: INewLanguagesAnalytics[];
    interactions: IInteractionsAnalytics[];
    posts: IPostsAnalytics[];
    hour: IHourAnalytics[];
}

export interface IMasterExport {
    growth: IGrowthAnalytics[] | IContent[];
    followers: IFollowersAnalytics[] | IContent[];
    notifications: INotificationsAnalytics[] | IContent[];
    viewsBySource: IViewsBySourceAnalytics[] | IContent[];
    languages: INewLanguagesAnalytics[] | IContent[];
    interactions: IInteractionsAnalytics[] | IContent[];
    posts: IPostsAnalytics[] | IContent[];
    hours: IHourAnalytics[] | IContent[];
}

export interface IOverview {
    followers: {
        previous: number;
        current: number;
    };
    viewsPerPost: {
        previous: number;
        current: number;
    },
    enabledNotifications: {
        enabled: number;
        total: number;
    },
    sharesPerPost: {
        previous: number;
        current: number;
    },
}
