import { put, call, takeEvery, select } from 'typed-redux-saga/macro';

import { toast } from 'react-toastify';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import FaqGateway from 'api/Faq';

import { SagaWatcherReturnType } from 'sagas/types';
import { GatewayResponseStatus } from 'api/types/types';
import { CreateFaqAttemptActionPayload } from 'redux/slices/faq/types';
import LanuFaqGateway from 'api/LanuFaq';

export default function* watchCreateFaq(api: FaqGateway, lanuApi: LanuFaqGateway): SagaWatcherReturnType {
    yield takeEvery('faq/createAttempt', handleCreateFaq, api, lanuApi);
}

function* handleCreateFaq(api: FaqGateway, lanuApi: LanuFaqGateway, data: CreateFaqAttemptActionPayload) {
    const authToken = yield* select(Selectors.getAuthAuthToken);
    const isLanu = yield* select(Selectors.getFaqGetIsLANU);

    let response;

    if (isLanu) {
        response = yield* call([lanuApi, lanuApi.createFaq], {
            data: data.payload,
            authToken,
        });
    } else {
        response = yield* call([api, api.createFaq], {
            data: data.payload,
            authToken,
        });
    }

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.createFailure(response.message));
        toast.error(response.message);
        return;
    }

    toast.success('New FAQ created');
    yield put(Actions.createSuccess(response.data));
}
