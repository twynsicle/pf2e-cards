import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Item } from '../../types';

export const itemApi = createApi({
    reducerPath: 'itemApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (builder) => ({
        getItems: builder.query<Item[], void>({
            query: () => `items.json`,
        }),
    }),
});

export const { useGetItemsQuery } = itemApi;
