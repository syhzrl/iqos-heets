import React, { FunctionComponent, useState, CSSProperties, useEffect } from 'react';
import { css } from 'styled-components';
import SVG from 'react-inlinesvg';

import { connect } from 'react-redux';
import Selectors from 'redux/Selectors';
import Actions from 'redux/Actions';
import Skeleton from 'react-loading-skeleton';

import InnerCollapsible from 'components/InnerCollapsible';
import TextArea from 'components/TextArea';
import Text from 'components/Text';
import Button from 'components/Button';
import Input from 'components/Input';

import Colors from 'assets/themes/Colors';
import Icons from 'assets/icons/Index';
import { AppDispatch, RootState } from 'redux/store';
import { IFaq } from 'entities/faq';
import Validators from 'lib/Validators';

interface WelcomeMessageCollapsibleProps {
    loading: boolean;
    getWelcomeMessage: IFaq | null;
    setWelcomeMessage(value: string): void;
}

interface StylesDictionary {
    [Key: string]: CSSProperties;
}

const WelcomeMessageCollapsible: FunctionComponent<WelcomeMessageCollapsibleProps> = (props: WelcomeMessageCollapsibleProps) => {
    const { loading, getWelcomeMessage, setWelcomeMessage } = props;

    const [isOpen, setIsOpen] = useState(true);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [initialContent, setInitialContent] = useState('');
    const [initialTitle, setInitialTitle] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (getWelcomeMessage) {
            setTitle(getWelcomeMessage.title);

            const messagesText = getWelcomeMessage.messages.map(item => item.text);

            setContent(messagesText.join(', '));

            setInitialTitle(title);
            setInitialContent(content);
        }
    }, [getWelcomeMessage]);

    const toggleCollapsible = () => {
        setIsOpen(!isOpen);
    };

    const saveClickHandler = () => {
        const welcomeMsgError = Validators.ValidateWelcomeMessage(content);
        setError(welcomeMsgError);

        if (!welcomeMsgError.length) {
            setWelcomeMessage(content);
            setIsEditing(false);
            setError('');
        }
    };

    const cancelClickHandler = () => {
        if (getWelcomeMessage) {
            setContent(initialContent);
            setTitle(initialTitle);
            setError('');
            setIsEditing(false);
        }
    };

    const renderTopContainer = () => {
        return (
            <div style={containerStyles.topContainer}>
                <div style={{ display: 'flex', width: '100%' }}>
                    {isEditing ? (
                        <Input
                            placeholder='Title...'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            css={styles.inputTitle}
                        />
                    ) : (

                        <Button
                            onClick={() => toggleCollapsible()}
                            css={isOpen ? styles.chevronDown : styles.chevronRight}
                        >
                            <Text style={{ fontSize: '22px' }}>{title}</Text>
                            <SVG src={Icons.ChevronRight} id='chevron' />
                        </Button>

                    )}

                </div>

                <div style={containerStyles.pressableContainer}>
                    <Button
                        onClick={() => setIsEditing(true)}
                        css={styles.pencilIcon}
                    >
                        <SVG src={Icons.PencilIcon} id='pencil' />
                    </Button>
                </div>
            </div>
        );
    };

    const renderCard = () => {
        return (
            <div style={containerStyles.card}>
                <div style={{ height: '100%', display: 'flex' }}>
                    {isEditing ? (
                        <div style={{ width: '100%' }}>
                            <TextArea value={content} onChange={(e) => setContent(e.target.value)} css={styles.inputContent} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', transition: '0.5s' }}>
                                <Text>
                                    {`Number of characters ${title.length + content.length}/4094`}
                                </Text>
                                <div style={{ display: 'flex' }}>
                                    <Button
                                        label='Save'
                                        onClick={saveClickHandler}
                                        css={styles.saveButton}
                                    />
                                    <Button
                                        label='Cancel'
                                        onClick={cancelClickHandler}
                                        css={styles.cancelButton}
                                    />
                                </div>
                            </div>
                            <Text style={{ color: 'red' }}>
                                {error}
                            </Text>
                        </div>
                    ) : (
                        <Text style={{
                            width: '100%',
                            height: '100%',
                            paddingLeft: 5,
                            paddingRight: 5,
                            alignSelf: 'center',
                            fontSize: '16px',
                        }}
                        >
                            {content}
                        </Text>
                    )}
                </div>
            </div>
        );
    };

    if (loading) return <Skeleton count={2} height={30} width={1500} />;

    return (
        <InnerCollapsible isOpen={isOpen} title={renderTopContainer()} content={renderCard()} />
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
        flexDirection: 'column',
        padding: '5px',
        border: '1px solid black',
        borderRadius: '10px',
    },
    topContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        marginTop: '3px',
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
        height: 150px;
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
                transition: 0.5s;
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
        }
    `,
};

const mapStateToProps = (state: RootState) => ({
    getWelcomeMessage: Selectors.getFaqWelcomeMsg(state),
    loading: Selectors.getFaqSetWelcomeMsgAttempting(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    setWelcomeMessage: (value: string) => dispatch(Actions.updateWelcomeMsgAttempt(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeMessageCollapsible);
