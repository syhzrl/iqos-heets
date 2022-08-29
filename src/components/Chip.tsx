import React, { FunctionComponent } from 'react';
import styled, { keyframes } from 'styled-components';

import Icon from './Icon';
import Icons from '../assets/icons/Index';

interface ChipProps {
  text?: string;
  onClick: () => void;
}

const styleIcon = {
    color: 'black',
    height: '20px',
    width: '20px',
    cursor: 'pointer',
    margin: '0 0 0 8px',
    padding: '0',
};

const chipAnimation = keyframes`
  0% { transform: scale(0.4); opacity: 0; }
  100% (transform: scale(1); opacity: 1; )
`;

const StyledChip = styled.button`
  display: inline-flex;
  align-items:center;
  justify-content: center;

  padding: 9px 10px;
  margin: 0px 15px;

  border-radius: 26px;
  border: 2px solid #d3d2d2;

  background-color: #fff;

  animation-name: ${chipAnimation};
  animation-duration: .1s;
  transition: all .2s;
  
  &:hover {
    box-shadow: 0 .5px .5px #888;
    transform: translateY(-1px);
  }

  &:active {
    outline: none;
    box-shadow: 0 .3px #888;
    transform: translateY(0);
  }
`;

const Chip: FunctionComponent<ChipProps> = ({ text, onClick }: ChipProps) => {
    return (
        <StyledChip onClick={onClick}>
            {text}
            <Icon source={Icons.CloseCircle} style={styleIcon} />
        </StyledChip>
    );
};

Chip.defaultProps = {
    text: '',
};

export default Chip;
