import React, { CSSProperties, FunctionComponent } from 'react';
import { Spinner, Modal } from 'reactstrap';

import Text from './Text';

export interface LoadingOverlayProps {
    active: boolean;
    children?: any;
}

interface StylesDictionary {
    [Key: string]: CSSProperties;
}

const CustomLoadingOverlay: FunctionComponent<LoadingOverlayProps> = ({ active, children }) => {
    return (
        <Modal
            isOpen={active}
            size='sm'
            fade={false}
            backdrop
            centered
        >
            <div style={styles.container}>
                <Spinner color='warning' size='sm' />
                <Text style={styles.text}>Loading..</Text>
            </div>
        </Modal>
    );
};

const styles: StylesDictionary = {
    container: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
    },
    text: {
        verticalAlign: 'center',
        paddingLeft: 8,
    },
};

export default CustomLoadingOverlay;
