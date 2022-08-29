import { put, call, select, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';
import { GatewayResponseStatus } from 'api/types/types';

import AnalyticsGateway from 'api/Analytics';
import LanuAnalyticsGateway from 'api/LanuAnalytics';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { GetAnalyticsDataActionPayload } from 'redux/slices/analytics/types';
import { AnalyticsTypeEnum, IFollowersAnalytics, IGrowthAnalytics, IHourAnalytics, IInteractionsAnalytics, ILanguagesAnalytics, INewLanguagesAnalytics, INotificationsAnalytics, IPostsAnalytics, IViewsBySourceAnalytics } from 'entities/analytics';

export default function* watchGetAnalytics(api: AnalyticsGateway, lanuApi: LanuAnalyticsGateway): SagaWatcherReturnType {
    yield takeEvery('analytics/getAnalyticsAttempt', handleGetAnalytics, api, lanuApi);
}

function* handleGetAnalytics(api: AnalyticsGateway, lanuApi: LanuAnalyticsGateway, data: GetAnalyticsDataActionPayload) {
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
        yield put(Actions.getAnalyticsFailure(response.message || ''));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.getAnalyticsSuccess());

        switch (selectedAnalyticsType) {
            case AnalyticsTypeEnum.growth: yield put(Actions.setAnalyticsGrowth(response.data as IGrowthAnalytics[])); break;
            case AnalyticsTypeEnum.followers: yield put(Actions.setAnalyticsFollowers(response.data as IFollowersAnalytics[])); break;
            case AnalyticsTypeEnum.notifications: yield put(Actions.setAnalyticsNotifications(response.data as INotificationsAnalytics[])); break;
            case AnalyticsTypeEnum.viewBySources: yield put(Actions.setAnalyticsViewsBySource(response.data as IViewsBySourceAnalytics[])); break;
            case AnalyticsTypeEnum.languages: yield put(Actions.setAnalyticsLanguages(response.data as INewLanguagesAnalytics[])); break;
            case AnalyticsTypeEnum.interaction: yield put(Actions.setAnalyticsInteractions(response.data as IInteractionsAnalytics[])); break;
            case AnalyticsTypeEnum.posts: yield put(Actions.setAnalyticsPosts(response.data as IPostsAnalytics[])); break;
            case AnalyticsTypeEnum.hour: yield put(Actions.setAnalyticsHour(response.data as IHourAnalytics[])); break;
            default:
        }
    }
}
