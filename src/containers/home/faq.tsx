import React, { useState, CSSProperties, FunctionComponent, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { css } from 'styled-components';
import SVG from 'react-inlinesvg';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from 'redux/store';
import throttle from 'lodash.throttle';
import { Spinner } from 'reactstrap';

import Selectors from 'redux/Selectors';
import Actions from 'redux/Actions';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ICreateFaqDTO } from 'redux/slices/faq/types';
import { IFaq, ISearchQuery } from 'entities/faq';

import Input from 'components/Input';
import Icon from 'components/Icon';
import Button from 'components/Button';
import Text from 'components/Text';
import Chip from 'components/Chip';
import CustomDropdown from 'components/DropdownSearchbar';
import CustomModal from 'components/Modal';
import AddModal from 'components/AddModal';
import ErrorModal from 'components/ErrorModal';
import CopyWritingModal from 'components/CopyWritingModal';
import FaqList from 'components/faq/FaqList';
import WelcomeMessageCollapsible from 'components/faq/WelcomeMessage';
import AppVersion from 'components/AppVersion';

import Colors from 'assets/themes/Colors';
import Icons from 'assets/icons/Index';

interface FaqViewProps {
    loading: boolean;
    error: string;
    getFaqs(): void;
    deleteFaq(id: string): void;
    createFaq(data: ICreateFaqDTO): void;
    faqData: IFaq[];
    searchQuery: string;
    setSearchQuery(value: string): void;
    searchChipText: string;
    clearSearch(): void;
    loadingAutocomplete: boolean;
    getSearchAutocomplete(query: string): void;
    searchAutocompleteList: ISearchQuery[]
    clearSearchAutomplete(): void,
    searchedFaqId: string;
    openFaqs: string[];
}

interface StylesDictionary {
    [Key: string]: CSSProperties;
}

