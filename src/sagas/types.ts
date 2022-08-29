import { ForkEffect } from 'redux-saga/effects';
import { SagaGenerator } from 'typed-redux-saga';

export type SagaWatcherReturnType = Generator<SagaGenerator<never, ForkEffect<never>>, void, unknown>;
export type SagaForkReturnType = Generator<ForkEffect<void>, void, unknown>;

export interface RootSagaReturnType {
    rootSaga(): Generator<ForkEffect<SagaWatcherReturnType>, void, unknown>;
}
