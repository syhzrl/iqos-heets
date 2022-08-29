import { PayloadAction } from '@reduxjs/toolkit';
import { IAgeCopyWriting, ICopyWriting, IEditFaqDTO, IFaq, IFaqMessage, ISearchQuery } from 'entities/faq';

export interface FaqReduxState {
    actions: {
        faq: boolean;
        editFaq: boolean;
        searchAutocomplete: boolean;
        search: boolean;
        setWelcomeMsg: boolean;
        copyWriting: boolean;
        ageCopyWriting: boolean;
    },
    welcomeMsg: IFaq | null;
    copyWriting: ICopyWriting | null;
    faq: IFaq[];
    searchQuery: string;
    searchChipText: string;
    searchedFaqId: string; // if a search is done and a result is found, this will be populated with the searched FAQ ID.
    searchAutocomplete: ISearchQuery[];
    noSearchResults: boolean;
    openFaqs: string[];
    ageCopyWriting: IAgeCopyWriting | null;
    isLANU: boolean;
    error: {
        faq: string;
        search: string;
        searchAutocomplete: string;
        ageCopyWriting: string;
    },
}

export enum FaqMessageTypeEnum {
    Text,
    Image,
    Video,
}

export interface ICreateFaqDTO {
    title: string;
    messages: IFaqMessage[];
    parentId: string;
}
export type GetFaqActionPayload = PayloadAction<{
    welcomeMsg: IFaq;
    data: IFaq[];
}>;
export type CreateFaqActionPayload = PayloadAction<IFaq>;
export type CreateFaqAttemptActionPayload = PayloadAction<ICreateFaqDTO>;
export type EditFaqActionPayload = PayloadAction<IEditFaqDTO>;
export type ReorderFaqActionPayload = PayloadAction<{
    id: string;
    direction: string;
}>;
export type DeleteFaqActionPayload = PayloadAction<{
    id: string;
}>;
export type GetSearchActionPayload = PayloadAction<{
    openFaqs: string[];
    searchedFaqId: string;
}>;
export type SearchAutocompleteActionPayload = PayloadAction<{
    query: string;
}>;

export type GetCopyWritingActionPayload = PayloadAction<ICopyWriting>;
export type SetCopyWritingActionPayload = PayloadAction<ICopyWriting>;

export type GetAgeCopyWritingActionPayload = PayloadAction<IAgeCopyWriting>;
export type SetAgeCopyWritingActionPayload = PayloadAction<IAgeCopyWriting>;
