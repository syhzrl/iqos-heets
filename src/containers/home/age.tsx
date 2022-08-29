import React, { FunctionComponent, CSSProperties, useState, useEffect } from 'react';
import { css } from 'styled-components';
import { Label, Spinner } from 'reactstrap';
import { toast } from 'react-toastify';

import Selectors from 'redux/Selectors';
import Actions from 'redux/Actions';
import { RootState, AppDispatch } from 'redux/store';
import { connect } from 'react-redux';

import { IAgeCopyWriting } from 'entities/faq';

import Validators from 'lib/Validators';

import Input from 'components/Input';
import TextArea from 'components/TextArea';
import Button from 'components/Button';
import ErrorModal from 'components/ErrorModal';

interface AgeBotViewProps {
    ageCopies: IAgeCopyWriting | null,
    ageCopiesLoading: boolean,
    ageCopiesError: string,

    isLanu: boolean;

    getAgeCopies: () => void;
    setAgeCopies: (copies: IAgeCopyWriting) => void;
}

interface StylesDictionary {
    [Key: string]: CSSProperties;
}

const AgeBotView: FunctionComponent<AgeBotViewProps> = (props: AgeBotViewProps) => {
    const {
        ageCopies,
        ageCopiesLoading,
        ageCopiesError,
        isLanu,
        getAgeCopies,
        setAgeCopies,
    } = props;

    const [welcomeMsg1, setWelcomeMsg1] = useState('');

    const [phoneNumberPrompt2, setPhoneNumberPrompt2] = useState('');
    const [buttonPhoneNumberPrompt2, setButtonPhoneNumberPrompt2] = useState('');

    const [iAgreeResponse3, setIAgreeResponse3] = useState('');
    const [iDisagreeResponse3, setIDisagreeResponse3] = useState('');
    const [buttonGoToChannel3, setButtonGoToChannel3] = useState('');

    const [buttonBackToTelegram, setButtonBackToTelegram] = useState('');
    const [errorAlreadyJoined, setErrorAlreadyJoined] = useState('');

    const [scriptWelcomeMsg1, setScriptWelcomeMsg1] = useState('');
    const [scriptButtonPhoneNumberPrompt2, setScriptButtonPhoneNumberPrompt2] = useState('');
    const [scriptIAgreeResponse3, setScriptIAgreeResponse3] = useState('');

    useEffect(() => {
        getAgeCopies();
    }, [isLanu]);

    useEffect(() => {
        if (ageCopies) {
            setWelcomeMsg1(ageCopies.welcomeMsg1);

            setPhoneNumberPrompt2(ageCopies.phoneNumberPrompt2);
            setButtonPhoneNumberPrompt2(ageCopies.buttonPhoneNumberPrompt2);

            setIAgreeResponse3(ageCopies.iAgreeResponse3);
            setIDisagreeResponse3(ageCopies.iDisagreeResponse3);
            setButtonGoToChannel3(ageCopies.buttonGoToChannel3);

            setButtonBackToTelegram(ageCopies.buttonBackToTelegram);
            setErrorAlreadyJoined(ageCopies.errorAlreadyJoined);

            setScriptWelcomeMsg1(ageCopies.scriptWelcomeMsg1);
            setScriptButtonPhoneNumberPrompt2(ageCopies.scriptButtonPhoneNumberPrompt2);
            setScriptIAgreeResponse3(ageCopies.scriptIAgreeResponse3);
        }
    }, [ageCopies]);

    const saveClickHandler = () => {
        let validationError = '';

        const dataToSubmit: IAgeCopyWriting = {
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
        };

        validationError = Validators.ValidateAgeCopies(dataToSubmit);

        if (validationError) {
            toast.error(validationError);
            return;
        }

        setAgeCopies(dataToSubmit);
    };

    if (ageCopiesLoading) {
        return (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '150px',
                }}
            >
                <Spinner color='warning' style={{ height: '400px', width: '400px' }} />
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', marginBottom: 20 }}>
            <div style={{ marginLeft: '50px' }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Label style={containerStyles.label}>Welcome Message</Label>
                    <TextArea
                        value={welcomeMsg1}
                        onChange={e => setWelcomeMsg1(e.target.value)}
                        css={styles.textArea}
                    />
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Label style={containerStyles.label}>Phone Number Prompt</Label>
                    <TextArea
                        value={phoneNumberPrompt2}
                        onChange={e => setPhoneNumberPrompt2(e.target.value)}
                        css={styles.textArea}
                    />
                </div>

                <Label style={containerStyles.label}>Phone Number Prompt Button Label</Label>
                <Input
                    value={buttonPhoneNumberPrompt2}
                    onChange={e => setButtonPhoneNumberPrompt2(e.target.value)}
                    css={styles.inputTitle}
                />

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Label style={containerStyles.label}>I Agree Response</Label>
                    <TextArea
                        value={iAgreeResponse3}
                        onChange={e => setIAgreeResponse3(e.target.value)}
                        css={styles.textArea}
                    />
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Label style={containerStyles.label}>I Disagree Response</Label>
                    <TextArea
                        value={iDisagreeResponse3}
                        onChange={e => setIDisagreeResponse3(e.target.value)}
                        css={styles.textArea}
                    />
                </div>

                <Label style={containerStyles.label}>Go To Channel Button Label</Label>
                <Input
                    value={buttonGoToChannel3}
                    onChange={e => setButtonGoToChannel3(e.target.value)}
                    css={styles.inputTitle}
                />

                <Label style={containerStyles.label}>Back To Telegram Button</Label>
                <Input
                    value={buttonBackToTelegram}
                    onChange={e => setButtonBackToTelegram(e.target.value)}
                    css={styles.inputTitle}
                />

                <Label style={containerStyles.label}>Already Joined Response</Label>
                <Input
                    value={errorAlreadyJoined}
                    onChange={e => setErrorAlreadyJoined(e.target.value)}
                    css={styles.inputTitle}
                />

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Label style={containerStyles.label}>Bot Script Welcome Message</Label>
                    <TextArea
                        value={scriptWelcomeMsg1}
                        onChange={e => setScriptWelcomeMsg1(e.target.value)}
                        css={styles.textArea}
                    />
                </div>

                <Label style={containerStyles.label}>Bot Script Phone Number Prompt</Label>
                <Input
                    value={scriptButtonPhoneNumberPrompt2}
                    onChange={e => setScriptButtonPhoneNumberPrompt2(e.target.value)}
                    css={styles.inputTitle}
                />

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Label style={containerStyles.label}>Bot Script I Agree Response</Label>
                    <TextArea
                        value={scriptIAgreeResponse3}
                        onChange={e => setScriptIAgreeResponse3(e.target.value)}
                        css={styles.textArea}
                    />
                </div>

                <Button
                    label='Save'
                    css={styles.saveButton}
                    onClick={saveClickHandler}
                />
            </div>

            <ErrorModal
                bodyText={ageCopiesError}
                isOpen={ageCopiesError.length > 0}
                onRetry={getAgeCopies}
            />
        </div>
    );
};

