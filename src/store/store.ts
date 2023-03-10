import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './features/itemSlice';
import cardReducer from './features/cardSlice';
import settingsReducer from './features/settingsSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const itemsConfig = {
    key: 'items',
    storage: storage,
    blacklist: ['items'],
};

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['items'],
};

const reducers = combineReducers({
    items: persistReducer(itemsConfig, itemReducer),
    cards: cardReducer,
    settings: settingsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