const FaqView: FunctionComponent<FaqViewProps> = (props: FaqViewProps) => {
    const { loading, error, faqData, getFaqs, deleteFaq, createFaq, searchQuery, setSearchQuery, searchChipText, clearSearch, loadingAutocomplete, getSearchAutocomplete, searchAutocompleteList, clearSearchAutomplete, searchedFaqId, openFaqs } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isCopyWritingModalOpen, setIsCopyWritingModalOpen] = useState(false);
    const [idBeingDeleted, setIdBeingDeleted] = useState<string | null>(null);
    const [parentId, setParentId] = useState<string>('');

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const toggleAddModal = () => {
        setIsAddModalOpen(!isAddModalOpen);
    };

    const toggleCopyWritingModal = () => {
        setIsCopyWritingModalOpen(!isCopyWritingModalOpen);
    };

    useEffect(() => {
        getFaqs();
    }, []);

    const throttledSetSearchChip = useRef(throttle((searchWord: string) => {
        clearSearchAutomplete();
        getSearchAutocomplete(searchWord);
    }, 1200, { leading: false }));

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchQuery(value);

        throttledSetSearchChip.current(value);
    };

    const onAddClicked = (id: string) => {
        setParentId(id);
        toggleAddModal();
    };

    const onAddConfirmed = (data: ICreateFaqDTO) => {
        if (parentId) {
            createFaq(data);
        } else {
            toast.error('Creation failed. Please try again.');
        }
    };

    const onDeleteClicked = (id: string) => {
        setIdBeingDeleted(id);
        toggleModal();
    };

    const onDeleteConfirmed = () => {
        if (idBeingDeleted) {
            deleteFaq(idBeingDeleted);
        } else {
            toast.error('Deletion failed. Please try again.');
        }
    };

    const sortedFaqData = faqData?.slice().sort((a, b) => a.orderId - b.orderId);

    const renderFaqCards = () => {
        if (loading) return <Skeleton count={7} height={30} width={1800} />;

        return (
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', height: '100', width: '90%' }}>
                {
                    faqData.length ? (
                        sortedFaqData.map((item) => {
                            const { id, title, messages, children } = item;
                            const sortedChildren = children?.slice().sort((a, b) => a.orderId - b.orderId);

                            return (
                                <FaqList
                                    key={id}
                                    id={id}
                                    title={title}
                                    messages={messages[0].text}
                                    captions={messages[0].caption || ''}
                                    faqType={messages[0].type}
                                    onClickPlus={onAddClicked}
                                    onClickDelete={onDeleteClicked}
                                    index={0}
                                    openFaqs={openFaqs}
                                    searchedFaqId={searchedFaqId}
                                >
                                    {sortedChildren}
                                </FaqList>
                            );
                        })
                    ) : <Text style={{ fontSize: 16, marginTop: '50px' }}>You have No FAQs created. Create one now!</Text>
                }
            </div>
        );
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
            <div style={containerStyles.welcomeMessageBar}>
                <Text style={{ marginLeft: 110, fontSize: '22px' }}>Welcome Message</Text>
                <AppVersion />
            </div>
            <div style={containerStyles.welcomeMessageCardContainer}>
                <WelcomeMessageCollapsible />
            </div>
            <div style={{ display: 'flex', padding: 5, alignItems: 'center', width: '100%', borderTop: `1px solid ${Colors.primary}` }}>
                <div style={containerStyles.searchBarContainer}>
                    <Icon source={Icons.SearchIcon} style={{ color: 'black', height: '20px', width: '20px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
                        <Input
                            placeholder='Search Category'
                            value={searchQuery}
                            onChange={handleSearchChange}
                            css={styles.inputField}
                        />
                        <CustomDropdown dropdownData={searchAutocompleteList} />
                    </div>
                    {loadingAutocomplete ? <Spinner size='sm' variant='light' style={{ margin: '0 auto' }} /> : ''}
                </div>

                {searchChipText ? <Chip text={searchChipText} onClick={clearSearch} /> : ''}
            </div>

            <div style={containerStyles.titleBar}>
                <Text style={{ marginLeft: 110, fontSize: '22px' }}>Questions</Text>
                <div style={{ display: 'flex' }}>
                    <Button
                        label='Edit Copy Writing'
                        onClick={toggleCopyWritingModal}
                        css={styles.addCategoryButton}
                    />

                    <Button
                        label='Add Category'
                        onClick={() => onAddClicked('0')}
                        css={styles.addCategoryButton}
                    >
                        <SVG src={Icons.PlusIcon} id='plusIcon' />
                    </Button>
                </div>
            </div>

            {renderFaqCards()}

            <CustomModal
                header='Confirmation'
                bodyText='Are you sure you want to delete this?'
                isOpen={isModalOpen}
                toggle={toggleModal}
                onConfirmed={onDeleteConfirmed}
            />
            <AddModal
                header='Add New Card'
                isOpen={isAddModalOpen}
                toggle={toggleAddModal}
                onConfirmed={onAddConfirmed}
                id={parentId}
            />
            <CopyWritingModal
                isOpen={isCopyWritingModalOpen}
                toggle={toggleCopyWritingModal}
            />
            <ErrorModal
                bodyText={error}
                isOpen={error.length > 0 && !error.includes('Please try logging in again.')}
                onRetry={getFaqs}
            />
        </div>
    );
};

const containerStyles: StylesDictionary = {
    searchBarContainer: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#C4C4C4',
        borderRadius: '100px',
        width: '350px',
        paddingLeft: '10px',
        paddingRight: '10px',
        marginLeft: '100px',
    },
    titleBar: {
        background: Colors.primary,
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px',
        width: '100%',
    },
    welcomeMessageBar: {
        background: Colors.primary,
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px',
        width: '100%',
        borderTop: `1px solid ${Colors.secondary}`,
        flexDirection: 'row',
    },
    welcomeMessageCardContainer: {
        height: '100%',
        width: '85%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
};

const styles = {
    addCategoryButton: css`
        margin-top: 5px;
        margin-bottom: 5px;
        width: 200px;
        font-size: 18px;
        display: flex;
        align-items: center;
        border-radius: 100px;
        padding: 5px;
        margin-right: 10px;
        background-color: #B7B4B4;
        height: 30px;

        &:hover {
            background-color: ${Colors.secondary};
            color: ${Colors.primary};
            SVG {
                color: ${Colors.primary};
            }
        }

        &:active {
            background-color: ${Colors.secondary};
        }
    `,

    inputField: css`;
        background-color: #C4C4C4;
        color: black;
        height: 40px;
        font-size: 22px;
        margin-top: 3px;
        margin-bottom: 3px;
        border: none;
        outline: none;
        transition: 0.3s;
        width: 100%;

        &:hover {
            background-color: white;
            transition: 0.3s;
        }
    `,
};

const mapStateToProps = (state: RootState) => ({
    faqData: Selectors.getFaqFaqs(state),
    loading: Selectors.getFaqFaqsAttempting(state),
    error: Selectors.getFaqFaqsError(state),
    editing: Selectors.getFaqFaqsEditing(state),
    searchQuery: Selectors.getFaqSearchQuery(state),
    searchChipText: Selectors.getFaqSearchChipText(state),
    loadingAutocomplete: Selectors.getFaqSearchAutocompleteAttempt(state),
    searchAutocompleteList: Selectors.getFaqSearchAutocomplete(state),
    searchedFaqId: Selectors.getFaqSearchedFaqId(state),
    openFaqs: state.faq.openFaqs,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getFaqs: () => dispatch(Actions.getAttempt()),
    deleteFaq: (id: string) => dispatch(Actions.deleteAttempt({ id })),
    createFaq: (data: ICreateFaqDTO) => dispatch(Actions.createAttempt(data)),
    editFaq: (data: IFaq) => dispatch(Actions.updateAttempt(data)),
    reorderFaq: (id: string, direction: string) => dispatch(Actions.reorderAttempt({ id, direction })),
    setSearchQuery: (value: string) => dispatch(Actions.setSearchQuery(value)),
    clearSearch: () => dispatch(Actions.clearSearch()),
    getSearchAutocomplete: (query: string) => dispatch(Actions.getSearchAutocompleteAttempt({ query })),
    clearSearchAutomplete: () => dispatch(Actions.clearSearchAutomplete()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FaqView);
