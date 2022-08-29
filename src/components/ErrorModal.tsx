import React, { FunctionComponent, useState } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

import { css } from 'styled-components';
import Button from './Button';

interface ErrorModalProps {
    bodyText?: string;
    isOpen: boolean;
    onRetry: () => void;
}

const ErrorModal: FunctionComponent<ErrorModalProps> = (props: ErrorModalProps) => {
    const { bodyText, isOpen, onRetry } = props;

    const [isModalOpen, setIsModalOpen] = useState(isOpen);

    const retryHandler = () => {
        onRetry();
        setIsModalOpen(!isModalOpen);
    };

    return (
        <Modal isOpen={isOpen} centered>
            <ModalHeader>Error</ModalHeader>
            <ModalBody>
                {bodyText}
            </ModalBody>
            <ModalFooter>
                <Button label='Retry' onClick={retryHandler} css={styles.retryButton} />
            </ModalFooter>
        </Modal>
    );
};

ErrorModal.defaultProps = {
    bodyText: '',
};

const styles = {
    retryButton: css`
        background-color: #616161;
        color: white;
        font-size: 18px; 
        border-radius: 5px;
        width: 100px;

        &:hover {
            background-color: #8e8e8e;
            color: white;
        }

        &:active {
            background-color: #373737;
            color: white;
        }
    `,
};

export default ErrorModal;
