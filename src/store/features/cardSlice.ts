import { RootState } from '../store';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item, Spell, ItemCard, SpellCard } from "../../types";
import uuid from 'react-uuid';

export interface CardState {
    cards: (SpellCard | ItemCard)[];
}

const initialState: CardState = {
    cards: [],
};

export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        addCard: (state, action: PayloadAction<Item | Spell>) => {
            //TODO this isn't great, well include free items
            if ((action.payload as any).price ) {
                state.cards.push({
                    id: uuid(),
                    content: action.payload,
                } as ItemCard);
            } else {
                state.cards.push({
                    id: uuid(),
                    content: action.payload,
                } as SpellCard);
            }
        },
        removeCard: (state, action: PayloadAction<string>) => {
            state.cards = state.cards.filter((card) => card.id !== action.payload);
        },
        clearAllCards: (state) => {
            state.cards = [];
        },
    },
});

const cardState = (state: RootState) => state.cards;

export const cardSelector = createSelector([cardState], (cardState: CardState) => {
    return cardState.cards;
});

export const { addCard, clearAllCards, removeCard } = cardSlice.actions;

export default cardSlice.reducer;
