const dev = {
    baseUrl: 'http://54.255.29.210',
};

const test = {
    baseUrl: 'http://54.255.29.210',
};

const prod = {
    baseUrl: 'https://api.iqosmytelegram.com',
};

let config = dev;

switch (process.env.REACT_APP_STAGE) {
    case 'test': config = test; break;
    case 'prod': config = prod; break;
    default: config = dev; break;
}
const useMockApi = false;
const reservedFaqTitleKeywords = ['Back', 'Back to Home', 'Back to IQOS Malaysia (Official) Telegram Channel'];

export default {
    ...config,
    useMockApi,
    reservedFaqTitleKeywords,
};
