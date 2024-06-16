// ##########################
// #      IMPORT NPM        #
// ##########################
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MessageResponse, MyChatResponse } from 'types/api-types';

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

        /* -------------------------------------------------------------------------- */
        /*                                  MUTATION                                  */
        /* -------------------------------------------------------------------------- */
        newGroup: builder.mutation<MessageResponse, { name: string; members: string[] }>({
            query: ({ name, members }) => ({
                url: '/chat/new',
                method: 'POST',
                body: { name, members },
            }),
        }),
        getChatById: builder.mutation<{ success: boolean; chatId: string }, { _id: string; name: string; members: string }>({
            query: ({ _id, name, members }) => ({
                url: `/chat/${_id}`,
                method: 'POST',
                body: { name, members },
            }),
        }),
    }),
});

export const { useGetMyChatsQuery, useNewGroupMutation, useGetChatByIdMutation } = chatApi;
