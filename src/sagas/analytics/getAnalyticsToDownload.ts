import { put, call, select, takeEvery, delay } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';
import { GatewayResponseStatus } from 'api/types/types';

import AnalyticsGateway from 'api/Analytics';
import LanuAnalyticsGateway from 'api/LanuAnalytics';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import MockAnalyticsData from 'lib/MockAnalyticsData';

import { GetAnalyticsDataActionPayload } from 'redux/slices/analytics/types';
import { AnalyticsTypeEnum, IFollowersAnalytics, IGrowthAnalytics, IInteractionsAnalytics, ILanguagesAnalytics, INotificationsAnalytics, IPostsAnalytics, IViewsBySourceAnalytics } from 'entities/analytics';
import { toast } from 'react-toastify';

export default function* watchGetAnalyticsToDownload(api: AnalyticsGateway, lanuApi: LanuAnalyticsGateway): SagaWatcherReturnType {
    yield takeEvery('analytics/getAnalyticsToDownloadAttempt', handleGetAnalyticsToDownload, api, lanuApi);
}

function* handleGetAnalyticsToDownload(api: AnalyticsGateway, lanuApi: LanuAnalyticsGateway, data: GetAnalyticsDataActionPayload) {
    const authToken = yield* select(Selectors.getAuthAuthToken);
    const isLanu = yield* select(Selectors.getFaqGetIsLANU);
    const selectedAnalyticsType = yield* select(Selectors.getAnalyticsGetSelectedAnalyticsType);

    let response;
    let apiToCall;

    if (isLanu) {
        switch (selectedAnalyticsType) {
            case AnalyticsTypeEnum.followers: apiToCall = lanuApi.getFollowers; break;
            case AnalyticsTypeEnum.notifications: apiToCall = lanuApi.getNotifications; break;
            case AnalyticsTypeEnum.viewBySources: apiToCall = lanuApi.getViewsBySource; break;
            case AnalyticsTypeEnum.languages: apiToCall = lanuApi.getLanguages; break;
            case AnalyticsTypeEnum.interaction: apiToCall = lanuApi.getInteractions; break;
            case AnalyticsTypeEnum.posts: apiToCall = lanuApi.getPosts; break;
            case AnalyticsTypeEnum.hour: apiToCall = lanuApi.getHour; break;
            default: apiToCall = lanuApi.getGrowth; break;
        }

        response = yield* call([lanuApi, apiToCall], { authToken, date: data.payload });
    } else {
        switch (selectedAnalyticsType) {
            case AnalyticsTypeEnum.followers: apiToCall = api.getFollowers; break;
            case AnalyticsTypeEnum.notifications: apiToCall = api.getNotifications; break;
            case AnalyticsTypeEnum.viewBySources: apiToCall = api.getViewsBySource; break;
            case AnalyticsTypeEnum.languages: apiToCall = api.getLanguages; break;
            case AnalyticsTypeEnum.interaction: apiToCall = api.getInteractions; break;
            case AnalyticsTypeEnum.posts: apiToCall = api.getPosts; break;
            case AnalyticsTypeEnum.hour: apiToCall = api.getHour; break;
            default: apiToCall = api.getGrowth; break;
        }

        response = yield* call([api, apiToCall], { authToken, date: data.payload });
    }

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.getAnalyticsToDownloadFailure(response.message || ''));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        if (!response.data.length) {
            toast.error('Insufficient data to export');
            yield put(Actions.getAnalyticsToDownloadEmpty());
            return;
        }
        yield put(Actions.getAnalyticsToDownloadSuccess(response.data));
    }
}
