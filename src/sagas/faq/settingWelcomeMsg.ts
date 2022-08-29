import { put, call, select, takeEvery } from 'typed-redux-saga/macro';
import { PayloadAction } from '@reduxjs/toolkit';

import { SagaWatcherReturnType } from 'sagas/types';

import FaqGateway from 'api/Faq';

import Actions from 'redux/Actions';
import { GatewayResponseStatus } from 'api/types/types';

import Selectors from 'redux/Selectors';
import { toast } from 'react-toastify';
import LanuFaqGateway from 'api/LanuFaq';

export default function* watchSetWelcomeMsg(api: FaqGateway, lanuApi: LanuFaqGateway): SagaWatcherReturnType {
    yield takeEvery('faq/updateWelcomeMsgAttempt', handleSetWelcomeMsg, api, lanuApi);
}

function* handleSetWelcomeMsg(api: FaqGateway, lanuApi: LanuFaqGateway, data: PayloadAction<string>) {
    const authToken = yield* select(Selectors.getAuthAuthToken);

    const isLanu = yield* select(Selectors.getFaqGetIsLANU);

    let response;

    if (!data.payload || !data.payload.length || !data.payload.trim().length) {
        toast.error('Invalid welcome message.');
        yield put(Actions.updateWelcomeMsgFailure());
        return;
    }

    if (isLanu) {
        response = yield* call([api, lanuApi.setWelcomeMsg], { authToken, welcomeMsg: data.payload });
    } else {
        response = yield* call([api, lanuApi.setWelcomeMsg], { authToken, welcomeMsg: data.payload });
    }

    if (response.status === GatewayResponseStatus.Error) {
        toast.error('Something went wrong. Please try again.');
        yield put(Actions.updateWelcomeMsgFailure());
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        toast.success('Welcome message updated');
        yield put(Actions.updateWelcomeMsgSuccess(data.payload));
    }
}