const containerStyles: StylesDictionary = {
    label: {
        marginTop: '30px',
        fontSize: '22px',
    },
};

const styles = {
    inputTitle: css`
        background-color: #DCDCDC;
        outline: none;
        border: none;
        font-size: 22px;
        height: 60px;
        width: 800px;
        padding-left: 20px;

        &:hover {
            background-color: #C4C4C4;
        }
    `,
    textArea: css`
        background-color: #DCDCDC;
        outline: none;
        border: none;
        font-size: 22px;
        height: 200px;
        width: 800px;
        padding-left: 20px;

        &:hover {
            background-color: #C4C4C4;
        }
    `,
    saveButton: css`
        background-color: #1976d2;
        color: white;
        font-size: 18px; 
        border-radius: 50px;
        width: 120px;
        height: 40px;
        margin-top: 30px;

        &:hover {
            background-color: #63a4ff;
            color: white;
        }

        &:active {
            background-color: #004ba0;
            color: white;
        }
    `,
};

const mapStateToProps = (state: RootState) => ({
    ageCopies: Selectors.getFaqGetAgeCopyWriting(state),
    ageCopiesLoading: Selectors.getFaqGetAgeCopyWritingAttempting(state),
    ageCopiesError: Selectors.getFaqGetAgeCopyWritingError(state),
    isLanu: Selectors.getFaqGetIsLANU(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getAgeCopies: () => dispatch(Actions.getAgeCopiesAttempt()),
    setAgeCopies: (copies: IAgeCopyWriting) => dispatch(Actions.setAgeCopiesAttempt(copies)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AgeBotView);
