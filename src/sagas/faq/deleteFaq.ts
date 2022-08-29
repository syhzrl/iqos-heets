import { put, call, takeEvery, select } from 'typed-redux-saga/macro';

import { toast } from 'react-toastify';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import FaqGateway from 'api/Faq';

import { SagaWatcherReturnType } from 'sagas/types';
import { GatewayResponseStatus } from 'api/types/types';
import { DeleteFaqActionPayload } from 'redux/slices/faq/types';
import LanuFaqGateway from 'api/LanuFaq';

export default function* watchDeleteFaq(api: FaqGateway, lanuApi: LanuFaqGateway): SagaWatcherReturnType {
    yield takeEvery('faq/deleteAttempt', handleDeleteFaq, api, lanuApi);
}

function* handleDeleteFaq(api: FaqGateway, lanuApi: LanuFaqGateway, data: DeleteFaqActionPayload) {
    const authToken = yield* select(Selectors.getAuthAuthToken);
    const isLanu = yield* select(Selectors.getFaqGetIsLANU);

    let response;

    const faqIdToBeDeleted = data.payload.id;

    if (isLanu) {
        response = yield* call([lanuApi, lanuApi.deleteFaq], {
            id: faqIdToBeDeleted,
            authToken,
        });
    } else {
        response = yield* call([api, api.deleteFaq], {
            id: faqIdToBeDeleted,
            authToken,
        });
    }

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.deleteFailure(response.message));
        toast.error(response.message);
        return;
    }

    toast.success('FAQ deleted');
    yield put(Actions.deleteSuccess(faqIdToBeDeleted));
}
