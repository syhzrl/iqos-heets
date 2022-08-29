import config from 'config';
import { IAgeCopyWriting } from 'entities/faq';

const ValidateWelcomeMessage = (text: string): string => {
    if (!text || !text.trim().length) return 'Welcome message cannot be empty';

    if (text.length > 4094) return 'Exceeded maximum number of characters';

    return '';
};

const ValidateTextFaq = (title: string, text: string): string => {
    if (!title || !text || !title.trim().length || !text.trim().length) return 'Title or text cannot be empty.';

    if (title && title.trim().length && text && text.trim().length) {
        if (config.reservedFaqTitleKeywords.includes(title)) {
            return 'This title is a reserved keyword. Please use another title.';
        }
    }

    // telegram limit 4096 characters. Minus 3 to account for faqbot format -> `*${title}* \n\n${messages[0].text}`
    if (title.length + text.length > 4093) return 'Text exceeded maximum number of characters';

    return '';
};

const ValidateImageFaq = (title: string, caption: string, imageUrl: string): string => {
    if (!title || !caption || !imageUrl || !title.trim().length || !caption.trim().length || !imageUrl.trim().length) return 'Title, caption or image cannot be empty.';

    if (title && title.trim().length && caption && caption.trim().length) {
        if (config.reservedFaqTitleKeywords.includes(title)) {
            return 'This title is a reserved keyword. Please use another title.';
        }
    }

    // telegram limit 1024 characters. Minus 3 to account for faqbot format -> `*${title}* \n\n${messages[0].text}`
    if (title.length + caption.length > 1021) return 'Title and Caption exceeded max length';

    return '';
};

const ValidateVideoFaq = (title: string, caption: string, videoUrl: string): string => {
    if (!title || !caption || !videoUrl || !title.trim().length || !caption.trim().length || !videoUrl.trim().length) return 'Title, caption or video cannot be empty.';

    if (title && title.trim().length && caption && caption.trim().length) {
        if (config.reservedFaqTitleKeywords.includes(title)) {
            return 'This title is a reserved keyword. Please use another title.';
        }
    }

    // telegram limit 1024 characters. Minus 3 to account for faqbot format -> `*${title}* \n\n${messages[0].text}`
    if (title.length + caption.length > 1021) return 'Title and Caption exceeded max length';

    return '';
};

const ValidateDocumentFaq = (title: string, caption: string, documentUrl: string): string => {
    if (!title || !caption || !documentUrl || !title.trim().length || !caption.trim().length || !documentUrl.trim().length) return 'Title, caption or document cannot be empty.';

    if (title && title.trim().length && caption && caption.trim().length) {
        if (config.reservedFaqTitleKeywords.includes(title)) {
            return 'This title is a reserved keyword. Please use another title.';
        }
    }

    // telegram limit 1024 characters. Minus 3 to account for faqbot format -> `*${title}* \n\n${messages[0].text}`
    if (title.length + caption.length > 1021) return 'Title and Caption exceeded max length';

    return '';
};

const ValidateImageDimensions = (size: number, width: number, height: number, ratio: number): string => {
    const maxImageSize = 5242880; // 5MB;
    const maxWidthAndHeight = 10000;
    const maxWidthAndHeightRatio = 20;

    if (size > maxImageSize) return 'Selected image exceeded maximum size of 5MB.';

    if (width > maxWidthAndHeight || height > maxWidthAndHeight) return 'Image dimension exceeded maximum size of 10,000 pixels.';

    if (ratio > maxWidthAndHeightRatio) return 'Exceeded maximum width and height ratio of 20';

    return '';
};

const ValidateVideoSize = (size: number): string => {
    const maxVideoSize = 20971520; // 20MB;
    if (size > maxVideoSize) return 'Selected video exceeded maximum size of 20MB';

    return '';
};

const ValidateDocumentSize = (size: number): string => {
    const maxDocumentSize = 20971520; // 20MB;

    if (size > maxDocumentSize) return 'Selected document exceeded maximum size of 20MB';

    return '';
};

const ValidateAgeCopies = (data: IAgeCopyWriting): string => {
    const {
        welcomeMsg1,

        phoneNumberPrompt2,
        buttonPhoneNumberPrompt2,

        iAgreeResponse3,
        iDisagreeResponse3,
        buttonGoToChannel3,

        buttonBackToTelegram,
        errorAlreadyJoined,

        scriptWelcomeMsg1,
        scriptButtonPhoneNumberPrompt2,
        scriptIAgreeResponse3,
    } = data;

    if (
        !welcomeMsg1.length
        || !welcomeMsg1.trim().length

        || !phoneNumberPrompt2.length
        || !phoneNumberPrompt2.trim().length
        || !buttonPhoneNumberPrompt2.length
        || !buttonPhoneNumberPrompt2.trim().length

        || !iAgreeResponse3.length
        || !iAgreeResponse3.trim().length
        || !iDisagreeResponse3.length
        || !iDisagreeResponse3.trim().length
        || !buttonGoToChannel3.length
        || !buttonGoToChannel3.trim().length

        || !buttonBackToTelegram.length
        || !buttonBackToTelegram.trim().length
        || !errorAlreadyJoined.length
        || !errorAlreadyJoined.trim().length

        || !scriptWelcomeMsg1.length
        || !scriptWelcomeMsg1.trim().length
        || !scriptButtonPhoneNumberPrompt2.length
        || !scriptButtonPhoneNumberPrompt2.trim().length
        || !scriptIAgreeResponse3.length
        || !scriptIAgreeResponse3.trim().length
    ) {
        return 'Inputs cannot be empty!';
    }

    // telegram limit 4096 characters for sending texts
    if (
        welcomeMsg1.length > 4096

        || phoneNumberPrompt2.length > 4096

        || iAgreeResponse3.length > 4096
        || iDisagreeResponse3.length > 4096

        || errorAlreadyJoined.length > 4096

        || scriptWelcomeMsg1.length > 4096
        || scriptIAgreeResponse3.length > 4096
    ) return 'Text exceeded maximum number of characters';

    const maxButtonTextLength = 60; // just incase they copy lorem ipsum into the button labels

    if (
        buttonPhoneNumberPrompt2.length > maxButtonTextLength
        || buttonGoToChannel3.length > maxButtonTextLength
        || buttonBackToTelegram.length > maxButtonTextLength
        || scriptButtonPhoneNumberPrompt2.length > maxButtonTextLength
    ) return 'Button label exceeded maximum number of characters';

    return '';
};

export default {
    ValidateWelcomeMessage,

    ValidateTextFaq,
    ValidateImageFaq,
    ValidateVideoFaq,
    ValidateDocumentFaq,

    ValidateImageDimensions,
    ValidateVideoSize,
    ValidateDocumentSize,

    ValidateAgeCopies,
};
