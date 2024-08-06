// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { GetAllGiftByUserIDResponseTypes } from 'types/gift.types';
import { APIResponse } from 'types/api-types';

export const giftApi = createApi({
    reducerPath: 'giftApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1/',
        credentials: 'include',
    }),
    tagTypes: ['Gift'],

    endpoints: (builder) => ({
        /* -------------------------------------------------------------------------- */
        /*                                    QUERY                                   */
        /* -------------------------------------------------------------------------- */
        getAllGiftByUserId: builder.query<GetAllGiftByUserIDResponseTypes, string | null | undefined>({
            query: (userId) => `gift/${userId}`,
            providesTags: ['Gift'],
        }),

        /* -------------------------------------------------------------------------- */
        /*                                  MUTATION                                  */
        /* -------------------------------------------------------------------------- */
        newGiftForUser: builder.mutation<APIResponse, FormData>({
            query: (FormData) => ({
                url: 'gift/new',
                method: 'POST',
                body: FormData,
                formData: true,
            }),
            invalidatesTags: ['Gift'],
        }),
        deleteGiftById: builder.mutation<APIResponse, { id: string }>({
            query: (id) => ({
                url: `gift/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Gift'],
        }),
    }),
});

export const { useGetAllGiftByUserIdQuery, useNewGiftForUserMutation, useDeleteGiftByIdMutation } = giftApi;
