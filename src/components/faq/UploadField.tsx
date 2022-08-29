import React, { FunctionComponent, SyntheticEvent, useState } from 'react';
import { Input, FormFeedback, Spinner } from 'reactstrap';
import { css } from 'styled-components';
import reactImageSize from 'react-image-size';
import ReactPlayer from 'react-player';
import axios from 'axios';

import Config from 'config';

import { connect } from 'react-redux';
import Selectors from 'redux/Selectors';
import { RootState } from 'redux/store';

import { FaqMessageTypeEnum } from 'entities/faq';

import Validators from 'lib/Validators';

import Button from 'components/Button';
import Text from 'components/Text';

import PdfViewer from './PdfViewer';

interface UploadImageFieldProps {
    faqType: FaqMessageTypeEnum;
    authToken: string;
    onChange: (url: string) => void;
}

const UploadField: FunctionComponent<UploadImageFieldProps> = (props: UploadImageFieldProps) => {
    const { faqType, authToken, onChange } = props;
    const [fileUrl, setFileUrl] = useState('');

    const [uploadError, setUploadError] = useState('');
    const [uploading, setUploading] = useState(false);

    const uploadFile = (file: File) => {
        setUploading(true);
        setUploadError('');

        const endpoint = `${Config.baseUrl}/v1/faq/fileUpload`;

        const formData = new FormData();
        formData.append('media', file);
        formData.append('fileType', faqType.toString());

        const config = {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'content-type': 'multipart/form-data',
            },
        };

        axios.post(endpoint, formData, config).then(response => {
            const url = response.data || '';

            setUploading(false);
            setFileUrl(url);
            onChange(url); // this part will send the url back to the add modal
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

    const retryButtonHandler = () => {
        setFileUrl('');
    };

    const renderUploadFieldBasedOnType = () => {
        if (faqType === 1) {
            // image
            if (uploading) {
                return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ marginRight: '10px' }}>Uploading</Text>
                        <Spinner size='sm' color='warning' />
                    </div>
                );
            }

            if (fileUrl) {
                return (
                    <div>
                        <img
                            src={fileUrl}
                            alt='alternate'
                            style={contentStyles.image}
                        />
                        <Button
                            label='retry'
                            onClick={retryButtonHandler}
                            css={styles.saveButton}
                        />
                    </div>
                );
            }

            return (
                <Input
                    type='file'
                    style={{ width: '400px', marginBottom: '10px' }}
                    onChange={event => imageFileHandler(event)}
                    accept='image/jpg,image/jpeg,image/png'
                    invalid={uploadError.length > 0}
                />
            );
        }

        if (faqType === 2) {
            // video
            if (uploading) {
                return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ marginRight: '10px' }}>Uploading</Text>
                        <Spinner size='sm' color='warning' />
                    </div>
                );
            }

            if (fileUrl) {
                const videoFormat = fileUrl.slice(-3);

                if (videoFormat === 'gif') {
                    return (
                        <div>
                            <img
                                src={fileUrl}
                                alt='alternate'
                                style={contentStyles.image}
                            />
                            <Button
                                label='retry'
                                onClick={retryButtonHandler}
                                css={styles.saveButton}
                            />
                        </div>
                    );
                }

                return (
                    <div>
                        <ReactPlayer
                            url={fileUrl}
                            playing
                            light
                            width='400px'
                            height='300px'
                            controls
                            style={contentStyles.reactPlayer}
                        />
                        <Button
                            label='retry'
                            onClick={retryButtonHandler}
                            css={styles.saveButton}
                        />
                    </div>
                );
            }

            return (
                <Input
                    type='file'
                    style={{ width: '300px', marginBottom: '10px' }}
                    onChange={event => videoFileHandler(event)}
                    accept='video/mp4, image/gif'
                    invalid={uploadError.length > 0}
                />
            );
        }

        if (faqType === 3) {
            // document
            if (uploading) {
                return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Text style={{ marginRight: '10px' }}>Uploading</Text>
                        <Spinner size='sm' color='warning' />
                    </div>
                );
            }

            if (fileUrl) {
                return (
                    <div>
                        <PdfViewer
                            file={fileUrl}
                        />

                        <Button
                            label='retry'
                            onClick={retryButtonHandler}
                            css={styles.saveButton}
                        />

                    </div>
                );
            }

            return (
                <Input
                    type='file'
                    style={{ width: '300px', marginBottom: '10px' }}
                    onChange={event => documentFileHandler(event)}
                    accept='application/pdf'
                    invalid={uploadError.length > 0}
                />
            );
        }

        return false;
    };

    return (
        <div style={{ display: 'block', alignItems: 'center', marginBottom: '10px' }}>
            {renderUploadFieldBasedOnType()}
            <FormFeedback>{uploadError}</FormFeedback>
        </div>
    );
};

const contentStyles = {
    text: {
        width: '100%',
        height: '100%',
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: '16px',
    },
    image: {
        width: '300px',
        height: '200px',
        padding: '10px',
        border: '1px solid',
        borderRadius: '10px',
    },
    reactPlayer: {
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
};

const styles = {
    saveButton: css`
        background-color: #C4C4C4;
        color: black;
        font-size: 18px; 
        border-radius: 5px;
        width: 100px;
        margin-top: 30px;

        &:hover {
            background-color: #1976d2;
            color: white;
        }

        &:active {
            background-color: #004ba0;
            color: white;
        }
    `,
};

const mapStateToProps = (state: RootState) => ({
    authToken: Selectors.getAuthAuthToken(state),
});

export default connect(mapStateToProps)(UploadField);
