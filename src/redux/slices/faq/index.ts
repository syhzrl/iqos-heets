import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IFaq, IServerFaq, ISearchQuery } from 'entities/faq';
import {
    GetFaqActionPayload,
    CreateFaqAttemptActionPayload,
    EditFaqActionPayload,
    ReorderFaqActionPayload,
    FaqReduxState,
    DeleteFaqActionPayload,
    SearchAutocompleteActionPayload,
    SetCopyWritingActionPayload,
    GetCopyWritingActionPayload,
    GetAgeCopyWritingActionPayload,
    SetAgeCopyWritingActionPayload,
} from './types';

const initialState: FaqReduxState = {
    actions: {
        faq: true,
        editFaq: false,
        searchAutocomplete: false,
        search: false,
        setWelcomeMsg: false,
        copyWriting: false,
        ageCopyWriting: false,
    },
    welcomeMsg: null,
    copyWriting: null,
    faq: [],
    searchQuery: '',
    searchChipText: '',
    searchedFaqId: '',
    searchAutocomplete: [],
    noSearchResults: false,
    openFaqs: [],
    ageCopyWriting: null,
    isLANU: false,
    error: {
        faq: '',
        search: '',
        searchAutocomplete: '',
        ageCopyWriting: '',
    },
};

const faqSlice = createSlice({
    name: 'faq',
    initialState,
    reducers: {
        getAttempt: (state) => {
            state.actions.faq = true;
            state.error.faq = '';
        },
        getSuccess: (state, action: GetFaqActionPayload) => {
            state.actions.faq = false;
            if (action.payload) {
                state.welcomeMsg = action.payload.welcomeMsg;
                state.faq = action.payload.data;
            }
        },
        getFailure: (state, action: PayloadAction<string>) => {
            state.actions.faq = false;
            state.error.faq = action.payload;
        },
        getReset: (state) => {
            state.actions.faq = false;
            state.error.faq = '';

            state.faq = [];
        },

        createAttempt: (state, _action: CreateFaqAttemptActionPayload) => {
            state.actions.editFaq = true;
            state.error.faq = '';
        },
        createSuccess: (state, action: PayloadAction<IServerFaq>) => {
            state.actions.editFaq = false;

            if (action.payload) {
                const findParent = (data: IFaq[]) => {
                    const { parentId } = action.payload;

                    data.every((item) => {
                        const { id, children } = item;

                        if (id === parentId) {
                            if (children) item.children?.push(action.payload);
                            else Object.assign(item, { children: [action.payload] });
                            return false;
                        }

                        if (children) {
                            findParent(children);
                        }
                        return true;
                    });
                };

                if (action.payload.parentId === '0') {
                    state.faq = state.faq.concat(action.payload);
                } else {
                    findParent(state.faq);
                }
            }
        },
        createFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.editFaq = false;
            if (action.payload) {
                state.error.faq = action.payload;
            }
        },

        updateAttempt: (state, _action: EditFaqActionPayload) => {
            state.actions.editFaq = true;
            state.error.faq = '';
        },
        updateSuccess: (state, action: EditFaqActionPayload) => {
            state.actions.editFaq = false;

            const findFaq = (data: IFaq[]): void => {
                const { id: selectedId } = action.payload;

                data.every((item) => {
                    const { id, children } = item;

                    if (id === selectedId) {
                        Object.assign(item, action.payload);
                        return false;
                    }

                    if (children) {
                        findFaq(children);
                    }
                    return true;
                });
            };

            findFaq(state.faq);
        },
        updateFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.editFaq = false;
            if (action.payload) {
                state.error.faq = action.payload;
            }
        },

        updateWelcomeMsgAttempt: (state, _action: PayloadAction<string>) => {
            state.actions.setWelcomeMsg = true;
        },
        updateWelcomeMsgSuccess: (state, action: PayloadAction<string>) => {
            state.actions.setWelcomeMsg = false;

            if (state.welcomeMsg) {
                state.welcomeMsg = {
                    ...state.welcomeMsg,
                    messages: [{
                        text: action.payload,
                        type: 0,
                    }],
                };
            }
        },
        updateWelcomeMsgFailure: (state) => {
            state.actions.setWelcomeMsg = false;
        },

        reorderAttempt: (state, _action: ReorderFaqActionPayload) => {
            state.actions.editFaq = true;
        },
        reorderSuccess: (state, action: GetFaqActionPayload) => {
            state.actions.editFaq = false;

            if (action.payload) {
                state.welcomeMsg = action.payload.welcomeMsg;
                state.faq = action.payload.data;
            }
        },
        reorderFailure: (state) => {
            state.actions.editFaq = false;
        },

        deleteAttempt: (state, _action: DeleteFaqActionPayload) => {
            state.actions.editFaq = true;
            state.error.faq = '';
        },
        deleteSuccess: (state, action: PayloadAction<string>) => {
            state.actions.editFaq = false;
            if (action.payload) {
                const filterChildren = (data: IFaq[]): IFaq[] => {
                    let isFound = false;
                    let newData = data.filter(item => {
                        if (item.id === action.payload) {
                            isFound = true;
                            return false;
                        }
                        return true;
                    });

                    if (!isFound) {
                        newData = newData.map(item => {
                            if (!item.children) return item;

                            return {
                                ...item,
                                children: filterChildren(item.children),
                            };
                        });
                    }

                    return newData;
                };
                state.faq = filterChildren(state.faq);
            }
        },
        deleteFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.editFaq = false;
            if (action.payload) {
                state.error.faq = action.payload;
            }
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setSearchChipText: (state, action: PayloadAction<string>) => {
            state.searchChipText = action.payload;
        },
        // this is for azrul to get autocomplete results from API
        getSearchAutocompleteAttempt: (state, _action: SearchAutocompleteActionPayload) => {
            state.actions.searchAutocomplete = true;
            state.noSearchResults = false;
        },
        getSearchAutocompleteSuccess: (state, action: PayloadAction<ISearchQuery[]>) => {
            state.actions.searchAutocomplete = false;
            state.searchAutocomplete = action.payload;

            if (!action.payload.length) {
                state.noSearchResults = true;
            }
        },
        getSearchAutocompleteFailure: (state, action: PayloadAction<string>) => {
            state.actions.searchAutocomplete = false;
            state.error.searchAutocomplete = action.payload;
        },

        getCopyWritingAttempt: (state) => {
            state.actions.faq = true;
            state.error.faq = '';
        },
        getCopyWritingSuccess: (state, action: GetCopyWritingActionPayload) => {
            state.actions.faq = false;
            if (action.payload) {
                state.copyWriting = action.payload;
            }
        },
        getCopyWritingFailure: (state, action: PayloadAction<string>) => {
            state.actions.faq = false;
            state.error.faq = action.payload;
        },

        setCopyWritingAttempt: (state, _action: SetCopyWritingActionPayload) => {
            state.actions.copyWriting = true;
        },
        setCopyWritingSuccess: (state, action: SetCopyWritingActionPayload) => {
            state.actions.copyWriting = false;

            if (action.payload) {
                state.copyWriting = action.payload;
            }
        },
        setCopyWritingFailure: (state) => {
            state.actions.copyWriting = false;
        },
        // we will determine the open faqs as well as the faq to be highlighted by FaqCard.ts
        getSearchData: (state, action: PayloadAction<string>) => {
            state.searchedFaqId = action.payload;
            const list: string[] = [];

            const findParent = (data: IFaq[], searchedFaqId: string) => {
                data.every((item) => {
                    const { id, children, parentId } = item;
                    if (id === searchedFaqId) {
                        list.push(parentId, id);
                    }

                    if (children) {
                        findParent(children, searchedFaqId);
                    }

                    return true;
                });
            };

            const findParentOfParent = (data: IFaq[], searchedFaqId: string) => {
                data.every((item) => {
                    const { id, children, parentId } = item;
                    if (id === searchedFaqId) {
                        list.unshift(parentId);
                    }

                    if (children) {
                        findParentOfParent(children, searchedFaqId);
                    }

                    return true;
                });
            };

            findParent(state.faq, action.payload);

            for (let i = 0; i < list.length; i += 1) {
                findParentOfParent(state.faq, list[0]);
            }

            list.shift();

            state.openFaqs = [...list];
        },
        clearSearch: (state) => {
            state.searchQuery = '';
            state.searchChipText = '';
            state.searchAutocomplete = [];
            state.openFaqs = [];
            state.searchedFaqId = '';
        },
        clearSearchAutomplete: (state) => {
            state.searchAutocomplete = [];
        },

        getAgeCopiesAttempt: (state) => {
            state.actions.ageCopyWriting = true;
            state.error.ageCopyWriting = '';
        },
        getAgeCopiesSuccess: (state, action: GetAgeCopyWritingActionPayload) => {
            state.actions.ageCopyWriting = false;
            state.error.ageCopyWriting = '';

            if (action.payload) {
                state.ageCopyWriting = action.payload;
            }
        },
        getAgeCopiesFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.ageCopyWriting = false;
            if (action.payload) {
                state.error.ageCopyWriting = action.payload;
            }
        },

        setAgeCopiesAttempt: (state, _action: SetAgeCopyWritingActionPayload) => {
            state.actions.ageCopyWriting = true;
            state.error.ageCopyWriting = '';
        },
        setAgeCopiesSuccess: (state) => {
            state.actions.ageCopyWriting = false;
            state.error.ageCopyWriting = '';
        },
        setAgeCopiesFailure: (state, action: PayloadAction<string | undefined>) => {
            state.actions.ageCopyWriting = false;
            if (action.payload) {
                state.error.ageCopyWriting = action.payload;
            }
        },

        setIsLanu: (state, action: PayloadAction<boolean>) => {
            state.isLANU = action.payload;
        },
    },
});

export type FaqState = typeof initialState;

export default {
    actions: faqSlice.actions,
    reducers: faqSlice.reducer,
};
