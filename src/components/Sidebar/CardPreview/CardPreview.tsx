import { Item, ItemCard, Spell, SpellCard } from "../../../types";
import React from 'react';
import styled from '@emotion/styled';
import uuid from 'react-uuid';
import { ItemCardContent } from "../../Card/ItemCardContent";
import { SpellCardContent } from "../../Card/SpellCardContent";

const CardPreviewStyled = styled.div`
    position: absolute;
    z-index: 2;
    top: 20%;
    left: -300px;
    @media (hover: none) {
        display: none;
    }
`;

interface CardPreviewProps {
    display: boolean;
    card: Item | Spell | null;
}

export const CardPreview = (props: CardPreviewProps) => {
    if (!props.display || !props.card) {
        return null;
    }

    const borderRadius = 3;
    const cardStyle = {
        borderRadius: `${borderRadius}mm`,
    };

    if ((props.card as any).price ) {
        const wrappedItem: ItemCard = {
            id: uuid(),
            content: props.card as Item,
        };
        return (
            <CardPreviewStyled>
                <div className="card" style={cardStyle}>
                    <ItemCardContent card={wrappedItem} />
                </div>
            </CardPreviewStyled>
        );
    } else {
        const wrappedSpell: SpellCard = {
            id: uuid(),
            content: props.card as Spell,
        };
        return (
            <CardPreviewStyled>
                <div className="card" style={cardStyle}>
                    <SpellCardContent card={wrappedSpell} />
                </div>
            </CardPreviewStyled>
        );
    }
};
