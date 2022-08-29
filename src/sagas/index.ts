import { fork } from 'redux-saga/effects';

import config from 'config';

import api from 'api';
import mockApi from 'api/mocks/index';

import auth from './auth';
import faq from './faq';
import analytics from './analytics';

import { SagaForkReturnType } from './types';

// let apiInstance = api;

const apiInstance = api;

if (config.useMockApi) {
    // apiInstance = mockApi;
}

export default function* root(): SagaForkReturnType {
    yield fork(auth(apiInstance.auth).rootSaga);
    yield fork(faq(apiInstance.faq, apiInstance.lanuFaq).rootSaga);
    yield fork(analytics(apiInstance.analytics, apiInstance.lanuAnalytics).rootSaga);
}
