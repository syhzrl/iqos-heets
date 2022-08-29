import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Fonts from 'assets/themes/Fonts';

export interface TextProps {
    [x: string]: any;
}

const StyledText = styled.div<TextProps>`
    font-family: ${Fonts.primary};
`;
const Text: FunctionComponent<TextProps> = ({ ...props }: TextProps) => {
    const { children } = props;
    return <StyledText {...props}>{children}</StyledText>;
};

export default Text;
