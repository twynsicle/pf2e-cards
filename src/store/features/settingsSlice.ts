import { RootState } from '../store';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
    borderRadius: string;
    displayPreview: boolean;
}

const initialState: SettingsState = {
    borderRadius: '0',
    displayPreview: true,
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
    },
});

const settingsState = (state: RootState) => state.settings;

export const borderRadiusSelector = createSelector([settingsState], (settingsState: SettingsState) => {
    return settingsState.borderRadius;
});

export const displayPreviewSelector = createSelector([settingsState], (settingsState: SettingsState) => {
    return settingsState.displayPreview;
});

export const { setBorderRadius, setDisplayPreview } = settingsSlice.actions;

export default settingsSlice.reducer;
