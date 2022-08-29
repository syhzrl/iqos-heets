import React, { FunctionComponent, useState, useEffect } from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import SVG from 'react-inlinesvg';
import Colors from 'assets/themes/Colors';
import Icons from '../assets/icons/Index';
import Button from './Button';

export interface CollapsibleProps {
    title?: any;
    content?: any;
    openFaqs: string[],
    id: string,
}

const StyledDiv = styled.div<{ css?: FlattenSimpleInterpolation }>`
    border-radius: 8px;
    display: flex;

    ${props => props.css}
`;

const StyledCollapsibleDiv = styled.div<{ display: string }>`
    background-color: transparent;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    
    ${props => props.display && css`
        display: ${props.display};
    `} 
`;

const Collapsible: FunctionComponent<CollapsibleProps> = ({
    title,
    content,
    openFaqs,
    id,
}: CollapsibleProps) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        openFaqs.forEach(item => {
            if (item === id) setIsOpen(true);
            return false;
        });

        if (openFaqs.length === 0) setIsOpen(false);
    }, [openFaqs]);

    const renderChevron = () => {
        const { children = [] } = content.props || {};
        if (!children || !children.length) {
            return <div style={{ width: '6%', display: 'flex' }} />;
        }

        return (
            <div style={{ width: '6%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    css={isOpen ? styles.chevronDown : styles.chevronRight}
                >
                    <SVG src={Icons.ChevronRight} id='chevron' />
                </Button>
            </div>
        );
    };

    return (
        <StyledDiv css={isOpen ? styles.expandedDiv : styles.initialDiv}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                {renderChevron()}
                <div style={{ width: '100%', height: '100%' }}>
                    <div style={{ width: '100%' }}>
                        {title}
                    </div>

                    {isOpen && (
                        <StyledCollapsibleDiv
                            display={isOpen ? 'flex' : 'none'}
                        >
                            {content}
                        </StyledCollapsibleDiv>
                    )}

                </div>
            </div>
        </StyledDiv>
    );
};

const styles = {
    chevronRight: css`
        background-color: transparent;
        margin-top: 5px;
        #chevron {
            width: 30px;
            height: 30px;
            transition: 0.3s;

            color: ${Colors.primary};

            &:hover{
                color: ${Colors.secondary};
            }
        }
    `,
    chevronDown: css`
        background-color: transparent;
        margin-top: 5px;
        #chevron {
            width: 30px;
            height: 30px;
            transform: rotate(90deg);
            transition: 0.3s;

            color: ${Colors.primary};

            &:hover{
                color: ${Colors.secondary};
            }
        }
    `,
    initialDiv: css`
        height: 100%;
        width: 100%;
        transition: height 0.5s;
    `,
    expandedDiv: css`
        width: 100%;
        transition: height 0.5s;
    `,
};

export default Collapsible;
