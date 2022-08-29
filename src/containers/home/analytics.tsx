import React, { FunctionComponent, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import { Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import xlsx, { IContent } from 'json-as-xlsx';

import Actions from 'redux/Actions';
import Selectors from 'redux/Selectors';
import { AppDispatch, RootState } from 'redux/store';
import { connect } from 'react-redux';

import {
    AnalyticsTypeEnum,
    IAnalyticsSelector,
    IFollowersAnalytics,
    IGrowthAnalytics,
    IHourAnalytics,
    IInteractionsAnalytics,
    ILanguagesAnalytics,
    INewLanguagesAnalytics,
    INotificationsAnalytics,
    IParsedHourAnalytics,
    IParsedLanguagesAnalytics,
    IPostsAnalytics,
    IViewsBySourceAnalytics,
} from 'entities/analytics';

import SpreadSheetColumns, { ISpreadsheetColumn } from 'lib/SpreadSheetColumns';

import Button from 'components/Button';
import Text from 'components/Text';

import SideMenu from 'components/analytics/SideMenu';
import Table from 'components/analytics/Table';
import Colors from 'assets/themes/Colors';
import Utils from 'lib/Utils';
import MasterExportModal from 'components/analytics/MasterExportModal';
import OverviewCard from 'components/analytics/OverviewCard';

const StyledDatePicker = styled(DatePicker)`
    width: 150px;

    display: flex;
    text-align: center;
`;

interface AnalyticsProps {
    selectedAnalyticsType: AnalyticsTypeEnum;
    analyticsSelector: IAnalyticsSelector;
    analyticsToDownloadLoading: boolean;
    analyticsToDownloadError: string;
    analyticsDataError: string;
    getAnalyticsToDownload: (dateFrom: string, dateTo: string) => void;
}

const Analytics: FunctionComponent<AnalyticsProps> = (props: AnalyticsProps) => {
    const {
        selectedAnalyticsType,
        analyticsSelector,
        analyticsToDownloadLoading,
        analyticsToDownloadError,
        analyticsDataError,
        getAnalyticsToDownload,
    } = props;

    const [dateFrom, setDateFrom] = useState(dayjs().subtract(7, 'd').toDate());
    const [dateTo, setDateTo] = useState(dayjs().toDate());
    const [diffInMonth, setDiffInMonth] = useState(dayjs(dateTo).diff(dateFrom, 'month'));
    const [dataToExport, setDataToExport] = useState<
        IGrowthAnalytics[]
        | IFollowersAnalytics[]
        | INotificationsAnalytics[]
        | IViewsBySourceAnalytics[]
        | ILanguagesAnalytics[]
        | IInteractionsAnalytics[]
        | IPostsAnalytics[]
        | IParsedLanguagesAnalytics[]
        | IParsedHourAnalytics[]
        | IContent[] // type for json-as-xlsx
    >([]);

    useEffect(() => {
        const { growth, followers, notifications, viewsBySource, languages, interactions, posts, hour } = analyticsSelector;

        switch (selectedAnalyticsType) {
            case AnalyticsTypeEnum.growth: setDataToExport(growth); break;
            case AnalyticsTypeEnum.followers: setDataToExport(followers); break;
            case AnalyticsTypeEnum.notifications: setDataToExport(notifications); break;
            case AnalyticsTypeEnum.viewBySources: setDataToExport(viewsBySource); break;
            case AnalyticsTypeEnum.languages: setDataToExport(languages); break;
            case AnalyticsTypeEnum.interaction: setDataToExport(interactions); break;
            case AnalyticsTypeEnum.posts: setDataToExport(posts); break;
            case AnalyticsTypeEnum.hour: setDataToExport(hour); break;
            default:
        }
    }, [selectedAnalyticsType, analyticsSelector]);

    useEffect(() => {
        setDiffInMonth(dayjs(dateTo).diff(dateFrom, 'month'));
    }, [dateFrom, dateTo]);

    const confirmClickHandler = () => {
        getAnalyticsToDownload(dayjs(dateFrom).format('YYYY-MM-DD'), dayjs(dateTo).format('YYYY-MM-DD'));

        setDateFrom(dayjs().subtract(7, 'd').toDate());
        setDateTo(dayjs().toDate());
        setDiffInMonth(0);
    };

    const renderModalBody = () => {
        if (analyticsToDownloadLoading) {
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

        return (
            <Text>
                Date range selected exceed 3 months. Data collected too large to display. Do you want to download the data as a spreadsheet instead?
            </Text>
        );
    };

    const renderMoreThan3MonthsWarningModal = () => {
        return (
            <Modal isOpen={diffInMonth > 3 || analyticsToDownloadLoading} centered>
                <ModalHeader>Warning</ModalHeader>
                <ModalBody>
                    {renderModalBody()}
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={confirmClickHandler}
                        css={ItemStyles.confirmButton}
                    >
                        <Text>
                            Confirm
                        </Text>
                    </Button>

                    <Button
                        onClick={() => setDateFrom(dayjs().subtract(7, 'd').toDate())}
                        css={ItemStyles.cancelButton}
                    >
                        <Text>
                            Cancel
                        </Text>
                    </Button>
                </ModalFooter>
            </Modal>
        );
    };

    const renderErrorModal = () => {
        return (
            <Modal isOpen={analyticsToDownloadError.length > 0 || analyticsDataError.length > 0}>
                <ModalHeader>Error Retrieving Data</ModalHeader>
                <ModalBody>
                    {analyticsToDownloadError || analyticsDataError}
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => window.location.reload()}
                        css={ItemStyles.confirmButton}
                    >
                        <Text>
                            Refresh
                        </Text>
                    </Button>
                </ModalFooter>
            </Modal>
        );
    };

    const downloadSheet = () => {
        const { GrowthColumns, FollowersColumns, NotificationsColumns, ViewsBySourceColumns, InteractionsColumns, PostsColumns } = SpreadSheetColumns;
        let sheetName = '';
        let sheetColumns: ISpreadsheetColumn[] = [];

        switch (selectedAnalyticsType) {
            case AnalyticsTypeEnum.growth:
                sheetName = 'Growth';
                sheetColumns = GrowthColumns;
                break;
            case AnalyticsTypeEnum.followers:
                sheetName = 'Followers';
                sheetColumns = FollowersColumns;
                break;
            case AnalyticsTypeEnum.notifications:
                sheetName = 'Notifications';
                sheetColumns = NotificationsColumns;
                break;
            case AnalyticsTypeEnum.viewBySources:
                sheetName = 'Views By Sources';
                sheetColumns = ViewsBySourceColumns;
                break;
            case AnalyticsTypeEnum.languages:
                sheetName = 'Languages';
                sheetColumns = Utils.Analytics.prepareDynamicDownloadHeaders(dataToExport as INewLanguagesAnalytics[]);
                break;
            case AnalyticsTypeEnum.interaction:
                sheetName = 'Interaction';
                sheetColumns = InteractionsColumns;
                break;
            case AnalyticsTypeEnum.posts:
                sheetName = 'Posts';
                sheetColumns = PostsColumns;
                break;
            case AnalyticsTypeEnum.hour:
                sheetName = 'Hour';
                sheetColumns = Utils.Analytics.prepareDynamicDownloadHeaders(dataToExport as IHourAnalytics[]);
                break;
            default:
        }

        const dataToDownload = [{
            sheet: sheetName,
            columns: sheetColumns,
            content: dataToExport as IContent[], // this type is needed for json-as-xlsx
        }];

        xlsx(dataToDownload, { fileName: 'Channel Statistics', extraLength: 0.1 });
    };

    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
            }}
        >
            <SideMenu />

            <div
                style={{
                    width: '80%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        marginTop: '20px',
                        marginBottom: '20px',
                        width: '80%',
                        fontSize: '26px',
                    }}
                >
                    <Text>
                        Channel Overview
                    </Text>
                </div>
                <OverviewCard />

                <div
                    style={{
                        width: '90%',
                        minHeight: '600px',
                        marginTop: '40px',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            height: '10%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '20px',
                        }}
                    >
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

                        <Button
                            onClick={downloadSheet}
                            css={dataToExport.length ? ItemStyles.exportButton : ItemStyles.exportButtonDisabled}
                            disabled={!dataToExport.length}
                        >
                            <Text>
                                Export as xlsx
                            </Text>
                        </Button>
                    </div>

                    {selectedAnalyticsType === AnalyticsTypeEnum.posts && (
                        <Text
                            style={{ marginBottom: '10px' }}
                        >
                            This information may not be accurate as Telegram only allows us to view a limited amount of our previous posts. Any post before this will no longer be accurately updated.
                        </Text>
                    )}

                    <div
                        style={{
                            height: '90%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            marginBottom: '40px',
                        }}
                    >
                        <Table
                            dateTo={dayjs(dateTo).format('YYYY-MM-DD')}
                            dateFrom={dayjs(dateFrom).format('YYYY-MM-DD')}
                        />
                    </div>

                    {renderMoreThan3MonthsWarningModal()}

                    {renderErrorModal()}

                    <MasterExportModal />
                </div>
            </div>
        </div>
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
    exportButton: css`
        background-color: ${Colors.primary};

        color: white;

        font-size: 18px;
        font-weight: bold;

        padding: 10px;

        &:hover {
            background-color: ${Colors.secondary};
        }
    `,

    exportButtonDisabled: css`
        background-color: #A5AAB5;

        color: white;

        font-size: 18px;
        font-weight: bold;

        padding: 10px;

        cursor: default;
    `,
};

const mapStateToProps = (state: RootState) => ({
    selectedAnalyticsType: Selectors.getAnalyticsGetSelectedAnalyticsType(state),
    analyticsSelector: Selectors.getAnalyticsGetAnalyticsSelector(state),
    analyticsToDownloadLoading: Selectors.getAnalyticsGetAnalyticsToDownloadAttempting(state),
    analyticsToDownloadError: Selectors.getAnalyticsGetAnalyticsToDownloadError(state),
    analyticsDataError: Selectors.getAnalyticsGetAnalyticsDataError(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getAnalyticsToDownload: (dateFrom: string, dateTo: string) => dispatch(Actions.getAnalyticsToDownloadAttempt({ dateFrom, dateTo })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
