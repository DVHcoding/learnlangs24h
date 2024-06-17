// ##########################
// #      IMPORT NPM        #
// ##########################
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ChatDetailsResponse } from 'types/chatApi-types';
import { GetChatByIdRequest, GetChatByIdResponse, MessageResponse, MyChatResponse, NewGroupRequest } from 'types/api-types';

// ##########################
// #    IMPORT Components   #
// ##########################

export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1/',
        headers: {
            'Content-type': 'application/json',
        },
        credentials: 'include',
    }),
    tagTypes: ['Chat'],
    /**
     * TagTypes có tác dụng: Nếu call 1 api thì tất cả các api nào có cùng tagTypes sẽ bị gọi lại
     * Nên Những cái k cần thiết gọi lại thì phải tạo ra một tagTypes riêng
     */

    endpoints: (builder) => ({
        /* -------------------------------------------------------------------------- */
        /*                                    QUERY                                   */
        /* -------------------------------------------------------------------------- */
        // getMyChats
        getMyChats: builder.query<MyChatResponse, void>({
            query: () => '/chat/my',
            providesTags: ['Chat'],
        }),
        getChatDetails: builder.query<ChatDetailsResponse, { chatId: string | undefined; skip: boolean }>({
            query: ({ chatId }) => `/chat/details/${chatId}`,
            providesTags: ['Chat'],
        }),

        /* -------------------------------------------------------------------------- */
        /*                                  MUTATION                                  */
        /* -------------------------------------------------------------------------- */
        newGroup: builder.mutation<MessageResponse, NewGroupRequest>({
            query: ({ name, members }) => ({
                url: '/chat/new',
                method: 'POST',
                body: { name, members },
            }),
            invalidatesTags: ['Chat'],
        }),
        getChatById: builder.mutation<GetChatByIdResponse, GetChatByIdRequest>({
            query: ({ _id, name, members }) => ({
                url: `/chat/${_id}`,
                method: 'POST',
                body: { name, members },
            }),

            invalidatesTags: ['Chat'],
        }),
    }),
});

export const { useGetMyChatsQuery, useGetChatDetailsQuery, useNewGroupMutation, useGetChatByIdMutation } = chatApi;
