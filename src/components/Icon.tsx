import React, { CSSProperties, FunctionComponent } from 'react';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';

export interface IconProps {
    source: string;
    style?: CSSProperties;
}

const StyledSVG = styled(SVG)`
    color: #9f805d;
    margin-left: 5px;
    margin-right: 5px;
`;

const Icon: FunctionComponent<IconProps> = (props: IconProps) => {
    const { source, style } = props;
    return (
        <StyledSVG src={source} style={style} />
    );
};

export default Icon;
