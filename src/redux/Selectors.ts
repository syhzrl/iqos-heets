import auth from 'redux/slices/auth/Selectors';
import faq from 'redux/slices/faq/Selectors';
import analytics from 'redux/slices/analytics/selectors';

import { AnalyticsTypeEnum, IAnalyticsSelector, IFollowersAnalytics, IGrowthAnalytics, IInteractionsAnalytics, ILanguagesAnalytics, INotificationsAnalytics, IOverview, IPostsAnalytics, IViewsBySourceAnalytics } from 'entities/analytics';
import { IAgeCopyWriting, ICopyWriting, IFaq, ISearchQuery } from 'entities/faq';

import { RootState } from './store';

const authGetLoginAttempting = (state: RootState): boolean => auth.getLoginAttempting(state.auth);
const authGetLoginError = (state: RootState): string => auth.getLoginError(state.auth);

const getAuthAuthToken = (state: RootState): string => auth.getAuthToken(state.auth);
const getAuthStartupAttempting = (state: RootState): boolean => auth.getStartupAttempting(state.auth);
const getAuthStartupError = (state: RootState): string => auth.getStartupError(state.auth);

const getFaqFaqsAttempting = (state: RootState): boolean => faq.getFaqAttempting(state.faq);
const getFaqFaqsError = (state: RootState): string => faq.getFaqError(state.faq);
const getFaqFaqs = (state: RootState): IFaq[] => faq.getFaq(state.faq);

const getFaqWelcomeMsg = (state: RootState): IFaq | null => faq.getWelcomeMsg(state.faq);
const getFaqSetWelcomeMsgAttempting = (state: RootState): boolean => faq.getSetWelcomeMsgAttempting(state.faq);

const getFaqFaqsEditing = (state: RootState): boolean => faq.getFaqEditing(state.faq);

const getFaqSearchQuery = (state: RootState): string => faq.getSearchQuery(state.faq);

const getFaqSearchChipText = (state: RootState): string => faq.getSearchChipText(state.faq);

const getFaqSearchAutocomplete = (state: RootState): ISearchQuery[] => faq.getSearchAutocomplete(state.faq);
const getFaqSearchAutocompleteAttempt = (state: RootState): boolean => faq.getSearchAutocompleteAttempt(state.faq);
const getFaqSearchAutocompleteError = (state: RootState): string => faq.getSearchAutocompleteError(state.faq);
const getFaqNoSearchResults = (state: RootState): boolean => faq.getNoSearchResults(state.faq);

const getFaqSearchedFaqId = (state: RootState): string => faq.getSearchedFaqId(state.faq);

const getFaqCopyWriting = (state: RootState): ICopyWriting | null => faq.getCopyWriting(state.faq);
const getFaqSetCopyWritingAttempting = (state: RootState): boolean => faq.getSetCopyWritingAttempting(state.faq);

const getFaqGetAgeCopyWritingAttempting = (state: RootState): boolean => faq.getAgeCopyWritingAttempting(state.faq);
const getFaqGetAgeCopyWritingError = (state: RootState): string => faq.getAgeCopyWritingError(state.faq);
const getFaqGetAgeCopyWriting = (state: RootState): IAgeCopyWriting | null => faq.getAgeCopyWriting(state.faq);

const getFaqGetIsLANU = (state: RootState): boolean => faq.getIsLANU(state.faq);

const getAnalyticsGetSelectedAnalyticsType = (state: RootState): AnalyticsTypeEnum => analytics.getSelectedAnalyticsType(state.analytics);
const getAnalyticsGetAnalyticsDataAttempting = (state: RootState): boolean => analytics.getAnalyticsAttempting(state.analytics);
const getAnalyticsGetAnalyticsDataError = (state: RootState): string => analytics.getAnalyticsError(state.analytics);

const getAnalyticsGetAnalyticsSelector = (state: RootState): IAnalyticsSelector => analytics.getAnalyticsSelector(state.analytics);

const getAnalyticsGetAnalyticsToDownloadAttempting = (state: RootState): boolean => analytics.getAnalyticsToDownloadAttempting(state.analytics);
const getAnalyticsGetAnalyticsToDownloadError = (state: RootState): string => analytics.getAnalyticsToDownloadError(state.analytics);

const getAnalyticsIsMasterExportModalOpen = (state: RootState): boolean => analytics.isMasterExportModalOpen(state.analytics);

const getAnalyticsMasterExportAttempting = (state: RootState): boolean => analytics.masterExportAttempting(state.analytics);
const getAnalyticsMasterExportError = (state: RootState): string => analytics.masterExportError(state.analytics);

const getAnalyticsGetOverviewAttempting = (state: RootState): boolean => analytics.getOverviewAttempting(state.analytics);
const getAnalyticsGetOverviewError = (state: RootState): string => analytics.getOverviewError(state.analytics);
const getAnalyticsGetOverview = (state: RootState): IOverview => analytics.getOverview(state.analytics);

export default {
    authGetLoginAttempting,
    authGetLoginError,

    getAuthAuthToken,
    getAuthStartupAttempting,
    getAuthStartupError,

    getFaqFaqsAttempting,
    getFaqFaqsError,
    getFaqFaqs,

    getFaqWelcomeMsg,

    getFaqSetWelcomeMsgAttempting,

    getFaqFaqsEditing,

    getFaqSearchQuery,
    getFaqSearchChipText,

    getFaqSearchAutocomplete,
    getFaqSearchAutocompleteAttempt,
    getFaqSearchAutocompleteError,
    getFaqNoSearchResults,

    getFaqSearchedFaqId,

    getFaqCopyWriting,
    getFaqSetCopyWritingAttempting,

    getFaqGetAgeCopyWritingAttempting,
    getFaqGetAgeCopyWritingError,
    getFaqGetAgeCopyWriting,

    getFaqGetIsLANU,

    getAnalyticsGetSelectedAnalyticsType,
    getAnalyticsGetAnalyticsDataAttempting,
    getAnalyticsGetAnalyticsDataError,
    getAnalyticsGetAnalyticsSelector,

    getAnalyticsGetAnalyticsToDownloadAttempting,
    getAnalyticsGetAnalyticsToDownloadError,

    getAnalyticsIsMasterExportModalOpen,

    getAnalyticsMasterExportAttempting,
    getAnalyticsMasterExportError,

    getAnalyticsGetOverviewAttempting,
    getAnalyticsGetOverviewError,
    getAnalyticsGetOverview,
};
