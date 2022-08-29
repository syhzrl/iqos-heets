import { put, call, select, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import FaqGateway from 'api/Faq';

import Actions from 'redux/Actions';
import { GatewayResponseStatus } from 'api/types/types';

import Selectors from 'redux/Selectors';
import LanuFaqGateway from 'api/LanuFaq';

export default function* watchGetCopyWriting(api: FaqGateway, lanuApi: LanuFaqGateway): SagaWatcherReturnType {
    yield takeEvery('faq/getCopyWritingAttempt', handleGetCopyWriting, api, lanuApi);
}

function* handleGetCopyWriting(api: FaqGateway, lanuApi: LanuFaqGateway) {
    const authToken = yield* select(Selectors.getAuthAuthToken);
    const isLanu = yield* select(Selectors.getFaqGetIsLANU);

    let response;

    if (isLanu) {
        response = yield* call([lanuApi, lanuApi.getCopyWriting], { authToken });
    } else {
        response = yield* call([api, api.getCopyWriting], { authToken });
    }

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.getCopyWritingFailure(response.message || ''));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        if (!response.data) {
            yield put(Actions.getCopyWritingFailure('Something went wrong. Please try again.'));
            return;
        }

        yield put(Actions.getCopyWritingSuccess(response.data));
    }
}
