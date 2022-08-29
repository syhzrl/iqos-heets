import React, { FunctionComponent, useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Label, Spinner } from 'reactstrap';
import { ICopyWriting } from 'entities/faq';

import { AppDispatch, RootState } from 'redux/store';
import Selectors from 'redux/Selectors';
import Actions from 'redux/Actions';
import { connect } from 'react-redux';

import { css } from 'styled-components';

import Button from './Button';
import Input from './Input';
import Text from './Text';

import 'react-toastify/dist/ReactToastify.css';

interface CopyWritingModalProps {
    isOpen: boolean;
    toggle: () => void;
    loading: boolean;
    getCopyWriting(): void;
    copyWritingData: ICopyWriting | null;
    setCopyWriting(copyWriting: ICopyWriting): void;
    isLanu: boolean;
}

const CopyWritingModal: FunctionComponent<CopyWritingModalProps> = (props: CopyWritingModalProps) => {
    const { isOpen, toggle, loading, getCopyWriting, copyWritingData, setCopyWriting, isLanu } = props;

    const [mainMenu, setMainMenu] = useState('');
    const [backToTelegramText, setBackToTelegramText] = useState('');
    const [backToTelegramButton, setBackToTelegramButton] = useState('');
    const [notInChannel, setNotInChannel] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        getCopyWriting();
    }, [isLanu]);

    useEffect(() => {
        if (copyWritingData) {
            setMainMenu(copyWritingData.mainMenu);
            setBackToTelegramText(copyWritingData.backToTelegramText);
            setBackToTelegramButton(copyWritingData.backToTelegramButton);
            setNotInChannel(copyWritingData.backToTelegramNotInChannel);
        }
    }, [copyWritingData]);

    const CancelClickHandler = () => {
        if (copyWritingData) {
            setMainMenu(copyWritingData.mainMenu);
            setBackToTelegramText(copyWritingData.backToTelegramText);
            setBackToTelegramButton(copyWritingData.backToTelegramButton);
            setNotInChannel(copyWritingData.backToTelegramNotInChannel);
        }

        toggle();
    };

    const SaveHandler = () => {
        if (mainMenu && mainMenu.trim().length && backToTelegramText && backToTelegramText.trim().length && backToTelegramButton && backToTelegramButton.trim().length && notInChannel && notInChannel.trim().length) {
            setCopyWriting({
                mainMenu,
                backToTelegramText,
                backToTelegramButton,
                backToTelegramNotInChannel: notInChannel,
            });
            if (!loading) {
                toggle();
                setError('');
            }
        } else {
            setError('Title or text cannot be empty.');
        }
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered size='lg'>
            <ModalHeader>Set Copy Writing</ModalHeader>
            <ModalBody>
                <Label>Main Menu Text</Label>
                <Input value={mainMenu} onChange={e => setMainMenu(e.target.value)} placeholder='Main Menu Text' css={styles.inputTitle} />

                <Label>Back To Telegram Text</Label>
                <Input value={backToTelegramText} onChange={e => setBackToTelegramText(e.target.value)} placeholder='Back To Telegram Text' css={styles.inputTitle} />

                <Label>Back To Telegram Button</Label>
                <Input value={backToTelegramButton} onChange={e => setBackToTelegramButton(e.target.value)} placeholder='Back To Telegram Button' css={styles.inputTitle} />

                <Label>Back To Telegram Not In Channel</Label>
                <Input value={notInChannel} onChange={e => setNotInChannel(e.target.value)} placeholder='Back To Telegram Not In Channel' css={styles.inputTitle} />

                {error && <Text style={{ color: '#d32f2f' }}>{error}</Text>}
            </ModalBody>
            <ModalFooter>
                {loading && <Spinner color='#1976d2' />}
                <Button label='Save' onClick={SaveHandler} css={styles.saveButton} />
                <Button label='Cancel' onClick={CancelClickHandler} css={styles.cancelButton} />
            </ModalFooter>
        </Modal>
    );
};

const styles = {
    cancelButton: css`
        background-color: #616161;
        color: white;
        font-size: 18px; 
        border-radius: 50px;
        width: 100px;
        height: 40px;

        &:hover {
            background-color: #8e8e8e;
            color: white;
        }

        &:active {
            background-color: #373737;
            color: white;
        }
    `,
    saveButton: css`
        background-color: #1976d2;
        color: white;
        font-size: 18px; 
        border-radius: 50px;
        width: 100px;
        height: 40px;

        &:hover {
            background-color: #63a4ff;
            color: white;
        }

        &:active {
            background-color: #004ba0;
            color: white;
        }
    `,
    inputTitle: css`
        background-color: #DCDCDC;
        border-radius: 5px;
        width: 100%;
        margin-bottom: 15px;

        &:hover {
            background-color: #C4C4C4;
        }
    `,
    inputContent: css`
        height: 150px;
        &:hover {
            background-color: #C4C4C4;
        }
    `,
};

const mapStateToProps = (state: RootState) => ({
    isLanu: Selectors.getFaqGetIsLANU(state),
    loading: Selectors.getFaqSetCopyWritingAttempting(state),
    copyWritingData: Selectors.getFaqCopyWriting(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getCopyWriting: () => dispatch(Actions.getCopyWritingAttempt()),
    setCopyWriting: (copyWriting: ICopyWriting) => dispatch(Actions.setCopyWritingAttempt(copyWriting)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CopyWritingModal);
