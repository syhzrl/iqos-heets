import React, { FunctionComponent, useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import styled, { css } from 'styled-components';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';

import Selectors from 'redux/Selectors';
import Actions from 'redux/Actions';
import { RootState, AppDispatch } from 'redux/store';
import { connect } from 'react-redux';

import Button from 'components/Button';
import Text from 'components/Text';

const StyledDatePicker = styled(DatePicker)`
    // width: 150px;
    display: flex;
    text-align: center;
    margin: 0;
`;

interface MasterExportModalProps {
    isModalOpen: boolean;
    masterExportLoading: boolean;
    masterExportError: string;
    setMasterExportModalOpen: (state: boolean) => void;
    masterExport: (dateFrom: string, dateTo: string) => void;
}

const MasterExportModal: FunctionComponent<MasterExportModalProps> = (props: MasterExportModalProps) => {
    const {
        isModalOpen,
        masterExportLoading,
        masterExportError,
        setMasterExportModalOpen,
        masterExport,
    } = props;

    const [dateFrom, setDateFrom] = useState(dayjs().subtract(7, 'd').toDate());
    const [dateTo, setDateTo] = useState(dayjs().toDate());

    const confirmClickHandler = () => {
        masterExport(dayjs(dateFrom).format('YYYY-MM-DD'), dayjs(dateTo).format('YYYY-MM-DD'));

        setDateFrom(dayjs().subtract(7, 'd').toDate());
        setDateTo(dayjs().toDate());
    };

    const renderModalBody = () => {
        if (masterExportLoading) {
            return (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Spinner color='warning' size='lg' />
                </div>
            );
        }

        if (masterExportError) {
            return (
                <Text>
                    {masterExportError}
                </Text>
            );
        }

        return (
            <>
                <Text
                    style={{
                        fontSize: '18px',
                        marginBottom: '10px',
                    }}
                >
                    Please choose master export date range.
                </Text>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <StyledDatePicker
                            selected={dateFrom}
                            onChange={date => setDateFrom(date as Date)}
                            placeholderText='Start Date'
                            dateFormat='dd-MM-yyyy'
                        />
                    </div>

                    <div
                        style={{
                            marginRight: '10px',
                            marginLeft: '10px',
                            fontSize: '18px',
                        }}
                    >
                        to
                    </div>

                    <div>
                        <StyledDatePicker
                            selected={dateTo}
                            onChange={date => setDateTo(date as Date)}
                            placeholderText='End Date'
                            dateFormat='dd-MM-yyyy'
                            maxDate={new Date()}
                        />
                    </div>
                </div>
            </>
        );
    };

    return (
        <Modal isOpen={isModalOpen} toggle={() => setMasterExportModalOpen(!isModalOpen)} centered size='lg'>
            <ModalHeader>
                Master Export
            </ModalHeader>
            <ModalBody>
                {renderModalBody()}
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={confirmClickHandler}
                    css={ItemStyles.confirmButton}
                >
                    <Text>Confirm</Text>
                </Button>

                <Button
                    onClick={() => setMasterExportModalOpen(false)}
                    css={ItemStyles.cancelButton}
                >
                    <Text>Cancel</Text>
                </Button>
            </ModalFooter>
        </Modal>
    );
};

const ItemStyles = {
    confirmButton: css`
        background-color: #1976d2;
        color: white;
        font-size: 18px; 

        width: 80px;
        height: 40px;
    `,
    cancelButton: css`
        background-color: #d32f2f;
        color: white;
        font-size: 18px; 

        width: 80px;
        height: 40px;
    `,
};

const mapStateToProps = (state: RootState) => ({
    isModalOpen: Selectors.getAnalyticsIsMasterExportModalOpen(state),
    masterExportLoading: Selectors.getAnalyticsMasterExportAttempting(state),
    masterExportError: Selectors.getAnalyticsMasterExportError(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    setMasterExportModalOpen: (state: boolean) => dispatch(Actions.setMasterExportModalOpen(state)),
    masterExport: (dateFrom: string, dateTo: string) => dispatch(Actions.masterExportAttempt({ dateFrom, dateTo })),
});

export default connect(mapStateToProps, mapDispatchToProps)(MasterExportModal);
