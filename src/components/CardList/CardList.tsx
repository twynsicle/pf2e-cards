import styled from '@emotion/styled';
import { Stack } from '@fluentui/react';
import { ItemCard } from '../../types';
import { useAppSelector } from '../../store/store';
import { cardSelector } from '../../store/features/cardSlice';
import { Card } from '../Card/Card';
import { DeletableCard } from '../Card/DeletableCard';

const GridWrapper = styled.div`
    padding: 20px;
    height: 100vh;
    box-sizing: border-box;
    overflow-y: scroll;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    align-content: flex-start;
`;

export const CardList = () => {
    const cards: ItemCard[] = useAppSelector((state) => cardSelector(state));

    //TODO group into groups of 6
    //or 4 depending on paper size?

    //TODO where do i recommend defaulting to portrait

    //TODO should be left aligned when printing if someone doesn't want to print a full sheet

    return (
        <GridWrapper>
            {/*<Stack horizontal wrap={true} tokens={{ childrenGap: 0 }}>*/}
            {cards.map((card: ItemCard, index: number) => (
                <DeletableCard card={card} key={`${index}-${card.item.id}`} />
            ))}
            {/*</Stack>*/}
        </GridWrapper>
    );
};
