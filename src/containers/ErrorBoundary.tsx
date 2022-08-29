import React, { PureComponent, ReactNode, CSSProperties } from 'react';

import Fonts from 'assets/themes/Fonts';

import Text from 'components/Text';

interface MyProps {
    children: ReactNode;
}

interface MyState {
    hasError: boolean;
}

export interface StylesDictionary {
    [Key: string]: CSSProperties;
}

class ErrorBoundary extends PureComponent<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);

        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(): MyState {
        return { hasError: true };
    }

    componentDidCatch(error: unknown, errorInfo: React.ErrorInfo): void {
        console.log(error);
        console.log(errorInfo);
    }

    render(): ReactNode {
        const { children } = this.props;
        const { hasError } = this.state;

        if (hasError) {
            return (
                <div style={styles.container}>
                    {/* <TrafficCone style={{ height: 100, width: 100 }} /> */}

                    <Text style={styles.title}>
                        Sorry, something went wrong on our end.
                    </Text>

                    <Text style={styles.text}>
                        Please refresh the page in a little bit or contact us at liew@bikebear.com.my
                    </Text>
                </div>
            );
        }

        return children;
    }
}

const styles: StylesDictionary = {
    container: {
        flex: 1,
        height: '100vh',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        marginTop: 20,
        fontFamily: Fonts.primary,
        fontSize: 22,
    },
    text: {
        marginTop: 20,
        fontFamily: Fonts.primary,
        fontSize: 16,
    },
};

export default ErrorBoundary;
