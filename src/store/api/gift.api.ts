// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APIResponse } from 'types/api-types';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################

export const giftApi = createApi({
    reducerPath: 'giftApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1/',
        headers: {
            'Content-type': 'application/json',
        },
        credentials: 'include',
    }),
    tagTypes: ['Gift'],

    endpoints: (builder) => ({
        /* -------------------------------------------------------------------------- */
        /*                                    QUERY                                   */
        /* -------------------------------------------------------------------------- */

        /* -------------------------------------------------------------------------- */
        /*                                  MUTATION                                  */
        /* -------------------------------------------------------------------------- */
        newGiftForUser: builder.mutation<APIResponse, FormData>({
            query: (FormData) => ({
                url: 'gift/new',
                method: 'POST',
                body: FormData,
            }),
            invalidatesTags: ['Gift'],
        }),
    }),
});

export const { useNewGiftForUserMutation } = giftApi;
