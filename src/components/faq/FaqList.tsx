import React, { FunctionComponent, useState, useEffect } from 'react';
import FaqCard from './FaqCard';
import { FaqMessageTypeEnum, IFaq } from '../../entities/faq';
import Collapsible from '../Collapsible';

interface FaqListProps {
    id: string;
    title: string;
    messages: string;
    captions: string;
    faqType: FaqMessageTypeEnum;
    children?: Array<IFaq>;
    onClickPlus: (id: string) => void;
    onClickDelete: (id: string) => void;
    index: number;
    openFaqs: string[];
    searchedFaqId: string;
}

const FaqList: FunctionComponent<FaqListProps> = (props: FaqListProps) => {
    const { id, title, messages, captions, faqType, children, onClickPlus, onClickDelete, index, openFaqs, searchedFaqId } = props;

    const renderTitle = () => {
        return (
            <div style={{ width: '100%' }}>
                <FaqCard
                    id={id}
                    cardTitle={title}
                    cardContent={messages}
                    cardCaption={captions}
                    cardType={faqType}
                    onClickPlus={() => onClickPlus(id)}
                    onClickDelete={() => onClickDelete(id)}
                    index={index}
                    searchedFaqId={searchedFaqId}
                />
            </div>
        );
    };

    const renderContent = () => {
        return (
            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                {children?.map((item) => {
                    const { id: childrenId, title: childrenTitle, messages: childrenMessage, children: childrenChild } = item;

                    const sortedChildrenChild = childrenChild?.slice().sort((a, b) => a.orderId - b.orderId);

                    return (
                        <FaqList
                            key={childrenId}
                            id={childrenId}
                            title={childrenTitle}
                            messages={childrenMessage[0].text}
                            captions={childrenMessage[0].caption || ''}
                            faqType={childrenMessage[0].type}
                            onClickPlus={onClickPlus}
                            onClickDelete={onClickDelete}
                            index={index + 1}
                            openFaqs={openFaqs}
                            searchedFaqId={searchedFaqId}
                        >
                            {sortedChildrenChild}
                        </FaqList>
                    );
                })}
            </div>
        );
    };

    return (
        <Collapsible title={renderTitle()} content={renderContent()} openFaqs={openFaqs} id={id}>{children}</Collapsible>
    );
};

FaqList.defaultProps = {
    children: [],
};

export default FaqList;
