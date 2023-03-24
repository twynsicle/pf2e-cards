import { RootState } from '../store';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
    borderRadius: string;
    displayPreview: boolean;
    cardsPerPage: string;
}

const initialState: SettingsState = {
    borderRadius: '0',
    displayPreview: true,
    cardsPerPage: '8',
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setBorderRadius: (state, action: PayloadAction<string | undefined>) => {
            if (!action.payload) {
                action.payload = '0';
            }
            state.borderRadius = action.payload;
            console.log(`borderRadius ${action.payload}`);
        },
        setDisplayPreview: (state, action: PayloadAction<boolean>) => {
            state.displayPreview = action.payload;
        },
        setCardsPerPage: (state, action: PayloadAction<string>) => {
            state.cardsPerPage = action.payload;
        },
    },
});

const settingsState = (state: RootState) => state.settings;

export const borderRadiusSelector = createSelector([settingsState], (settingsState: SettingsState) => {
    return settingsState.borderRadius;
});

export const displayPreviewSelector = createSelector([settingsState], (settingsState: SettingsState) => {
    return settingsState.displayPreview;
});

export const cardsPerPageSelector = createSelector([settingsState], (settingsState: SettingsState) => {
    return settingsState.cardsPerPage;
});

export const { setBorderRadius, setDisplayPreview, setCardsPerPage } = settingsSlice.actions;

export default settingsSlice.reducer;
