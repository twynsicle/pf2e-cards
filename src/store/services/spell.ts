import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Spell } from '../../types';

export const spellApi = createApi({
    reducerPath: 'spellApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (builder) => ({
        getSpells: builder.query<Spell[], void>({
            query: () => `spells.json`,
        }),
    }),
});

export const { useGetSpellsQuery } = spellApi;
