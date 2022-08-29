import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import Colours from 'assets/themes/Colors';
import Text from './Text';

interface HeaderButtonProps {
    text?: string;
    onClick: () => void;
    isSelected: boolean;
}

const StyledButton = styled.button<HeaderButtonProps>`
    background: ${Colours.primary};
    padding: 10px;
    border: none;
    font-size: 18px;
    transition: 0.3s;
    width: 100%;

    div {
        color: white;
        transition: 0.5s;
    }

    &:hover {
        div {
            color: ${Colours.secondary};
            transition: 0.5s;
        }
    }

    ${props => props.isSelected && `
        box-shadow: 0px -1px 0px 0px ${Colours.secondary} inset;
    `}
`;

const HeaderButton: FunctionComponent<HeaderButtonProps> = ({ text, onClick, isSelected, ...props }: HeaderButtonProps) => {
    return (
        <StyledButton onClick={onClick} isSelected={isSelected} {...props}>
            <Text>{text}</Text>
        </StyledButton>
    );
};

HeaderButton.defaultProps = {
    text: '',
};

export default HeaderButton;
