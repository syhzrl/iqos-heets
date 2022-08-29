import authSlice from 'redux/slices/auth';
import faqSlice from 'redux/slices/faq';
import analyticsSlice from 'redux/slices/analytics';

export default {
    ...authSlice.actions,
    ...faqSlice.actions,
    ...analyticsSlice.actions,
};
