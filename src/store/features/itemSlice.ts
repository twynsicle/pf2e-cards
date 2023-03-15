import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import items from '../../assets/output.json';
import { RootState } from '../store';
import { Filters, Item } from '../../types';

export interface ItemState {
    items: Item[];
    filters: Filters;
}

const initialState: ItemState = {
    items: items,
    filters: {
        searchTerm: '',
        showConsumable: true,
        showPermanent: true,
        levelUpper: 20,
        levelLower: 0,
    },
};

export const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string | undefined>) => {
            state.filters.searchTerm = action.payload ?? '';
        },
        setShowConsumable: (state, action: PayloadAction<boolean>) => {
            state.filters.showConsumable = action.payload;
        },
        setShowPermanent: (state, action: PayloadAction<boolean>) => {
            state.filters.showPermanent = action.payload;
        },
        setLevelLower: (state, action: PayloadAction<number>) => {
            state.filters.levelLower = action.payload;
        },
        setLevelUpper: (state, action: PayloadAction<number>) => {
            //TODO there are items above level 20
            state.filters.levelUpper = action.payload;
        },
    },
});

const itemsState = (state: RootState) => state.items;

function filterItem(item: Item, filterOptions: Filters) {
    if (!item.name.toLowerCase().startsWith(filterOptions.searchTerm.toLowerCase())) {
        return false;
    }
    if (item.level > filterOptions.levelUpper || item.level < filterOptions.levelLower) {
        return false;
    }
    if (item.consumable && !filterOptions.showConsumable) {
        return false;
    }
    if (!item.consumable && !filterOptions.showPermanent) {
        return false;
    }
    return true;
}

export const filteredItemNameSelector = createSelector([itemsState], (itemsState) => {
    return itemsState.items.filter((item) => filterItem(item, itemsState.filters));
});

// export const filteredItemNameSelector = createSelector(
//     [itemsState, (itemsState, filters) => filters],
//     (itemsState, filters) => {
//         return itemsState.items.filter((item) => filterItem(item, filters));
//     }
// );

const itemState = (state: RootState) => state.items;

export const filterSelector = createSelector([itemState], (itemState: ItemState) => {
    return itemState.filters;
});

export const { setSearchTerm, setShowPermanent, setShowConsumable, setLevelLower, setLevelUpper } = itemSlice.actions;

export default itemSlice.reducer;
