import { put, call, takeEvery, select } from 'typed-redux-saga/macro';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import FaqGateway from 'api/Faq';

import { SagaWatcherReturnType } from 'sagas/types';
import { GatewayResponseStatus } from 'api/types/types';
import { SearchAutocompleteActionPayload } from 'redux/slices/faq/types';
import LanuFaqGateway from 'api/LanuFaq';

export default function* watchSearchAutocomplete(api: FaqGateway, lanuApi: LanuFaqGateway): SagaWatcherReturnType {
    yield takeEvery('faq/getSearchAutocompleteAttempt', handleSearchAutocomplete, api, lanuApi);
}

function* handleSearchAutocomplete(api: FaqGateway, lanuApi: LanuFaqGateway, data: SearchAutocompleteActionPayload) {
    const authToken = yield* select(Selectors.getAuthAuthToken);

    const isLanu = yield* select(Selectors.getFaqGetIsLANU);

    let response;

    if (!data.payload.query || !data.payload.query.trim().length) {
        yield put(Actions.getSearchAutocompleteFailure(''));
        return;
    }

    if (isLanu) {
        response = yield* call([lanuApi, lanuApi.searchAutocomplete], {
            query: data.payload.query,
            authToken,
        });
    } else {
        response = yield* call([api, api.searchAutocomplete], {
            query: data.payload.query,
            authToken,
        });
    }

    if (response.status === GatewayResponseStatus.Error) {
        yield put(Actions.getSearchAutocompleteFailure(response.message || 'Something went wrong. Please try again.'));
        return;
    }

    yield put(Actions.getSearchAutocompleteSuccess(response.data));
}
