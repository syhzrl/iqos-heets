import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Spinner } from 'reactstrap';

import Selectors from 'redux/Selectors';
import Actions from 'redux/Actions';
import { RootState, AppDispatch } from 'redux/store';
import { connect } from 'react-redux';

import Text from 'components/Text';
import { IOverview } from 'entities/analytics';

const InfoBox = styled.div`
    width: 40%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px;

    font-size: 22px;
`;

interface InfoCardProps {
    text: string;
    current: number;
    previous: number;
}

const InfoCard: FunctionComponent<InfoCardProps> = (props: InfoCardProps) => {
    const { text, current, previous } = props;

    const calculcatePercentage = (curr: number, prev: number) => {
        if (curr === 0 && prev === 0) return 0;

        const result = Math.abs(Math.floor(((current - previous) / current) * 100));

        return result;
    };

    return (
        <InfoBox>
            <div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                        }}
                    >
                        {current}
                    </Text>
                    <Text
                        style={{
                            fontSize: '18px',
                            marginLeft: '10px',
                            color: (current - previous > 0) ? 'green' : 'red',
                        }}
                    >
                        {`${current - previous} (${calculcatePercentage(current, previous)}%)`}
                    </Text>
                </div>
                <Text>{text}</Text>
            </div>
        </InfoBox>
    );
};

interface OverviewCardProps {
    getOverviewLoading: boolean;
    getOverviewError: string;
    overviewData: IOverview;
    isLanu: boolean;
    getOverview: () => void;
}

const OverviewCard: FunctionComponent<OverviewCardProps> = (props: OverviewCardProps) => {
    const { getOverviewLoading, getOverviewError, getOverview, overviewData, isLanu } = props;

    useEffect(() => {
        getOverview();
    }, [isLanu]);

    const renderInfoCards = () => {
        if (typeof overviewData === 'string') {
            return (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '28px',
                        fontWeight: 'bold',
                    }}
                >
                    <Text>Insufficient Data</Text>
                </div>
            );
        }

        return (
            <>
                <div
                    style={{
                        width: '100%',
                        height: '50%',
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}
                >
                    <InfoCard
                        text='Followers'
                        current={overviewData.followers.current}
                        previous={overviewData.followers.previous}
                    />

                    <InfoCard
                        text='Enabled Notifications'
                        current={overviewData.enabledNotifications.enabled}
                        previous={overviewData.enabledNotifications.total}
                    />
                </div>

                <div
                    style={{
                        width: '100%',
                        height: '50%',
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}
                >

                    <InfoCard
                        text='Views Per Post'
                        current={overviewData.viewsPerPost.current}
                        previous={overviewData.viewsPerPost.previous}
                    />

                    <InfoCard
                        text='Shares Per Post'
                        current={overviewData.sharesPerPost.current}
                        previous={overviewData.sharesPerPost.previous}
                    />
                </div>
            </>
        );
    };

    if (getOverviewLoading) {
        return (
            <div
                style={{
                    width: '80%',
                    height: '200px',
                    border: '1px solid black',
                    borderRadius: '10px',
                    backgroundColor: '#F6F6F6',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Spinner color='warning' size='lg' style={{ height: '100px', width: '100px' }} />
            </div>
        );
    }

    if (getOverviewError) {
        return (
            <div
                style={{
                    width: '80%',
                    height: '200px',
                    border: '1px solid black',
                    borderRadius: '10px',
                    backgroundColor: '#F6F6F6',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '26px',
                }}
            >
                <Text style={{ color: 'red' }}>{getOverviewError}</Text>
            </div>
        );
    }

    return (
        <div
            style={{
                width: '80%',
                height: '200px',
                border: '1px solid black',
                borderRadius: '10px',
                backgroundColor: '#F6F6F6',
            }}
        >
            {renderInfoCards()}
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    getOverviewLoading: Selectors.getAnalyticsGetOverviewAttempting(state),
    getOverviewError: Selectors.getAnalyticsGetOverviewError(state),
    overviewData: Selectors.getAnalyticsGetOverview(state),
    isLanu: Selectors.getFaqGetIsLANU(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getOverview: () => dispatch(Actions.getOverviewAttempt()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OverviewCard);
