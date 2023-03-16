import { Item } from '../../../types';
import { Card } from '../../Card/Card';
import React from 'react';
import styled from '@emotion/styled';
import uuid from 'react-uuid';

const CardPreviewStyled = styled.div`
    position: absolute;
    z-index: 2;
    top: 20%;
    left: -300px;
`;

interface CardPreviewProps {
    display: boolean;
    item: Item | null;
}

export const CardPreview = (props: CardPreviewProps) => {
    if (!props.display || !props.item) {
        return null;
    }

    const wrappedItem = {
        id: uuid(),
        item: props.item,
    };

    return (
        <CardPreviewStyled>
            <Card card={wrappedItem} />
        </CardPreviewStyled>
    );
};
