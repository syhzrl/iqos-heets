import { IAgeCopyWriting, ICopyWriting, IFaq, ISearchQuery } from 'entities/faq';
import { FaqState } from '.';

const getFaqAttempting = (state: FaqState): boolean => state.actions.faq || false;
const getFaqError = (state: FaqState): string => state.error.faq || '';
const getFaq = (state: FaqState): IFaq[] => state.faq || [];

const getWelcomeMsg = (state: FaqState): IFaq | null => state.welcomeMsg || null;

const getSetWelcomeMsgAttempting = (state: FaqState): boolean => state.actions.setWelcomeMsg || false;

const getFaqEditing = (state: FaqState): boolean => state.actions.editFaq || false;

const getSearchQuery = (state: FaqState): string => state.searchQuery || '';

const getSearchChipText = (state: FaqState): string => state.searchChipText || '';

const getSearchAutocomplete = (state: FaqState): ISearchQuery[] => state.searchAutocomplete || [];

const getSearchAutocompleteAttempt = (state: FaqState): boolean => state.actions.searchAutocomplete || false;
const getSearchAutocompleteError = (state: FaqState): string => state.error.searchAutocomplete || '';
const getNoSearchResults = (state: FaqState): boolean => state.noSearchResults || false;

const getSearchedFaqId = (state: FaqState): string => state.searchedFaqId || '';

const getCopyWriting = (state: FaqState): ICopyWriting | null => state.copyWriting || null;
const getSetCopyWritingAttempting = (state: FaqState): boolean => state.actions.copyWriting || false;

const getAgeCopyWritingAttempting = (state: FaqState): boolean => state.actions.ageCopyWriting || false;
const getAgeCopyWritingError = (state: FaqState): string => state.error.ageCopyWriting || '';
const getAgeCopyWriting = (state: FaqState): IAgeCopyWriting | null => state.ageCopyWriting || null;

const getIsLANU = (state: FaqState): boolean => state.isLANU || false;

export default {
    getFaqAttempting,
    getFaqError,
    getFaq,

    getWelcomeMsg,

    getSetWelcomeMsgAttempting,

    getFaqEditing,

    getSearchQuery,
    getSearchChipText,

    getSearchAutocomplete,
    getSearchAutocompleteAttempt,
    getSearchAutocompleteError,
    getNoSearchResults,

    getSearchedFaqId,

    getCopyWriting,
    getSetCopyWritingAttempting,

    getAgeCopyWritingAttempting,
    getAgeCopyWritingError,
    getAgeCopyWriting,

    getIsLANU,
};
