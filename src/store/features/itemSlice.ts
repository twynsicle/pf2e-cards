import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import items from '../../assets/output.json';
import { RootState } from '../store';
import { Item } from '../../types';

export interface ItemState {
    items: Item[];
}

const initialState: ItemState = {
    items: items,
};

export const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {},
});

const itemsState = (state: RootState) => state.items;

export const itemNameSelector = createSelector([itemsState], (itemsState: ItemState) => {
    return itemsState.items;
});

interface FilterOptions {
    searchTerm: string;
    showConsumables: boolean;
    showPermanent: boolean;
    levelUpper: number;
    levelLower: number;
}

function filterItem(item: Item, filterOptions: FilterOptions) {
    if (!item.name.toLowerCase().startsWith(filterOptions.searchTerm)) {
        return false;
    }
    if (item.level > filterOptions.levelUpper || item.level < filterOptions.levelLower) {
        return false;
    }
    if (item.consumable && !filterOptions.showConsumables) {
        return false;
    }
    if (!item.consumable && !filterOptions.showPermanent) {
        return false;
    }
    return true;
}

export const filteredItemNameSelector = createSelector(
    [itemsState, (itemsState, filters) => filters],
    (itemsState, filters) => {
        return itemsState.items.filter((item) => filterItem(item, filters));
    }
);

// export const { derp } = itemSlice.actions;

export default itemSlice.reducer;
