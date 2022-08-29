import { put, call, select, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';
import { GatewayResponseStatus } from 'api/types/types';

import AnalyticsGateway from 'api/Analytics';
import LanuAnalyticsGateway from 'api/LanuAnalytics';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';

export default function* watchGetOverview(api: AnalyticsGateway, lanuApi: LanuAnalyticsGateway): SagaWatcherReturnType {
    yield takeEvery('analytics/getOverviewAttempt', handleGetOverview, api, lanuApi);
}

function* handleGetOverview(api: AnalyticsGateway, lanuApi: LanuAnalyticsGateway) {
    const authToken = yield* select(Selectors.getAuthAuthToken);
    const isLanu = yield* select(Selectors.getFaqGetIsLANU);

    let response;

    if (isLanu) {
        response = yield* call([lanuApi, lanuApi.getOverview], { authToken });
    } else {
        response = yield* call([api, api.getOverview], { authToken });
    }

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.getOverviewFailure(response.message || ''));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        yield put(Actions.getOverviewSuccess(response.data));
    }
}
