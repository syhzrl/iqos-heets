import config from 'config';

import AuthGateway from './Auth';
import FaqGateway from './Faq';
import LanuFaqGateway from './LanuFaq';
import AnalyticsGateway from './Analytics';
import LanuAnalyticsGateway from './LanuAnalytics';

const baseUrl = config.baseUrl as string;

const auth = new AuthGateway(baseUrl);
const faq = new FaqGateway(baseUrl);
const lanuFaq = new LanuFaqGateway(baseUrl);
const analytics = new AnalyticsGateway(baseUrl);
const lanuAnalytics = new LanuAnalyticsGateway(baseUrl);

export default {
    auth,
    faq,
    lanuFaq,
    analytics,
    lanuAnalytics,
};
