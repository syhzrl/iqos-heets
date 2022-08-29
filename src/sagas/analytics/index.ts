import { fork } from 'redux-saga/effects';

import AnalyticsGateway from 'api/Analytics';
import LanuAnalyticsGateway from 'api/LanuAnalytics';

import { RootSagaReturnType } from 'sagas/types';

import watchGetAnalytics from './getAnalytics';
import watchGetAnalyticsToDownload from './getAnalyticsToDownload';
import watchMasterExport from './masterExport';
import watchGetOverview from './getOverview';

export default (api: AnalyticsGateway, lanuApi: LanuAnalyticsGateway): RootSagaReturnType => {
    function* rootSaga() {
        yield fork(watchGetAnalytics, api, lanuApi);
        yield fork(watchGetAnalyticsToDownload, api, lanuApi);
        yield fork(watchMasterExport, api, lanuApi);
        yield fork(watchGetOverview, api, lanuApi);
    }

    return {
        rootSaga,
    };
};
