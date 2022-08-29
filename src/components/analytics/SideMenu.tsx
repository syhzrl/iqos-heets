import React, { FunctionComponent, useState, useEffect } from 'react';
import styled from 'styled-components';

import Selectors from 'redux/Selectors';
import Actions from 'redux/Actions';
import { RootState, AppDispatch } from 'redux/store';
import { connect } from 'react-redux';

import { AnalyticsTypeEnum } from 'entities/analytics';

import Colors from 'assets/themes/Colors';

import Text from 'components/Text';

const StyledSideMenu = styled.div`
    background-color: ${Colors.primary};

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    align-self: flex-start;
    position: sticky;
    top: 0;
    left: 0;

    width: 20%;

    height: 100vh;

    > * {
        &:first-child {
            margin-top: 40px;
        }

        margin-bottom: 20px;
    }
`;

interface SideMenuButtonProps {
    selected: boolean;
}

const SideMenuButton = styled.button<SideMenuButtonProps>`
    background-color: ${props => (props.selected ? Colors.secondary : Colors.primary)};

    border: ${props => (props.selected ? 'none' : `1px solid ${Colors.secondary}`)};

    color: ${props => (props.selected ? 'black' : 'white')};

    width: 80%;
    height: 50px;

    font-size: 20px;

    border-radius: 5px;

    transition: all ease 0.3s;
`;

interface SideMenuProps {
    selectedAnalyticsType: AnalyticsTypeEnum;
    setSelectedAnalyticsType: (type: AnalyticsTypeEnum) => void;
    setMasterExportModalOpen: (state: boolean) => void;
}

const SideMenu: FunctionComponent<SideMenuProps> = (props: SideMenuProps) => {
    const { selectedAnalyticsType, setSelectedAnalyticsType, setMasterExportModalOpen } = props;

    return (
        <StyledSideMenu>

            <SideMenuButton
                selected={selectedAnalyticsType === AnalyticsTypeEnum.growth}
                onClick={() => setSelectedAnalyticsType(AnalyticsTypeEnum.growth)}
            >
                <Text>Growth</Text>
            </SideMenuButton>

            <SideMenuButton
                selected={selectedAnalyticsType === AnalyticsTypeEnum.followers}
                onClick={() => setSelectedAnalyticsType(AnalyticsTypeEnum.followers)}
            >
                <Text>Followers</Text>
            </SideMenuButton>

            <SideMenuButton
                selected={selectedAnalyticsType === AnalyticsTypeEnum.notifications}
                onClick={() => setSelectedAnalyticsType(AnalyticsTypeEnum.notifications)}
            >
                <Text>Notifications</Text>
            </SideMenuButton>

            <SideMenuButton
                selected={selectedAnalyticsType === AnalyticsTypeEnum.viewBySources}
                onClick={() => setSelectedAnalyticsType(AnalyticsTypeEnum.viewBySources)}
            >
                <Text>Views By Source</Text>
            </SideMenuButton>

            <SideMenuButton
                selected={selectedAnalyticsType === AnalyticsTypeEnum.languages}
                onClick={() => setSelectedAnalyticsType(AnalyticsTypeEnum.languages)}
            >
                <Text>Languages</Text>
            </SideMenuButton>

            <SideMenuButton
                selected={selectedAnalyticsType === AnalyticsTypeEnum.interaction}
                onClick={() => setSelectedAnalyticsType(AnalyticsTypeEnum.interaction)}
            >
                <Text>Interactions</Text>
            </SideMenuButton>

            <SideMenuButton
                selected={selectedAnalyticsType === AnalyticsTypeEnum.posts}
                onClick={() => setSelectedAnalyticsType(AnalyticsTypeEnum.posts)}
            >
                <Text>Posts</Text>
            </SideMenuButton>

            <SideMenuButton
                selected={selectedAnalyticsType === AnalyticsTypeEnum.hour}
                onClick={() => setSelectedAnalyticsType(AnalyticsTypeEnum.hour)}
            >
                <Text>Views By Hour</Text>
            </SideMenuButton>

            <SideMenuButton
                selected={false}
                onClick={() => setMasterExportModalOpen(true)}
            >
                <Text>Master Export</Text>
            </SideMenuButton>

        </StyledSideMenu>
    );
};

const mapStateToProps = (state: RootState) => ({
    selectedAnalyticsType: Selectors.getAnalyticsGetSelectedAnalyticsType(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    setSelectedAnalyticsType: (type: AnalyticsTypeEnum) => dispatch(Actions.setAnalyticsType(type)),
    setMasterExportModalOpen: (state: boolean) => dispatch(Actions.setMasterExportModalOpen(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
