// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { GetParentCommentsResponse, GetRepliesByIdResponse, NewCommentPayloadTypes, NewCommentResponseTypes } from 'types/comment.types';

export const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1/',
        headers: {
            'Content-type': 'application/json',
        },
        credentials: 'include',
    }),
    tagTypes: ['Comments', 'Replies'],

    endpoints: (builder) => ({
        /* -------------------------------------------------------------------------- */
        /*                                    QUERY                                   */
        /* -------------------------------------------------------------------------- */
        getParentComments: builder.query<GetParentCommentsResponse, void>({
            query: () => '/comments',
            providesTags: ['Comments'],
        }),
        getRepliesById: builder.query<GetRepliesByIdResponse, string>({
            query: (parentId) => `/comments/${parentId}/replies`,
            providesTags: ['Replies'],
        }),

        /* -------------------------------------------------------------------------- */
        /*                                  MUTATION                                  */
        /* -------------------------------------------------------------------------- */
        newComment: builder.mutation<NewCommentResponseTypes, NewCommentPayloadTypes>({
            query: ({ message, parentId, userId }) => ({
                url: 'comments',
                method: 'POST',
                body: { message, parentId, userId },
            }),
            invalidatesTags: ['Comments'],
        }),
    }),
});

export const { useLazyGetParentCommentsQuery, useLazyGetRepliesByIdQuery, useNewCommentMutation } = commentApi;
