import React, { FunctionComponent, useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Label } from 'reactstrap';
import { css } from 'styled-components';

import { FaqMessageTypeEnum } from 'entities/faq';

import { ICreateFaqDTO } from 'redux/slices/faq/types';

import Validators from 'lib/Validators';

import FaqTypeDropdown from 'components/FaqTypeDropdown';

import UploadField from './faq/UploadField';

import Button from './Button';
import CustomInput from './Input';
import TextArea from './TextArea';
import Text from './Text';

interface AddModalProps {
    id: string;
    header?: string;
    isOpen: boolean;
    toggle: () => void;
    onConfirmed(data: ICreateFaqDTO): void;
}

const AddModal: FunctionComponent<AddModalProps> = (props: AddModalProps) => {
    const { id, header, isOpen, toggle, onConfirmed } = props;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [caption, setCaption] = useState('');
    const [error, setError] = useState('');

    const [wordLimit, setWordLimit] = useState(0);

    const [uploadFieldLabel, setUploadFieldLabel] = useState('');
    const [contentLabel, setContentLabel] = useState('');

    const [faqType, setFaqType] = useState<FaqMessageTypeEnum>(FaqMessageTypeEnum.Text);

    const [data, setData] = useState<ICreateFaqDTO>({
        title: '',
        messages: [{
            text: '',
            type: FaqMessageTypeEnum.Text,
        }],
        parentId: '',
    });

    useEffect(() => {
        // reset data when faq type change
        setTitle('');
        setContent('');
        setCaption('');
        setError('');

        switch (faqType) {
            case 0: setWordLimit(4094); break;
            case 1: setWordLimit(1021); setUploadFieldLabel('Image'); break;
            case 2: setWordLimit(1021); setUploadFieldLabel('Video'); break;
            case 3: setWordLimit(1021); setUploadFieldLabel('Document'); break;
            default: break;
        }

        if (faqType === 0) setContentLabel('Text');
        else setContentLabel('Caption');
    }, [faqType]);

    useEffect(() => {
        const trimmedTitle = title.trim();
        const trimmedContent = content.trim();
        const trimmedCaption = caption.trim();
        if (faqType === 0) {
            setData({
                title: trimmedTitle,
                messages: [{
                    text: trimmedContent,
                    type: faqType,
                }],
                parentId: id,
            });
        } else {
            setData({
                title: trimmedTitle,
                messages: [{
                    text: trimmedContent,
                    type: faqType,
                    caption: trimmedCaption,
                }],
                parentId: id,
            });
        }
    }, [title, content, caption]);

    useEffect(() => {
        if (!isOpen) {
            // modal is closed
            setTitle('');
            setContent('');
            setData({
                title: '',
                messages: [{
                    text: '',
                    type: FaqMessageTypeEnum.Text,
                }],
                parentId: '',
            });

            setFaqType(FaqMessageTypeEnum.Text);
            setError('');
        }
    }, [isOpen]);

    const SaveHandler = () => {
        let validationError = '';

        if (faqType === 0) {
            validationError = Validators.ValidateTextFaq(title, content);
            setError(validationError);
        }

        if (faqType === 1) {
            validationError = Validators.ValidateImageFaq(title, caption, content);
            setError(validationError);
        }

        if (faqType === 2) {
            validationError = Validators.ValidateVideoFaq(title, caption, content);
            setError(validationError);
        }

        if (faqType === 3) {
            validationError = Validators.ValidateDocumentFaq(title, caption, content);
            setError(validationError);
        }

        if (!validationError.length) {
            onConfirmed(data);
            toggle();
        }
    };

    const renderUploadField = () => {
        if (faqType !== 0) {
            return (
                <div style={{ display: 'block', marginBottom: '20px' }}>
                    <Label>{`Upload ${uploadFieldLabel}`}</Label>
                    <UploadField
                        faqType={faqType}
                        onChange={(url: string) => setContent(url)}
                    />
                    <Text>*The title and caption will be attached with the selected media</Text>
                </div>
            );
        }

        return false;
    };

    const renderTextAreaBasedOnType = () => {
        if (faqType === 0) {
            return (
                <TextArea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder='Message...'
                    css={styles.inputContent}
                />
            );
        }

        return (
            <TextArea
                value={caption}
                onChange={e => setCaption(e.target.value)}
                placeholder='Caption...'
                css={styles.inputContent}
            />
        );
    };

    const renderCharacterLimit = () => {
        if (faqType === 0) {
            return `Number of characters ${title.length + content.length}/${wordLimit}`;
        }

        return `Number of characters ${title.length + caption.length}/${wordLimit}`;
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered size='lg'>
            <ModalHeader>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        minWidth: '765px',
                    }}
                >
                    <Text>{header}</Text>
                    <FaqTypeDropdown
                        onChange={(type: FaqMessageTypeEnum) => setFaqType(type)}
                    />
                </div>

            </ModalHeader>
            <ModalBody>
                {renderUploadField()}

                <Label>Title</Label>
                <CustomInput
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder='Title...'
                    css={styles.inputTitle}
                />

                <Label>{contentLabel}</Label>
                {renderTextAreaBasedOnType()}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {error ? <Text style={{ color: '#d32f2f' }}>{error}</Text> : <div />}
                    <Text>
                        {renderCharacterLimit()}
                    </Text>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button label='Save' onClick={SaveHandler} css={styles.saveButton} />
                <Button label='Cancel' onClick={toggle} css={styles.cancelButton} />
            </ModalFooter>
        </Modal>
    );
};

AddModal.defaultProps = {
    header: '',
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
    uploadButton: css`
        background-color: #1976d2;
        color: white;
        font-size: 18px; 
        border-radius: 5px;
        width: 100px;
        height: 40px;
        margin-right: 10px;

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
        outline: none;
        border: none;
        font-size: 22px;
        height: 50px;
        padding-left: 10px;
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
    dropdown: css`
        background-color: pink;
    `,
};

export default AddModal;
