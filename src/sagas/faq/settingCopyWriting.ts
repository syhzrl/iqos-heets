import { put, call, select, takeEvery } from 'typed-redux-saga/macro';
import { PayloadAction } from '@reduxjs/toolkit';

import { SagaWatcherReturnType } from 'sagas/types';

import FaqGateway from 'api/Faq';

import Actions from 'redux/Actions';
import { GatewayResponseStatus } from 'api/types/types';

import Selectors from 'redux/Selectors';
import { toast } from 'react-toastify';
import { ICopyWriting } from 'entities/faq';
import LanuFaqGateway from 'api/LanuFaq';

export default function* watchSetCopyWriting(api: FaqGateway, lanuApi: LanuFaqGateway): SagaWatcherReturnType {
    yield takeEvery('faq/setCopyWritingAttempt', handleSetCopyWriting, api, lanuApi);
}

function* handleSetCopyWriting(api: FaqGateway, lanuApi: LanuFaqGateway, data: PayloadAction<ICopyWriting>) {
    const authToken = yield* select(Selectors.getAuthAuthToken);

    const isLanu = yield* select(Selectors.getFaqGetIsLANU);

    let response;

    if (!data.payload || !data.payload.mainMenu.trim().length || !data.payload.backToTelegramText.trim().length || !data.payload.backToTelegramButton.trim().length || !data.payload.backToTelegramNotInChannel.trim().length) {
        toast.error('Invalid copy writing.');
        yield put(Actions.setCopyWritingFailure());
        return;
    }

    if (isLanu) {
        response = yield* call([lanuApi, lanuApi.setCopyWriting], { authToken, data: data.payload });
    } else {
        response = yield* call([api, api.setCopyWriting], { authToken, data: data.payload });
    }

    if (response.status === GatewayResponseStatus.Error) {
        toast.error('Something went wrong. Please try again.');
        yield put(Actions.setCopyWritingFailure());
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        toast.success('Welcome message updated');
        yield put(Actions.setCopyWritingSuccess(data.payload));
    }
}
