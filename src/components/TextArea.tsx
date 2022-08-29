import React, { FunctionComponent, ChangeEvent } from 'react';

import styled, { FlattenSimpleInterpolation } from 'styled-components';

export interface TextAreaProps {
    placeholder?: string;
    value: string;
    onChange(e: ChangeEvent<HTMLInputElement>): void;
    [x: string]: any;
    css?: FlattenSimpleInterpolation;
}

const StyledTextArea = styled.textarea<TextAreaProps>`
    background-color: #DCDCDC;
    outline: none;
    border: none;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 12px;

    ${props => props.css}
`;

const TextArea: FunctionComponent<TextAreaProps> = ({
    placeholder = '',
    value,
    onChange,
    ...props
}) => {
    return (
        <StyledTextArea placeholder={placeholder} value={value} onChange={onChange} {...props} />
    );
};

export default TextArea;
