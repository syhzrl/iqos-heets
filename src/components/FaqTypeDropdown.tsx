import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { FaqMessageTypeEnum } from 'entities/faq';

import Colors from 'assets/themes/Colors';

import Text from './Text';

interface FaqTypeDropdownProps {
    onChange: (type: FaqMessageTypeEnum) => void;
}

const StyledDropdown = styled(Dropdown)`
    .btn-secondary {
        background-color: ${Colors.primary};
        border: none;
        box-shadow: none;

        &:hover {
            color: ${Colors.secondary};
        }

        &:focus {
            background-color: ${Colors.primary};
            color: white;
            box-shadow: none;
        } 
    }
  
    ${props => props.css}
`;

const StyledDropdownToggle = styled(DropdownToggle)`
    background-color: ${Colors.primary};
    font-size: 18px;
    width: 130px;
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledDropdownMenu = styled(DropdownMenu)`
    min-width: 130px;
`;

const StyledDropdownItem = styled(DropdownItem)`
    font-size: 18px;

    &:hover {
        background-color: ${Colors.primary};
        color: white;
    }
`;

const FaqTypeDropdown: FunctionComponent<FaqTypeDropdownProps> = ({
    onChange,
}: FaqTypeDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [faqType, setFaqType] = useState('Text');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const messageTypes = [{
        type: FaqMessageTypeEnum.Text,
        label: 'Text',
    },
    {
        type: FaqMessageTypeEnum.Image,
        label: 'Image',
    },
    {
        type: FaqMessageTypeEnum.Video,
        label: 'Video',
    },
    {
        type: FaqMessageTypeEnum.Document,
        label: 'Document',
    }];

    const dropdownItemClickHandler = (label: string, type: FaqMessageTypeEnum) => {
        setFaqType(label);
        onChange(type);
    };

    const renderDropdownItem = () => {
        return (
            messageTypes.map((item) => {
                const { type, label } = item;
                return (
                    <StyledDropdownItem onClick={() => dropdownItemClickHandler(label, type)} key={type}>
                        {label}
                    </StyledDropdownItem>
                );
            })
        );
    };

    return (
        <StyledDropdown isOpen={isOpen} toggle={toggleDropdown}>
            <StyledDropdownToggle caret>
                <Text style={{ marginRight: '5px' }}>{faqType}</Text>
            </StyledDropdownToggle>
            <StyledDropdownMenu>
                {renderDropdownItem()}
            </StyledDropdownMenu>
        </StyledDropdown>
    );
};

export default FaqTypeDropdown;
