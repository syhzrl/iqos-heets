import React, { FunctionComponent } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { css } from 'styled-components';
import Button from './Button';

interface CustomModalProps {
    header?: string;
    bodyText?: string;
    isOpen: boolean;
    toggle: () => void;
    onConfirmed: () => void;
}

const CustomModal: FunctionComponent<CustomModalProps> = (props: CustomModalProps) => {
    const { header, bodyText, isOpen, toggle, onConfirmed } = props;

    const deleteHandler = () => {
        onConfirmed();
        toggle();
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} centered>
            <ModalHeader>{header}</ModalHeader>
            <ModalBody>
                {bodyText}
            </ModalBody>
            <ModalFooter>
                <Button label='Delete' onClick={deleteHandler} css={styles.deleteButton} />
                <Button label='Cancel' onClick={toggle} css={styles.cancelButton} />
            </ModalFooter>
        </Modal>
    );
};

CustomModal.defaultProps = {
    header: '',
    bodyText: '',
};

const styles = {
    cancelButton: css`
        background-color: #616161;
        color: white;
        font-size: 18px; 
        border-radius: 10px;
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
    deleteButton: css`
        background-color: #d32f2f;
        color: white;
        font-size: 18px; 
        border-radius: 10px;
        width: 100px;

        &:hover {
            background-color: #ff6659;
            color: white;
        }

        &:active {
            background-color: #9a0007;
            color: white;
        }
    `,
};

export default CustomModal;
