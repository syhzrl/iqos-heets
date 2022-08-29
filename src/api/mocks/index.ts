import AuthGateway from './Auth';
import FaqGateway from './Faq';

const auth = new AuthGateway('');
const faq = new FaqGateway('');

export default {
    auth,
    faq,
};
