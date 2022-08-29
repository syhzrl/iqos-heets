import React, { useState, CSSProperties, FunctionComponent, useEffect } from 'react';
import { css } from 'styled-components';
import SVG from 'react-inlinesvg';

import { connect } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import Selectors from 'redux/Selectors';
import Actions from 'redux/Actions';

import { FaqMessageTypeEnum, IEditFaqDTO } from 'entities/faq';

import InnerCollapsible from 'components/InnerCollapsible';
import Text from 'components/Text';
import Button from 'components/Button';
import Input from 'components/Input';
import FaqTypeChip from 'components/FaqTypeChip';

import Colors from 'assets/themes/Colors';
import Icons from 'assets/icons/Index';

import Validators from 'lib/Validators';

import CardBody from './CardBody';

interface FaqCardProps {
    id: string;
    cardTitle: string;
    cardContent: string;
    cardCaption: string;
    cardType: FaqMessageTypeEnum;
    onClickPlus?: () => void;
    onClickDelete?: () => void;
    editFaq(data: IEditFaqDTO): void;
    reorderFaq(id: string, direction: string): void;
    index: number;
    searchedFaqId: string;
}

interface StylesDictionary {
    [Key: string]: CSSProperties;
}

const FaqCard: FunctionComponent<FaqCardProps> = (props: FaqCardProps) => {
    const {
        id,
        cardTitle,
        cardContent,
        cardCaption,
        cardType,
        onClickDelete,
        onClickPlus,
        editFaq,
        reorderFaq,
        index,
        searchedFaqId,
    } = props;

    const [title, setTitle] = useState(cardTitle);
    const [content, setContent] = useState(cardContent);
    const [caption, setCaption] = useState(cardCaption);
    const [isEditing, setIsEditing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState('');
    const [wordLimit, setWordLimit] = useState(0);

    useEffect(() => {
        switch (cardType) {
            case 0: setWordLimit(4094); break;
            case 1: setWordLimit(1021); break;
            case 2: setWordLimit(1021); break;
            case 3: setWordLimit(1021); break;
            default: break;
        }
    }, [cardType]);

    const toggleCollapsible = () => {
        setIsOpen(!isOpen);
    };

    const saveClickHandler = () => {
        let validationError = '';
        const trimmedTitle = title.trim();
        const trimmedContent = content.trim();
        const trimmedCaption = caption.trim();

        if (cardType === 0) {
            validationError = Validators.ValidateTextFaq(trimmedTitle, trimmedContent);
            setError(validationError);
        }

        if (cardType === 1) {
            if (caption) validationError = Validators.ValidateImageFaq(trimmedTitle, trimmedCaption, trimmedContent);
            setError(validationError);
        }

        if (cardType === 2) {
            if (caption) validationError = Validators.ValidateVideoFaq(trimmedTitle, trimmedCaption, trimmedContent);
            setError(validationError);
        }

        if (cardType === 3) {
            if (caption) validationError = Validators.ValidateDocumentFaq(trimmedTitle, trimmedCaption, trimmedContent);
            setError(validationError);
        }

        if (!validationError.length) {
            if (cardType === 0) {
                editFaq({
                    id,
                    title: trimmedTitle,
                    messages: [
                        {
                            text: trimmedContent,
                            type: cardType,
                        },
                    ],
                });
            } else {
                editFaq({
                    id,
                    title: trimmedTitle,
                    messages: [
                        {
                            text: trimmedContent,
                            caption: trimmedCaption,
                            type: cardType,
                        },
                    ],
                });
            }
            setIsEditing(false);
            setError('');
        }
    };

    const cancelClickHandler = () => {
        // reset all data on
        setIsEditing(false);
        setTitle(cardTitle);
        setContent(cardContent);
        setCaption(cardCaption);
        setError('');
    };

    const upArrowClickHandler = () => {
        reorderFaq(id, 'up');
    };

    const downArrowClickHandler = () => {
        reorderFaq(id, 'down');
    };

    const renderTopContainer = () => {
        return (
            <div style={id === searchedFaqId ? containerStyles.topContainerSelected : containerStyles.topContainer}>
                <div style={{ display: 'flex', width: '100%' }}>
                    {isEditing ? (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Input
                                placeholder='Title...'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                css={styles.inputTitle}
                            />
                            <FaqTypeChip type={cardType} />
                        </div>
                    ) : (

                        <Button
                            onClick={() => toggleCollapsible()}
                            css={isOpen ? styles.chevronDown : styles.chevronRight}
                        >
                            <Text style={{ fontSize: '22px', textAlign: 'left' }}>{title}</Text>
                            <SVG src={Icons.ChevronRight} id='chevron' />
                            <FaqTypeChip type={cardType} />
                        </Button>

                    )}
                </div>

                <div style={containerStyles.pressableContainer}>
                    <Button
                        onClick={onClickPlus}
                        css={styles.plusIcon}
                    >
                        <SVG src={Icons.PlusIcon} id='plus' />
                    </Button>

                    <Button
                        onClick={onClickDelete}
                        css={styles.trashIcon}
                    >
                        <SVG src={Icons.TrashIcon} id='trash' />
                    </Button>

                    <Button
                        onClick={upArrowClickHandler}
                        css={styles.upIcon}
                    >
                        <SVG src={Icons.UpArrow} id='up' />
                    </Button>

                    <Button
                        onClick={downArrowClickHandler}
                        css={styles.downIcon}
                    >
                        <SVG src={Icons.DownArrow} id='down' />
                    </Button>
                </div>
            </div>
        );
    };

    const renderCharacterLimit = () => {
        if (cardType === 0) {
            return `Number of characters ${title.length + content.length}/${wordLimit}`;
        }

        return `Number of characters ${title.length + caption.length}/${wordLimit}`;
    };

    const renderCardBody = () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '10px', paddingBottom: '10px', width: '100%' }}>
                <CardBody
                    cardType={cardType}
                    cardTitle={cardTitle}
                    cardContent={content}
                    cardCaption={caption}
                    isEditing={isEditing}
                    onChangeContent={setContent}
                    onChangeCaption={setCaption}
                    onClickSave={saveClickHandler}
                    onClickCancel={cancelClickHandler}
                />
                {isEditing && <Text style={{ marginLeft: '15px' }}>{renderCharacterLimit()}</Text>}
                <Text style={{ color: 'red', marginLeft: '15px' }}>{error}</Text>
            </div>
        );
    };

    const renderCard = () => {
        return (
            <div style={containerStyles.card}>

                {renderCardBody()}

                <Button
                    onClick={() => setIsEditing(true)}
                    css={styles.pencilIcon}
                >
                    <SVG src={Icons.PencilIcon} id='pencil' />
                </Button>
            </div>
        );
    };

    return (
        <div style={{ borderBottom: '1px solid rgb(0,0,0,0.1)' }}>
            <div style={index % 2 === 0 ? containerStyles.indicatorEven : containerStyles.indicatorOdd} />
            <InnerCollapsible key={id} title={renderTopContainer()} content={renderCard()} isOpen={isOpen} />
        </div>
    );
};

