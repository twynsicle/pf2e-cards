import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './features/itemSlice';
import cardReducer from './features/cardSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';
// import { persistReducer } from 'redux-persist';
// import thunk from 'redux-thunk';

export const store = configureStore({
    reducer: {
        items: itemReducer,
        cards: cardReducer,
    },
});
//
// const persistConfig = {
//     key: 'root',
//     storage,
// };

// const persistedReducer = persistReducer(persistConfig, reducers);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
