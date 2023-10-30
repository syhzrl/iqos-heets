const dev = {
    baseUrl: 'removed for privacy!',
};

const test = {
    baseUrl: 'removed for privacy!',
};

const prod = {
    baseUrl: 'removed for privacy!',
};

let config = dev;

switch (process.env.REACT_APP_STAGE) {
    case 'test': config = test; break;
    case 'prod': config = prod; break;
    default: config = dev; break;
}
const useMockApi = false;
const reservedFaqTitleKeywords = ['Back', 'Back to Home', 'removed for privacy!'];

export default {
    ...config,
    useMockApi,
    reservedFaqTitleKeywords,
};
