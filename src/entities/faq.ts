export interface IFaq {
    id: string;
    title: string;
    messages: IFaqMessage[];
    orderId: number; // lower value means higher up, starting from 0
    children?: IFaq[];
    parentId: string;
}

export interface IServerFaq extends IFaq {
    parentId: string;
    createdAt: string;
    updatedAt: string;
}

export interface IEditFaqDTO {
    id: string;
    title: string;
    messages: IFaqMessage[];
}

export interface IFaqMessage {
    caption?: string;
    text: string;
    type: FaqMessageTypeEnum;
}

export enum FaqMessageTypeEnum {
    Text,
    Image,
    Video,
    Document,
}

export interface ISearchQuery {
    id: string;
    text: string;
}

export interface ICopyWriting {
    mainMenu: string;
    backToTelegramText: string;
    backToTelegramButton: string;
    backToTelegramNotInChannel: string;
}

export interface IAgeCopyWriting {
    welcomeMsg1: string;
    phoneNumberPrompt2: string;
    buttonPhoneNumberPrompt2: string;
    iDisagreeResponse3: string;
    iAgreeResponse3: string;
    buttonGoToChannel3: string;
    buttonBackToTelegram: string;
    errorAlreadyJoined: string;
    scriptWelcomeMsg1: string;
    scriptButtonPhoneNumberPrompt2: string;
    scriptIAgreeResponse3: string;
}
