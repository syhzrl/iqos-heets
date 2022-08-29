import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';

import authReducer from 'redux/slices/auth';
import faqReducer from 'redux/slices/faq';
import analyticsReducer from 'redux/slices/analytics';

import rootSaga from 'sagas';

const sagaMiddleware = createSagaMiddleware();
const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

const rootReducer = combineReducers({
    router: routerReducer,
    auth: authReducer.reducers,
    faq: faqReducer.reducers,
    analytics: analyticsReducer.reducers,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: false,
    }).concat(sagaMiddleware, routerMiddleware),
    devTools: process.env.REACT_APP_STAGE !== 'prod',
});

sagaMiddleware.run(rootSaga);

export const history = createReduxHistory(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
