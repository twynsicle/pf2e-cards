import { RootState } from '../store';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemCard, Item } from '../../types';

export interface CardState {
    cards: ItemCard[];
}

const initialState: CardState = {
    cards: [],
};

export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        addCard: (state, action: PayloadAction<Item>) => {
            state.cards.push({
                item: action.payload,
            });
            // state.cards = [...state.cards, { item: action.payload }];
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

export const { addCard, clearAllCards } = cardSlice.actions;

export default cardSlice.reducer;
