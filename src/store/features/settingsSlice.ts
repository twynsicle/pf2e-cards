import { RootState } from '../store';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
    borderRadius: string;
    displayPreview: boolean;
    cardsPerPage: string;
    displayPurchaseValue: boolean;
    displaySaleValue: boolean;
    playerCount: string;
}

const initialState: SettingsState = {
    borderRadius: '0',
    displayPreview: true,
    cardsPerPage: '8',
    displayPurchaseValue: true,
    displaySaleValue: true,
    playerCount: '4',
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
        setCardsPerPage: (state, action: PayloadAction<string>) => {
            state.cardsPerPage = action.payload;
        },
        setDisplayPurchaseValue: (state, action: PayloadAction<boolean>) => {
            state.displayPurchaseValue = action.payload;
        },
        setDisplaySaleValue: (state, action: PayloadAction<boolean>) => {
            state.displaySaleValue = action.payload;
        },
        setPlayerCount: (state, action: PayloadAction<string>) => {
            state.playerCount = action.payload;
        },
        setDisplayPreview: (state, action: PayloadAction<boolean>) => {
            state.displayPreview = action.payload;
        },
    },
});

const settingsState = (state: RootState) => state.settings;

export const borderRadiusSelector = createSelector([settingsState], (settingsState: SettingsState) => {
    return settingsState.borderRadius;
});

export const cardsPerPageSelector = createSelector([settingsState], (settingsState: SettingsState) => {
    return settingsState.cardsPerPage;
});

export const displayPurchaseValueSelector = createSelector([settingsState], (settingsState: SettingsState) => {
    return settingsState.displayPurchaseValue;
});

export const displaySaleValueSelector = createSelector([settingsState], (settingsState: SettingsState) => {
    return settingsState.displaySaleValue;
});

export const playerCountSelector = createSelector([settingsState], (settingsState: SettingsState) => {
    return settingsState.playerCount;
});

export const displayPreviewSelector = createSelector([settingsState], (settingsState: SettingsState) => {
    return settingsState.displayPreview;
});

export const {
    setBorderRadius,
    setDisplayPreview,
    setCardsPerPage,
    setDisplayPurchaseValue,
    setDisplaySaleValue,
    setPlayerCount,
} = settingsSlice.actions;

export default settingsSlice.reducer;
