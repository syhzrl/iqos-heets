import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface HeaderProps {
    text?: string;
}

const StyledDiv = styled.div<HeaderProps>`
    padding: 30px;
    text-align: center;
    background: #202030;
    color: white;
    font-size: 30px;
    font-family: Cabin-Semibold;
    width: 100%;
`;

const Header: FunctionComponent<HeaderProps> = ({ text }: HeaderProps) => {
    return (
        <StyledDiv>{text}</StyledDiv>
    );
};

Header.defaultProps = {
    text: '',
};

export default Header;
