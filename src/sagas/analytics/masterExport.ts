import { put, call, select, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';
import { GatewayResponseStatus } from 'api/types/types';

import AnalyticsGateway from 'api/Analytics';
import LanuAnalyticsGateway from 'api/LanuAnalytics';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

import { GetAnalyticsDataActionPayload } from 'redux/slices/analytics/types';
import { toast } from 'react-toastify';

export default function* watchMasterExport(api: AnalyticsGateway, lanuApi: LanuAnalyticsGateway): SagaWatcherReturnType {
    yield takeEvery('analytics/masterExportAttempt', handleMasterExport, api, lanuApi);
}

function* handleMasterExport(api: AnalyticsGateway, lanuApi: LanuAnalyticsGateway, data: GetAnalyticsDataActionPayload) {
    const authToken = yield* select(Selectors.getAuthAuthToken);
    const isLanu = yield* select(Selectors.getFaqGetIsLANU);

    let response;

    if (isLanu) {
        response = yield* call([lanuApi, lanuApi.masterExport], { authToken, date: data.payload });
    } else {
        response = yield* call([api, api.masterExport], { authToken, date: data.payload });
    }

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.masterExportFailure(response.message || ''));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        const { followers, growth, notifications, viewsBySource, languages, posts, hours } = response.data;

        if (!followers.length
            && !growth.length
            && !notifications.length
            && !viewsBySource.length
            && !languages.length
            && !posts.length
            && !hours.length
        ) {
            toast.error('Insufficient data to export');
            yield put(Actions.masterExportEmpty());
            yield put(Actions.setMasterExportModalOpen(false));
            return;
        }

        yield put(Actions.masterExportSuccess(response.data));
        yield put(Actions.setMasterExportModalOpen(false));
    }
}
