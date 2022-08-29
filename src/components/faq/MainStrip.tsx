import React, { useState, CSSProperties, FunctionComponent } from 'react';
import SVG from 'react-inlinesvg';
import { css } from 'styled-components';

import Button from '../Button';
import Input from '../Input';

import Icons from '../../assets/icons/Index';
import Colors from '../../assets/themes/Colors';

interface StylesDictionary {
    [Key: string]: CSSProperties;
}

const MainStrip:FunctionComponent = () => {
    const [category, setCategory] = useState('Category A');

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px', width: '100%' }}>
            <Input
                placeholder='Category...'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                css={styles.inputField}
            />

            <div style={containerStyles.pressableContainer}>
                <Button
                    onClick={() => console.log('saved')}
                    css={styles.plusIcon}
                >
                    <SVG src={Icons.PlusIcon} />
                </Button>

                <Button
                    onClick={() => console.log('saved')}
                    css={styles.trashIcon}
                >
                    <SVG src={Icons.TrashIcon} />
                </Button>

                <Button
                    onClick={() => console.log('saved')}
                    css={styles.pencilIcon}
                >
                    <SVG src={Icons.PencilIcon} />
                </Button>
            </div>
        </div>
    );
};

const containerStyles: StylesDictionary = {
    pressableContainer: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '20px',
    },
};

const styles = {
    inputField: css`
        background-color: #C4C4C4;
        outline: none;
        border: none;
        margin-left: 150px;

        &:hover {
            text-decoration: underline;
        }
    `,
    plusIcon: css`
        background-color: transparent;

        SVG {
            &:hover{
                color: ${Colors.secondary};
            }
        }
    `,
    trashIcon: css`
        background-color: transparent;

        SVG {
            &:hover{
                color: ${Colors.secondary};
            }
        }
    `,
    pencilIcon: css`
        background-color: transparent;

        SVG {
            &:hover{
                color: ${Colors.secondary};
            }
        }
    `,
};

export default MainStrip;
