import { takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import Utils from 'lib/Utils';
import NavActions from 'lib/NavActions';

export default function* watchLogout(): SagaWatcherReturnType {
    yield takeEvery('auth/authLogout', handleLogout);
}

function handleLogout() {
    Utils.Auth.clearAuthToken();
    NavActions.navResetToLogin();
}
