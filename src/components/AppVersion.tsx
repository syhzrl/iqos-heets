import React, { FunctionComponent, CSSProperties } from 'react';

import Fonts from 'assets/themes/Fonts';

import Text from 'components/Text';

import PackageJson from '../../package.json';

interface StylesDictionary {
    [Key: string]: CSSProperties;
}

const AppVersion: FunctionComponent = () => {
    return (
        <div>
            <Text style={styles.versionText}>
                v
                {PackageJson.version}
            </Text>
        </div>
    );
};

const styles: StylesDictionary = {
    versionText: {
        fontFamily: Fonts.primary,
        textAlign: 'center',
        fontSize: 14,
        color: 'grey',
        marginRight: 20,
    },
};

export default AppVersion;
