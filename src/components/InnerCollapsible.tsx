import React, { FunctionComponent } from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

export interface CollapsibleProps {
    title?: any;
    content?: any;
    isOpen: boolean;
}

const StyledDiv = styled.div<{ css?: FlattenSimpleInterpolation }>`
    border-radius: 8px;
    display: flex;

    ${props => props.css}

    // &:hover {
    //     // background: linear-gradient(180deg, rgba(240, 244, 255, 0.5) 0%, rgba(0, 173, 210, 0.1) 100%);
    //     background: #DCDCDC;
    // }
`;

const StyledCollapsibleDiv = styled.div<{ display: string }>`
    background-color: transparent;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-top: 8px;
    margin-bottom: 12px;
    
    ${props => props.display && css`
        display: ${props.display};
    `} 
`;

const InnerCollapsible: FunctionComponent<CollapsibleProps> = ({
    title,
    content,
    isOpen = false,
}: CollapsibleProps) => {
    return (
        <StyledDiv
            css={isOpen ? styles.expandedDiv : styles.initialDiv}
        >
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
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
    chevronUp: css`
        background-color: transparent;
        SVG {
            transition: 0.3s;
            transform: rotate(0);

            &:hover{
                color: purple;
            }
        }
    `,
    chevronDown: css`
        background-color: transparent;
        SVG {
            transform: rotate(180deg);
            transition: 0.3s;

            &:hover{
                color: purple;
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

export default InnerCollapsible;
