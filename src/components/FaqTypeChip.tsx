import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Colors from 'assets/themes/Colors';
import SVG from 'react-inlinesvg';
import { FaqMessageTypeEnum } from 'entities/faq';
import Icons from 'assets/icons/Index';

interface FaqTypeChipProps {
    type: FaqMessageTypeEnum;
}

const StyledChip = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledSVG = styled(SVG)`
    margin-left: 5px;
    margin-right: 5px;
    height: 30px;
    width: 30px;
`;

const FaqTypeChip: FunctionComponent<FaqTypeChipProps> = ({ type }: FaqTypeChipProps) => {
    const { Text, Image, Video, Document } = FaqMessageTypeEnum;

    const renderIconsBasedOnType = () => {
        if (type === Text) {
            return (
                <StyledSVG src={Icons.Text} id='icon' />
            );
        }

        if (type === Image) {
            return (
                <StyledSVG src={Icons.Image} id='icon' />
            );
        }

        if (type === Video) {
            return (
                <StyledSVG src={Icons.Video} id='icon' />
            );
        }

        if (type === Document) {
            return (
                <StyledSVG src={Icons.Pdf} id='icon' />
            );
        }

        return false;
    };

    return (
        <StyledChip>
            {renderIconsBasedOnType()}
        </StyledChip>
    );
};

export default FaqTypeChip;
