import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import dayjs from 'dayjs';

import Selectors from 'redux/Selectors';
import Actions from 'redux/Actions';
import { RootState, AppDispatch } from 'redux/store';
import { connect } from 'react-redux';

import Colors from 'assets/themes/Colors';

import TableHeaders from 'lib/AnalyticsTableHeaders';
import Utils from 'lib/Utils';

import Text from 'components/Text';

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

interface TableProps {
    selectedAnalyticsType: AnalyticsTypeEnum;
    analyticsDataLoading: boolean;
    analyticsToDownloadLoading: boolean;
    dateTo: string;
    dateFrom: string;
    analyticsSelector: IAnalyticsSelector;
    isLanu: boolean;
    getAnalyticsData: (dateFrom: string, dateTo: string) => void;
}

const StyledTable = styled.table`
    min-width: 100%;
    background-color: #F6F6F6;
    border-collapse: collapse;
    table-layout: fixed;
`;

const StyledTHead = styled.thead`
    background-color: ${Colors.primary};
    text-align: center;
`;

const StyledTableBody = styled.tbody`
    text-align: center;
`;

const StyledTh = styled.th`
    padding: 20px;
    border-bottom: 1px solid rgb(0,0,0,0.3);
    font-size: 22px;
    color: white;
`;

const StyledTr = styled.tr`
    &:not(:last-of-type) {
        border-bottom: 1px solid rgb(0,0,0,0.3);
    }
`;

const StyledTd = styled.td`
    padding: 20px;
    font-size: 18px;
`;

const Table: FunctionComponent<TableProps> = (props: TableProps) => {
    const {
        getAnalyticsData,
        dateTo,
        dateFrom,
        analyticsSelector,
        selectedAnalyticsType,
        analyticsDataLoading,
        analyticsToDownloadLoading,
        isLanu,
    } = props;

    const [headers, setHeaders] = useState<string[]>([]);
    const [tableData, setTableData] = useState<
        IGrowthAnalytics[]
        | IFollowersAnalytics[]
        | INotificationsAnalytics[]
        | IViewsBySourceAnalytics[]
        | ILanguagesAnalytics[]
        | INewLanguagesAnalytics[]
        | IInteractionsAnalytics[]
        | IPostsAnalytics[]
        | IParsedLanguagesAnalytics[]
        | IParsedHourAnalytics[]
        | IHourAnalytics[]
    >([]);

    useEffect(() => {
        if (dayjs(dateTo).diff(dateFrom, 'month') < 4 && !analyticsToDownloadLoading) {
            getAnalyticsData(dateFrom, dateTo);
        }
    }, [selectedAnalyticsType, dateFrom, dateTo, analyticsToDownloadLoading, isLanu]);

    useEffect(() => {
        const { growth, followers, notifications, viewsBySource, languages, interactions, posts, hour } = analyticsSelector;

        switch (selectedAnalyticsType) {
            case AnalyticsTypeEnum.growth: setHeaders(TableHeaders.GrowthHeader); setTableData(growth); break;
            case AnalyticsTypeEnum.followers: setHeaders(TableHeaders.FollowersHeader); setTableData(followers); break;
            case AnalyticsTypeEnum.notifications: setHeaders(TableHeaders.NotificationsHeader); setTableData(notifications); break;
            case AnalyticsTypeEnum.viewBySources: setHeaders(TableHeaders.ViewsBySourceHeader); setTableData(viewsBySource); break;
            case AnalyticsTypeEnum.languages: setHeaders(Utils.Analytics.prepareDynamicHeaders(languages)); setTableData(languages); break;
            case AnalyticsTypeEnum.interaction: setHeaders(TableHeaders.InteractionsHeader); setTableData(interactions); break;
            case AnalyticsTypeEnum.posts: setHeaders(TableHeaders.PostsHeader); setTableData(posts); break;
            case AnalyticsTypeEnum.hour: setHeaders(Utils.Analytics.prepareDynamicHeaders(hour)); setTableData(hour); break;
            default:
        }
    }, [analyticsSelector, selectedAnalyticsType]);

    const renderTableBody = () => {
        if (analyticsDataLoading) {
            return (
                <tr>
                    <td colSpan={headers.length}>
                        <div>
                            <Skeleton count={5} height={50} />
                        </div>
                    </td>
                </tr>
            );
        }

        if (!tableData.length) {
            return (
                <tr>
                    <td colSpan={headers.length} style={{ padding: '20px', fontSize: '18px' }}>
                        <div>
                            <Text>There appears to be no data yet. Telegram might not be returning data to us if the channel is too small.</Text>
                        </div>
                    </td>
                </tr>

            );
        }

        return (
            <>
                {tableData.map((obj) => (
                    <StyledTr key={Math.random()}>
                        {Object.values(obj).map((item: string) => {
                            return (
                                <StyledTd key={Math.random()}>
                                    {item}
                                </StyledTd>
                            );
                        })}
                    </StyledTr>
                ))}
            </>
        );
    };

    return (
        <StyledTable>
            <StyledTHead>
                <tr>
                    {headers.map((item) => (
                        <StyledTh key={item}>
                            {item}
                        </StyledTh>
                    ))}
                </tr>
            </StyledTHead>
            <StyledTableBody>
                {renderTableBody()}
            </StyledTableBody>
        </StyledTable>
    );
};

const mapStateToProps = (state: RootState) => ({
    selectedAnalyticsType: Selectors.getAnalyticsGetSelectedAnalyticsType(state),
    analyticsDataLoading: Selectors.getAnalyticsGetAnalyticsDataAttempting(state),
    analyticsSelector: Selectors.getAnalyticsGetAnalyticsSelector(state),
    analyticsToDownloadLoading: Selectors.getAnalyticsGetAnalyticsToDownloadAttempting(state),
    isLanu: Selectors.getFaqGetIsLANU(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getAnalyticsData: (dateFrom: string, dateTo: string) => dispatch(Actions.getAnalyticsAttempt({ dateFrom, dateTo })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
