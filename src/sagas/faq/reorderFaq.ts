import { put, takeEvery, select, call } from 'typed-redux-saga/macro';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import { SagaWatcherReturnType } from 'sagas/types';
import { GatewayResponseStatus } from 'api/types/types';
import { toast } from 'react-toastify';

import FaqGateway from 'api/Faq';
import { ReorderFaqActionPayload } from 'redux/slices/faq/types';
import LanuFaqGateway from 'api/LanuFaq';

export default function* watchReorderFaq(api: FaqGateway, lanuApi: LanuFaqGateway): SagaWatcherReturnType {
    yield takeEvery('faq/reorderAttempt', handleReorderFaq, api, lanuApi);
}

function* handleReorderFaq(api: FaqGateway, lanuApi: LanuFaqGateway, data: ReorderFaqActionPayload) {
    const authToken = yield* select(Selectors.getAuthAuthToken);

    const isLanu = yield* select(Selectors.getFaqGetIsLANU);

    let response;

    if (isLanu) {
        response = yield* call([lanuApi, lanuApi.reorderFaq], {
            data: data.payload,
            authToken,
        });
    } else {
        response = yield* call([api, api.reorderFaq], {
            data: data.payload,
            authToken,
        });
    }

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.createFailure(response.message));
        toast.error(response.message);
        return;
    }

    let allFaq;

    if (isLanu) {
        allFaq = yield* call([lanuApi, lanuApi.getFaq], { authToken });
    } else {
        allFaq = yield* call([api, api.getFaq], { authToken });
    }

    if (allFaq.status === GatewayResponseStatus.Error) {
        yield put(Actions.createFailure(allFaq.message));
        toast.error('Something went wrong. Please refresh the page.');
        return;
    }

    yield put(Actions.reorderSuccess({
        welcomeMsg: allFaq.data.welcomeFaq,
        data: allFaq.data.data,
    }));
}
