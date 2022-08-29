import React, { FunctionComponent, useState, useEffect, CSSProperties } from 'react';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import Actions from 'redux/Actions';

import styled from 'styled-components';
import { ISearchQuery } from 'entities/faq';

import {
    Dropdown,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

import Selectors from 'redux/Selectors';
import Fonts from 'assets/themes/Fonts';

import Text from 'components/Text';

interface StylesDictionary {
    [Key: string]: CSSProperties;
}

interface CustomDropdownProps {
    dropdownData: ISearchQuery[];
    error: string;
    noSearchResults: boolean;
    setSearchQuery: (title: string) => void;
    setSearchChipText: (title: string) => void;
    getSearchData(searchedFaqId: string): void;
}

const StyledItemContainer = styled.div`
  max-height: 110px;
  overflow: hidden;
  overflow-y: auto;

  // &::-webkit-scrollbar {
  //   display: none;
  // }
`;

const CustomDropdown: FunctionComponent<CustomDropdownProps> = (props: CustomDropdownProps) => {
    const { dropdownData, error, noSearchResults, setSearchQuery, setSearchChipText, getSearchData } = props;

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((currentState: boolean) => currentState);

    useEffect(() => {
        if (dropdownData.length !== 0 || error.length || noSearchResults) {
            setDropdownOpen(true);
        } else {
            setDropdownOpen(false);
        }
    }, [dropdownData, noSearchResults, error]);

    const onSearch = (currentProps: ISearchQuery) => {
        const { id, text } = currentProps;

        setSearchQuery(text);
        setSearchChipText(text);

        setDropdownOpen(false);

        getSearchData(id);
    };

    const renderBody = () => {
        if (error) {
            return (
                <div style={styles.errorContainer}>
                    <Text style={{ ...styles.infoText, ...styles.errorText }}>{error}</Text>
                </div>
            );
        }

        if (noSearchResults) {
            return (
                <div style={styles.errorContainer}>
                    <Text style={styles.infoText}>No results found.</Text>
                </div>
            );
        }

        return dropdownData.map((item) => {
            return (
                <DropdownItem key={item.id} onClick={() => onSearch(item)}>{item.text}</DropdownItem>
            );
        });
    };

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownMenu style={{ width: '100%' }}>
                <StyledItemContainer>
                    {renderBody()}
                </StyledItemContainer>
            </DropdownMenu>
        </Dropdown>
    );
};

const styles: StylesDictionary = {
    errorContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
    },
    errorText: {
        color: 'red',
    },
    infoText: {
        fontFamily: Fonts.primary,
        fontSize: 14,
        textAlign: 'center',
        alignSelf: 'center',
        marginRight: 5,
        marginLeft: 5,
    },
};

const mapStateToProps = (state: RootState) => ({
    error: Selectors.getFaqSearchAutocompleteError(state),
    noSearchResults: Selectors.getFaqNoSearchResults(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    setSearchQuery: (value: string) => dispatch(Actions.setSearchQuery(value)),
    setSearchChipText: (value: string) => dispatch(Actions.setSearchChipText(value)),
    getSearchData: (searchedFaqId: string) => dispatch(Actions.getSearchData(searchedFaqId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomDropdown);
