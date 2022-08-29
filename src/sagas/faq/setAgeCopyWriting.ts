import { put, call, select, takeEvery } from 'typed-redux-saga/macro';
import { PayloadAction } from '@reduxjs/toolkit';

import { SagaWatcherReturnType } from 'sagas/types';

import FaqGateway from 'api/Faq';

import Actions from 'redux/Actions';
import { GatewayResponseStatus } from 'api/types/types';

import Selectors from 'redux/Selectors';
import { toast } from 'react-toastify';
import { IAgeCopyWriting } from 'entities/faq';
import LanuFaqGateway from 'api/LanuFaq';

export default function* watchSetAgeCopyWriting(api: FaqGateway, lanuApi: LanuFaqGateway): SagaWatcherReturnType {
    yield takeEvery('faq/setAgeCopiesAttempt', handleSetAgeCopyWriting, api, lanuApi);
}

function* handleSetAgeCopyWriting(api: FaqGateway, lanuApi: LanuFaqGateway, data: PayloadAction<IAgeCopyWriting>) {
    const authToken = yield* select(Selectors.getAuthAuthToken);

    const isLanu = yield* select(Selectors.getFaqGetIsLANU);

    let response;

    if (isLanu) {
        response = yield* call([lanuApi, lanuApi.setAgeCopyWriting], { authToken, data: data.payload });
    } else {
        response = yield* call([api, api.setAgeCopyWriting], { authToken, data: data.payload });
    }

    if (response.status === GatewayResponseStatus.Error) {
        toast.error('Something went wrong. Please try again.');
        yield put(Actions.setAgeCopiesFailure());
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        toast.success('Welcome message updated');
        yield put(Actions.setAgeCopiesSuccess());
        yield put(Actions.getAgeCopiesAttempt());
    }
}
