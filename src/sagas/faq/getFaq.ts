import { put, call, select, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import FaqGateway from 'api/Faq';

import Actions from 'redux/Actions';
import { GatewayResponseStatus } from 'api/types/types';

import Selectors from 'redux/Selectors';
import LanuFaqGateway from 'api/LanuFaq';

export default function* watchGetFaq(api: FaqGateway, lanuApi: LanuFaqGateway): SagaWatcherReturnType {
    yield takeEvery('faq/getAttempt', handleGetFaq, api, lanuApi);
}

function* handleGetFaq(api: FaqGateway, lanuApi: LanuFaqGateway) {
    const authToken = yield* select(Selectors.getAuthAuthToken);
    const isLanu = yield* select(Selectors.getFaqGetIsLANU);

    let response;

    if (isLanu) {
        response = yield* call([lanuApi, lanuApi.getFaq], { authToken });
    } else {
        response = yield* call([api, api.getFaq], { authToken });
    }

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.getFailure(response.message || ''));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        if (!response.data) {
            yield put(Actions.getFailure('Something went wrong. Please try again.'));
            return;
        }

        yield put(Actions.getSuccess({
            welcomeMsg: response.data.welcomeFaq,
            data: response.data.data,
        }));
    }
}
