import styled from '@emotion/styled';
import { Stack } from '@fluentui/react';
import { ItemCard } from '../../types';
import { useAppSelector } from '../../store/store';
import { cardSelector } from '../../store/features/cardSlice';
import { Card } from '../Card/Card';
import { DeletableCard } from '../Card/DeletableCard';
import { cardsPerPageSelector } from '../../store/features/settingsSlice';

const CardWrapper = styled.div`
    padding: 20px;
    height: 100vh;
    box-sizing: border-box;
    overflow-y: scroll;

    @media print {
        overflow: visible;
    }
`;

const CardGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 295px);
    grid-template-rows: repeat(auto-fill, 410px);

    column-gap: 10px;
    row-gap: 10px;
    margin-bottom: 10px;

    @media print {
        grid-template-columns: repeat(auto-fill, 64mm);
        grid-template-rows: repeat(auto-fill, 89mm);
        column-gap: 0;
        row-gap: 0;

        page-break-before: always;
    }
`;

function groupedCardList(cards: ItemCard[], chunkSize: number) {
    const groupedCards = [];
    for (let i = 0; i < cards.length; i += chunkSize) {
        groupedCards.push(cards.slice(i, i + chunkSize));
    }
    return groupedCards;
}

export const CardList = () => {
    const cardsPerPage = useAppSelector(cardsPerPageSelector);
    const cards: ItemCard[] = useAppSelector((state) => cardSelector(state));

    const groupedCards: ItemCard[][] = groupedCardList(cards, Number(cardsPerPage));

    return (
        <CardWrapper>
            {groupedCards.map((group: ItemCard[], index: number) => (
                <CardGroup key={index}>
                    {group.map((card: ItemCard, index: number) => (
                        <DeletableCard card={card} key={`${index}-${card.item.id}`} />
                    ))}
                </CardGroup>
            ))}
        </CardWrapper>
    );
};
