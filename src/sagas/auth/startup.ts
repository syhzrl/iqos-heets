import { put, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import Actions from 'redux/Actions';
import Utils from 'lib/Utils';

export default function* watchStartup(): SagaWatcherReturnType {
    yield takeEvery('auth/authStartupAttempt', handleStartup);
}

function* handleStartup() {
    const authToken = Utils.Auth.getAuthToken();

    if (authToken) {
        // Set authToken to redux
        yield put(Actions.authLoginSuccess(authToken));
    }

    yield put(Actions.authStartupSuccess());
}
