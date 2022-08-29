import React, { FunctionComponent } from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Spinner } from 'reactstrap';
import Colors from '../assets/themes/Colors';

export interface ButtonProps {
    label?: string;
    onClick?: () => void;
    loading?: boolean;
    disabled?: boolean;
    [x: string]: any;
    css?: FlattenSimpleInterpolation;
}

const StyledButton = styled.button<ButtonProps>`
    border: 0;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;

    ${props => (props.disabled && !props.$loading) && css`
        background-color: grey;
    `}

    SVG {
        width: 30px;
        height: 30px;
        color: ${Colors.primary};
    }

    ${props => props.css}
`;

const Button: FunctionComponent<ButtonProps> = ({
    onClick,
    label,
    loading = false,
    disabled = false,
    ...props
}: ButtonProps) => {
    const renderBody = () => {
        if (loading) return <Spinner color='warning' size='sm' />;

        return label;
    };

    return (
        <StyledButton
            type='button'
            onClick={onClick}
            disabled={disabled || loading}
            $loading={loading}
            {...props}
        >
            {renderBody()}
            {props.children}
        </StyledButton>
    );
};

export default Button;
