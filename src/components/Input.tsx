import React, { ChangeEvent, FunctionComponent } from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';

export interface InputProps {
    /**
     * Placeholder for input
     */
    placeholder?: string;
    /**
     * Value for input
     */
    value: string;
    /**
     * Callback function for onChangeText
     */
    onChange(e: ChangeEvent<HTMLInputElement>): void;
    /**
     * Callback function for when "Enter" key is pressed
     */
    onEnterPressed?(): void;
    /**
     * Label of the input
     */
    label?: string;
    /**
     * Disabled prop
    */
    disabled?: boolean;
    /**
     * Id of the component
     */
    id?: string;
    /**
     * Type (default is input, can set to password)
     */
    type?: string;
    css?: FlattenSimpleInterpolation;
}

const StyledInput = styled.input<InputProps>`
    padding: 5px;
    border: 1px solid white;
    background-color: pink;
    border-radius: 5px;
    outline-color: #96bfff;
    width: 100%;
    ${props => props.css}
`;

const StyledLabel = styled.label`
    font-size: 24px;
    color: white;
`;

const Input: FunctionComponent<InputProps> = ({
    placeholder,
    value,
    onChange,
    onEnterPressed,
    label,
    id,
    type = 'text',
    disabled = false,
    ...props
}: InputProps) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (onEnterPressed && e.key === 'Enter') {
            e.preventDefault();
            onEnterPressed();
        }
    };

    const renderLabel = () => {
        if (!label) return false;

        return (
            <div style={{ marginBottom: 5 }}>
                <StyledLabel>
                    {label}
                </StyledLabel>
            </div>
        );
    };

    return (
        <div>
            {renderLabel()}
            <StyledInput
                type={type}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                id={id}
                {...props}
            />
        </div>
    );
};

export default Input;
