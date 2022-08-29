import React, { FunctionComponent, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { css } from 'styled-components';
import SVG from 'react-inlinesvg';

import Button from 'components/Button';
import Text from 'components/Text';

import Icons from 'assets/icons/Index';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`; // black magic shit

interface PdfViewerProps {
    file: string;
}

const PdfViewer: FunctionComponent<PdfViewerProps> = (props: PdfViewerProps) => {
    const { file } = props;

    const [numOfPages, setNumOfPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [isOpen, setIsOpen] = useState(false);

    const onNextPage = () => {
        if (pageNumber !== numOfPages) setPageNumber(pageNumber + 1);
    };

    const onPrevPage = () => {
        if (pageNumber !== 1) setPageNumber(pageNumber - 1);
    };

    const onPageClicked = () => {
        setIsOpen(!isOpen);
        setPageNumber(1);
    };

    const renderPdfModal = () => {
        return (
            <Modal isOpen={isOpen} toggle={onPageClicked} size='lg' centered>
                <ModalHeader>
                    Uploaded Document View
                </ModalHeader>
                <ModalBody style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Document file={file} onLoadSuccess={e => setNumOfPages(e._pdfInfo.numPages)}>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                            <Button onClick={onPrevPage} css={styles.chevrons}>
                                <SVG src={Icons.ChevronLeft} id='chevron' />
                            </Button>

                            <Text>{`Page ${pageNumber} of ${numOfPages}`}</Text>

                            <Button onClick={onNextPage} css={styles.chevrons}>
                                <SVG src={Icons.ChevronRight} id='chevron' />
                            </Button>
                        </div>

                        <Button onClick={onPageClicked} css={styles.pdfPage}>
                            <Page pageNumber={pageNumber} scale={0.8} renderTextLayer={false} />
                        </Button>
                    </Document>
                </ModalBody>
            </Modal>
        );
    };

    return (
        <div style={containerStyles.document}>
            <Document file={file} onLoadSuccess={e => setNumOfPages(e._pdfInfo.numPages)}>

                <Button onClick={onPageClicked} css={styles.pdfPage}>
                    <Page pageNumber={pageNumber} scale={0.3} renderTextLayer={false} />
                </Button>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5px' }}>
                    <Button onClick={onPrevPage} css={styles.chevrons}>
                        <SVG src={Icons.ChevronLeft} id='chevron' />
                    </Button>

                    <Text>{`Page ${pageNumber} of ${numOfPages}`}</Text>

                    <Button onClick={onNextPage} css={styles.chevrons}>
                        <SVG src={Icons.ChevronRight} id='chevron' />
                    </Button>
                </div>
                {renderPdfModal()}
            </Document>
        </div>
    );
};

// imageLoading: {
//     width: '400px',
//     height: '300px',
//     padding: '10px',
//     border: '1px solid',
//     borderRadius: '10px',
//     margin: '5px',
//     marginRight: '15px',
//     marginLeft: '15px',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
// },

const containerStyles = {
    document: {
        width: '400px',
        height: '310px',
        padding: '10px',
        border: '1px solid black',
        borderRadius: '10px',
        margin: '5px',
        marginRight: '15px',
        marginLeft: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

const styles = {
    chevrons: css`
        background-color: transparent;

        #chevron {
            width: 20px;
            height: 20px;
        }
    `,
    pdfPage: css`
        border: 1px solid rgb(0,0,0,0.3);
    `,
};

export default PdfViewer;
