// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetAllBookCategoriesResponse, IGetBooksPayload, IGetBooksResponse } from 'types/book.types';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################

export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1/',
        headers: {
            'Content-type': 'application/json',
        },
        credentials: 'include',
    }),
    tagTypes: ['Books'],

    endpoints: (builder) => ({
        /* -------------------------------------------------------------------------- */
        /*                                    QUERY                                   */
        /* -------------------------------------------------------------------------- */
        getBooks: builder.query<IGetBooksResponse, IGetBooksPayload>({
            query: ({ page, limit, bookCategory }) => `books?page=${page}&limit=${limit}&bookCategory=${bookCategory}`,
            providesTags: ['Books'],
        }),
        getAllBookCategories: builder.query<IGetAllBookCategoriesResponse, void>({
            query: () => 'book/categories',
            providesTags: ['Books'],
        }),

        /* -------------------------------------------------------------------------- */
        /*                                  MUTATION                                  */
        /* -------------------------------------------------------------------------- */
    }),
});

export const { useGetBooksQuery, useGetAllBookCategoriesQuery } = bookApi;