const containerStyles: StylesDictionary = {
    stripEditing: {
        backgroundColor: '#DCDCDC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px',
        width: '100%',
    },
    stripIdle: {
        backgroundColor: 'yellow',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px',
        width: '90%',
    },
    card: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '5px',
        border: '1px solid black',
        borderRadius: '10px',
        position: 'relative',
    },
    topContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        marginTop: '3px',
    },
    topContainerSelected: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#dbbe9a',
        marginTop: '3px',
        borderRadius: '5px',
    },
    pressableContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    indicatorOdd: {
        width: '1%',
        height: '100%',
        backgroundColor: Colors.secondary,
        position: 'absolute',
        left: '0px',
    },
    indicatorEven: {
        width: '1%',
        height: '100%',
        backgroundColor: Colors.primary,
        position: 'absolute',
        left: '0px',
    },
};

const styles = {
    saveButton: css`
        background-color: #C4C4C4;
        color: black;
        font-size: 18px; 
        border-radius: 50px;
        width: 100px;
        margin-right: 10px;

        &:hover {
            background-color: #1976d2;
            color: white;
        }

        &:active {
            background-color: #004ba0;
            color: white;
        }
    `,
    cancelButton: css`
        background-color: #C4C4C4;
        color: black;
        font-size: 18px; 
        border-radius: 50px;
        width: 100px;

        &:hover {
            background-color: #d32f2f;
            color: white;
        }

        &:active {
            background-color: #9a0007;
            color: white;
        }
    `,
    plusIcon: css`
        background-color: transparent;
        width: 35px;
        height: 35px;
        
        #plus {
            width: 20px;
            height: 20px;
            &:hover{
                color: #388e3c;
            }
        }
    `,
    trashIcon: css`
        background-color: transparent;
        width: 35px;
        height: 35px;

        #trash {
            width: 20px;
            height: 20px;
            &:hover{
                color: #d32f2f;
            }
        }
    `,
    pencilIcon: css`
        background-color: transparent;
        margin-left: 10px;
        margin-right: 10px;
        width: 35px;
        height: 35px;
        justify-self: flex-end;
        // position: absolute;
        // top: 0; 
        // right: 0;

        #pencil {
            width: 20px;
            height: 20px;
            &:hover{
                color: #1976d2;
            }
        }
    `,
    upIcon: css`
        background-color: transparent;
        width: 35px;
        height: 35px;

        #up {
            width: 20px;
            height: 20px;
            &:hover{
                color: ${Colors.secondary};
            }
        }
    `,
    downIcon: css`
        background-color: transparent;
        width: 35px;
        height: 35px;
        #down {
            width: 20px;
            height: 20px;
            &:hover{
                color: ${Colors.secondary};
            }
        }
    `,
    inputTitle: css`
        background-color: #DCDCDC;
        outline: none;
        border: none;
        font-size: 23px;
        height: 100%;
        padding-left: 20px;
        border-radius: 50px;

        &:hover {
            background-color: #C4C4C4;
        }
    `,
    inputContent: css`
        height: 310px;
        width: 700px;
        margin-top: 10px;
        &:hover {
            background-color: #C4C4C4;
        }
    `,
    inputContentTextArea: css`
        height: 310px;
        width: 1100px;
        margin-top: 10px;
        margin-left: 10px;
        &:hover {
            background-color: #C4C4C4;
        }
    `,
    chevronRight: css`
        background-color: transparent;
        margin-right: 100px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        text {
            margin-left: 10px;
        }

        #chevron {
            width: 20px;
            height: 20px;
            margin-left: 10px;
        }

        &:hover {
            #chevron {
                color: ${Colors.secondary};
                transition: 0.3s;
            }

            #icon {
                color: ${Colors.secondary};
                transition: 0.3s;
            }
        }
    `,
    chevronDown: css`
        background-color: transparent;
        margin-right: 100px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        text {
            margin-left: 10px;
        }

        #chevron {
            transform: rotate(90deg) scale(1);
            width: 20px;
            height: 20px;
            margin-left: 10px;
        }

        &:hover {
            #chevron {
                color: ${Colors.secondary};
                transition: 0.5s;
            }

            #icon {
                color: ${Colors.secondary};
                transition: 0.3s;
            }
        }
    `,
};

FaqCard.defaultProps = {
    onClickDelete: () => console.log('deleted'),
    onClickPlus: () => console.log('deleted'),
};

const mapStateToProps = (state: RootState) => ({
    loading: Selectors.getFaqFaqsAttempting(state),
    error: Selectors.getFaqFaqsError(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    editFaq: (data: IEditFaqDTO) => dispatch(Actions.updateAttempt(data)),
    reorderFaq: (id: string, direction: string) => dispatch(Actions.reorderAttempt({ id, direction })),
});

export default connect(mapStateToProps, mapDispatchToProps)(FaqCard);
