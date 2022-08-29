import { put, call, takeEvery } from 'typed-redux-saga/macro';

import { SagaWatcherReturnType } from 'sagas/types';

import AuthGateway from 'api/Auth';

import Actions from 'redux/Actions';
import Utils from 'lib/Utils';
import NavActions from 'lib/NavActions';
import { LoginActionPayload } from 'redux/slices/auth/types';
import { GatewayResponseStatus } from 'api/types/types';

export default function* watchLogin(api: AuthGateway): SagaWatcherReturnType {
    yield takeEvery('auth/authLoginAttempt', handleLogin, api);
}

function* handleLogin(api: AuthGateway, data: LoginActionPayload) {
    const { userName, password } = data.payload;

    if (!userName || !password) {
        yield put(Actions.authLoginFailure('Please enter your username and password'));
        return;
    }

    const response = yield* call([api, api.login], { email: userName, password });

    if (response.status === GatewayResponseStatus.Error) {
        if (response.code === '401') {
            return;
        }

        yield put(Actions.authLoginFailure(response.message));
        return;
    } if (response.status === GatewayResponseStatus.Success) {
        if (!response.data) {
            yield put(Actions.authLoginFailure('Something went wrong. Please try again.'));
            return;
        }

        const { token } = response.data.tokens.access;

        if (token) {
            yield put(Actions.authLoginSuccess(token));
            Utils.Auth.storeAuthToken(token);

            NavActions.navToHome();
        } else {
            yield put(Actions.authLoginFailure('Something went wrong. Please try again'));
        }
    }
}
