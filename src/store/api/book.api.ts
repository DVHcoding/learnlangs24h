// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetAllBookCategoriesResponse, IGetBooksPayload, IGetBooksResponse, INewBookPayload } from 'types/book.types';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { APIResponse } from 'types/api-types';

export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1/',
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
        newBook: builder.mutation<APIResponse, INewBookPayload>({
            query: ({ name, photo, premium, previews, pdf, bookCategory }) => {
                const formDataToSend = new FormData();
                formDataToSend.append('name', name);
                formDataToSend.append('premium', premium);
                formDataToSend.append('bookCategory', bookCategory);
                formDataToSend.append('photo', photo);
                formDataToSend.append('pdf', pdf);
                previews.forEach((file) => {
                    formDataToSend.append('previews', file);
                });

                return {
                    url: 'book/new',
                    method: 'POST',
                    body: formDataToSend,
                    formData: true,
                };
            },
            invalidatesTags: ['Books'],
        }),
    }),
});

export const { useGetBooksQuery, useGetAllBookCategoriesQuery, useNewBookMutation } = bookApi;
