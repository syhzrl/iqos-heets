import { fork } from 'redux-saga/effects';

import FaqGateway from 'api/Faq';
import LanuFaqGateway from 'api/LanuFaq';

import { RootSagaReturnType } from 'sagas/types';

import watchGetFaq from './getFaq';
import watchCreateFaq from './createFaq';
import watchEditFaq from './editFaq';
import watchReorderFaq from './reorderFaq';
import watchDeleteFaq from './deleteFaq';
import watchSetWelcomeMsg from './settingWelcomeMsg';
import watchSearchAutocomplete from './searchAutocomplete';
import watchGetCopyWriting from './getCopyWriting';
import watchSetCopyWriting from './settingCopyWriting';
import watchGetAgeCopyWriting from './getAgeCopyWriting';
import watchSetAgeCopyWriting from './setAgeCopyWriting';

export default (api: FaqGateway, lanuApi: LanuFaqGateway): RootSagaReturnType => {
    function* rootSaga() {
        yield fork(watchGetFaq, api, lanuApi);
        yield fork(watchCreateFaq, api, lanuApi);
        yield fork(watchEditFaq, api, lanuApi);
        yield fork(watchReorderFaq, api, lanuApi);
        yield fork(watchDeleteFaq, api, lanuApi);
        yield fork(watchSetWelcomeMsg, api, lanuApi);
        yield fork(watchSearchAutocomplete, api, lanuApi);
        yield fork(watchGetCopyWriting, api, lanuApi);
        yield fork(watchSetCopyWriting, api, lanuApi);
        yield fork(watchGetAgeCopyWriting, api, lanuApi);
        yield fork(watchSetAgeCopyWriting, api, lanuApi);
    }

    return {
        rootSaga,
    };
};
