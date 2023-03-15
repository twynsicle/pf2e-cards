import { Item } from '../../../types';
import { Card } from '../../Card/Card';
import React from 'react';
import styled from '@emotion/styled';

const CardPreviewStyled = styled.div`
    position: absolute;
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
        item: props.item,
    };

    return (
        <CardPreviewStyled>
            <Card card={wrappedItem} />
        </CardPreviewStyled>
    );
};
