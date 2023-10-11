import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

// import items from '../../../public/output.json';
import { RootState } from '../store';
import { Filters, Spell } from "../../types";

export interface SpellState {
    spells: Spell[];
    filters: Filters;
}

const initialState: SpellState = {
    spells: [],
    filters: {
        searchTerm: '',
        levelUpper: 20,
        levelLower: 0,
    },
};

export const spellSlice = createSlice({
    name: 'spell',
    initialState,
    reducers: {
        setSpells: (state, action: PayloadAction<Spell[]>) => {
            state.spells = action.payload;
        },
        setSearchTerm: (state, action: PayloadAction<string | undefined>) => {
            state.filters.searchTerm = action.payload ?? '';
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

const spellsState = (state: RootState) => state.spells;

function filterItem(spell: Spell, filterOptions: Filters) {
    if (!spell.name.toLowerCase().startsWith(filterOptions.searchTerm.toLowerCase())) {
        return false;
    }
    if (spell.level > filterOptions.levelUpper || spell.level < filterOptions.levelLower) {
        return false;
    }
    return true;
}

export const filteredSpellNameSelector = createSelector([spellsState], (spellsState) => {
    return spellsState.spells.filter((spell) => filterItem(spell, spellsState.filters));
});

// export const filteredItemNameSelector = createSelector(
//     [itemsState, (itemsState, filters) => filters],
//     (itemsState, filters) => {
//         return itemsState.items.filter((item) => filterItem(item, filters));
//     }
// );

const spellState = (state: RootState) => state.spells;

export const filterSelector = createSelector([spellState], (spellState: SpellState) => {
    return spellState.filters;
});

export const { setSearchTerm, setLevelLower, setLevelUpper, setSpells } =
    spellSlice.actions;

export default spellSlice.reducer;
