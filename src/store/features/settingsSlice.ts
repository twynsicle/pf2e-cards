import { RootState } from '../store';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
    borderRadius: string;
}

const initialState: SettingsState = {
    borderRadius: '0',
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
    },
});

const settingsState = (state: RootState) => state.settings;

export const borderRadiusSelector = createSelector([settingsState], (settingsState: SettingsState) => {
    return settingsState.borderRadius;
});

export const { setBorderRadius } = settingsSlice.actions;

export default settingsSlice.reducer;
