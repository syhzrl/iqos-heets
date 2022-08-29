import { put, call, takeEvery, select } from 'typed-redux-saga/macro';

import { toast } from 'react-toastify';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import FaqGateway from 'api/Faq';

import { SagaWatcherReturnType } from 'sagas/types';
import { GatewayResponseStatus } from 'api/types/types';
import { EditFaqActionPayload } from 'redux/slices/faq/types';
import LanuFaqGateway from 'api/LanuFaq';

export default function* watchEditFaq(api: FaqGateway, lanuApi: LanuFaqGateway): SagaWatcherReturnType {
    yield takeEvery('faq/updateAttempt', handleEditFaq, api, lanuApi);
}

function* handleEditFaq(api: FaqGateway, lanuApi: LanuFaqGateway, data: EditFaqActionPayload) {
    const authToken = yield* select(Selectors.getAuthAuthToken);
    const isLanu = yield* select(Selectors.getFaqGetIsLANU);

    let response;

    if (isLanu) {
        response = yield* call([lanuApi, lanuApi.editFaq], {
            data: data.payload,
            authToken,
        });
    } else {
        response = yield* call([api, api.editFaq], {
            data: data.payload,
            authToken,
        });
    }

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.updateFailure(response.message));
        toast.error(response.message);
        return;
    }

    toast.success('FAQ updated');
    yield put(Actions.updateSuccess(data.payload));
}
