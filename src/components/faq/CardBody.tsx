import React, { FunctionComponent, useState, useEffect, SyntheticEvent } from 'react';
import ReactPlayer from 'react-player';
import { css } from 'styled-components';
import reactImageSize from 'react-image-size';
import { Input as UploadInput, Spinner, FormFeedback } from 'reactstrap';
import axios from 'axios';

import Selectors from 'redux/Selectors';
import { RootState } from 'redux/store';
import { connect } from 'react-redux';

import { FaqMessageTypeEnum } from 'entities/faq';

import Config from 'config';

import Validators from 'lib/Validators';

import Text from 'components/Text';
import TextArea from 'components/TextArea';
import Button from 'components/Button';

import PdfViewer from './PdfViewer';

interface CardBodyProps {
    isEditing?: boolean;
    cardType?: FaqMessageTypeEnum;
    cardTitle: string;
    cardContent: string;
    cardCaption: string;
    onChangeContent: (content: string) => void;
    onChangeCaption: (caption: string) => void;
    onClickSave?: () => void;
    onClickCancel?: () => void;
    authToken: string;
}

const CardBody: FunctionComponent<CardBodyProps> = (props: CardBodyProps) => {
    const {
        isEditing,
        cardType,
        cardTitle,
        cardContent,
        cardCaption,
        onClickSave,
        onClickCancel,
        onChangeCaption,
        onChangeContent,
        authToken,
    } = props;

    const [uploadError, setUploadError] = useState('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        setUploadError('');
    }, [onClickCancel]);

    const uploadFile = (file: File) => {
        setUploading(true);
        setUploadError('');

        const endpoint = `${Config.baseUrl}/v1/faq/fileUpload`;

        const formData = new FormData();
        formData.append('media', file);
        formData.append('fileType', cardType?.toString() || '');

        const config = {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'content-type': 'multipart/form-data',
            },
        };

        axios.post(endpoint, formData, config).then(response => {
            const url = response.data || '';

            setUploading(false);
            onChangeContent(url); // this part will send the url back to the faq card
        }).catch((err: any) => {
            // eslint-disable-next-line no-console
            console.log(err);
            setUploading(false);
            setUploadError(err.message);
        });
    };

    const imageFileHandler = async (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;

        if (target.files) {
            const [file] = target.files;

            const img = new Image();

            img.src = window.URL.createObjectURL(file);

            if (target.files) {
                const { size } = file;
                try {
                    const { width, height } = await reactImageSize(img.src);

                    const heightWidthRatio = width / height;

                    const imageDimensionsError = Validators.ValidateImageDimensions(size, width, height, heightWidthRatio);

                    setUploadError(imageDimensionsError);

                    if (!imageDimensionsError.length) {
                        uploadFile(file);
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
    };

    const videoFileHandler = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;

        if (target.files) {
            const [file] = target.files;
            const { size } = file;

            const videoSizeError = Validators.ValidateVideoSize(size);

            setUploadError(videoSizeError);

            if (!videoSizeError.length) {
                uploadFile(file);
            }
        }
    };

    const documentFileHandler = (event: SyntheticEvent) => {
        const target = event.target as HTMLInputElement;

        if (target.files) {
            const [file] = target.files;
            const { size } = file;

            const documentSizeError = Validators.ValidateDocumentSize(size);

            setUploadError(documentSizeError);

            if (!documentSizeError.length) {
                uploadFile(file);
            }
        }
    };

    const renderTextArea = () => {
        return (
            <div>
                <TextArea
                    value={cardCaption || ''}
                    onChange={(e) => onChangeCaption(e.target.value)}
                    css={inputStyles.inputContentTextArea}
                />

                <div style={contentStyles.buttonContainer}>
                    <Button
                        label='Save'
                        onClick={onClickSave}
                        css={inputStyles.saveButton}
                        disabled={uploading}
                    />
                    <Button
                        label='Cancel'
                        onClick={onClickCancel}
                        css={inputStyles.cancelButton}
                        disabled={uploading}
                    />
                </div>
            </div>
        );
    };

    const renderLoadingSpinner = () => {
        return (
            <div style={contentStyles.mediaLoading}>
                <Text style={{ marginRight: '10px', fontSize: '26px' }}>Uploading</Text>
                <Spinner size='lg' color='warning' />
            </div>
        );
    };

    const renderCardBody = () => {
        if (cardType === 0) {
            // text
            if (isEditing) {
                return (
                    <div>
                        <TextArea
                            value={cardContent || ''}
                            onChange={(e) => onChangeContent(e.target.value)}
                            css={inputStyles.inputContent}
                        />
                        <div style={contentStyles.buttonContainer}>
                            <Button
                                label='Save'
                                onClick={onClickSave}
                                css={inputStyles.saveButton}
                            />
                            <Button
                                label='Cancel'
                                onClick={onClickCancel}
                                css={inputStyles.cancelButton}
                            />
                        </div>
                    </div>
                );
            }
            return (
                <Text
                    style={contentStyles.text}
                >
                    {cardContent}
                </Text>
            );
        }

        if (cardType === 1) {
            if (isEditing) {
                return (
                    <div style={{ display: 'flex' }}>
                        <div>
                            {uploading ? (
                                renderLoadingSpinner()
                            ) : (
                                <img
                                    src={cardContent}
                                    alt='alternate'
                                    style={contentStyles.image}
                                />
                            )}
                            <UploadInput
                                type='file'
                                style={{ width: '300px', margin: '15px' }}
                                onChange={event => imageFileHandler(event)}
                                invalid={uploadError.length > 0}
                                accept='image/jpg, image/jpeg, image/png'
                            />
                            <FormFeedback style={{ marginLeft: '15px' }}>{uploadError}</FormFeedback>
                        </div>
                        {renderTextArea()}
                    </div>
                );
            }
            return (
                <div style={{ display: 'flex' }}>
                    <img
                        src={cardContent}
                        alt='alternate'
                        style={contentStyles.image}

                    />
                    <Text style={contentStyles.caption}>{cardCaption}</Text>
                </div>
            );
        }

        if (cardType === 2) {
            // video
            const videoFormat = cardContent.slice(-3);

            if (isEditing) {
                if (videoFormat === 'gif') {
                    return (
                        <div style={{ display: 'flex' }}>
                            <div>
                                {uploading ? (
                                    renderLoadingSpinner()
                                ) : (
                                    <img
                                        src={cardContent}
                                        alt='alternate'
                                        style={contentStyles.image}
                                    />
                                )}
                                <UploadInput
                                    type='file'
                                    style={{ width: '300px', margin: '15px' }}
                                    onChange={event => videoFileHandler(event)}
                                    invalid={uploadError.length > 0}
                                    accept='video/mp4, image/gif'
                                />
                                <FormFeedback style={{ marginLeft: '15px' }}>{uploadError}</FormFeedback>
                            </div>
                            {renderTextArea()}
                        </div>
                    );
                }

                return (
                    <div style={{ display: 'flex' }}>
                        <div>
                            {uploading ? (
                                renderLoadingSpinner()
                            ) : (
                                <ReactPlayer
                                    url={cardContent}
                                    playing
                                    light
                                    width='400px'
                                    height='300px'
                                    controls
                                    style={contentStyles.reactPlayer}
                                />
                            )}
                            <UploadInput
                                type='file'
                                style={{ width: '300px', margin: '15px' }}
                                onChange={event => videoFileHandler(event)}
                                invalid={uploadError.length > 0}
                                accept='video/mp4, image/gif'
                            />
                            <FormFeedback style={{ marginLeft: '15px' }}>{uploadError}</FormFeedback>
                        </div>
                        {renderTextArea()}
                    </div>
                );
            }

            if (videoFormat === 'gif') {
                return (
                    <div style={{ display: 'flex' }}>
                        <img
                            src={cardContent}
                            alt='alternate'
                            style={contentStyles.image}

                        />
                        <Text style={contentStyles.caption}>{cardCaption}</Text>
                    </div>
                );
            }

            return (
                <div style={{ display: 'flex' }}>
                    <ReactPlayer
                        url={cardContent}
                        playing
                        muted
                        light
                        width='400px'
                        height='300px'
                        controls
                        style={contentStyles.reactPlayer}
                    />
                    <Text style={contentStyles.caption}>{cardCaption}</Text>
                </div>
            );
        }

        if (cardType === 3) {
            // document
            if (isEditing) {
                return (
                    <div style={{ display: 'flex' }}>
                        <div>
                            {uploading ? (
                                renderLoadingSpinner()
                            ) : (
                                <PdfViewer
                                    file={cardContent || ''}
                                />
                            )}
                            <UploadInput
                                type='file'
                                style={{ width: '300px', margin: '15px' }}
                                onChange={event => documentFileHandler(event)}
                                invalid={uploadError.length > 0}
                                accept='application/pdf'
                            />
                            <FormFeedback style={{ marginLeft: '15px' }}>{uploadError}</FormFeedback>
                        </div>
                        {renderTextArea()}
                    </div>
                );
            }

            return (
                <div style={{ display: 'flex' }}>
                    <PdfViewer
                        file={cardContent || ''}
                    />
                    <Text style={contentStyles.caption}>{cardCaption}</Text>
                </div>
            );
        }

        return false;
    };

    return (
        <div style={{ width: '100%' }}>
            {renderCardBody()}
        </div>
    );
};

const contentStyles = {
    text: {
        width: '100%',
        maxHeight: '400px',
        overflow: 'scroll',
        overflowX: 'hidden',
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: '16px',
        whiteSpace: 'pre-line',
    },
    image: {
        width: '400px',
        height: '310px',
        padding: '10px',
        border: '1px solid',
        borderRadius: '10px',
        margin: '5px',
        marginRight: '15px',
        marginLeft: '15px',
    },
    reactPlayer: {
        width: '400px',
        height: '310px',
        padding: '10px',
        border: '1px solid',
        borderRadius: '10px',
        margin: '5px',
        marginRight: '15px',
        marginLeft: '15px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        transition: '0.5s',
        marginTop: '10px',
    },
    mediaLoading: {
        width: '400px',
        height: '310px',
        padding: '10px',
        border: '1px solid',
        borderRadius: '10px',
        margin: '5px',
        marginRight: '15px',
        marginLeft: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    caption: {
        marginTop: '5px',
        marginLeft: '20px',
        whiteSpace: 'pre-line',
        maxHeight: '400px',
        width: '100%',
        overflow: 'scroll',
        overflowX: 'hidden',
    },
};

const inputStyles = {
    inputContent: css`
        height: 300px;
        width: 1300px;
        margin-top: 5px;
        margin-left: 10px;
        &:hover {
            background-color: #C4C4C4;
        }
    `,
    inputContentTextArea: css`
        height: 300px;
        width: 800px;
        margin-top: 5px;
        &:hover {
            background-color: #C4C4C4;
        }
    `,
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
};

CardBody.defaultProps = {
    isEditing: false,
    cardType: FaqMessageTypeEnum.Text,
    onClickSave: () => console.log('Saved!'),
    onClickCancel: () => console.log('Cancelled!'),
};

const mapStateToProps = (state: RootState) => ({
    authToken: Selectors.getAuthAuthToken(state),
});

export default connect(mapStateToProps)(CardBody);
