import { fork } from 'redux-saga/effects';

import AuthGateway from 'api/Auth';
import { RootSagaReturnType } from 'sagas/types';

import watchStartup from './startup';
import watchLogin from './login';
import watchLogout from './logout';

export default (api: AuthGateway): RootSagaReturnType => {
    function* rootSaga() {
        yield fork(watchStartup);
        yield fork(watchLogin, api);
        yield fork(watchLogout);
    }

    return {
        rootSaga,
    };
};
