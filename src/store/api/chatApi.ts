// ##########################
// #      IMPORT NPM        #
// ##########################
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ##########################
// #    IMPORT Components   #
// ##########################
import { ChatDetailsResponse, ChatUserStatusResponse, GetMessageResponse, SendAttachmentsResponse } from 'types/chatApi-types';
import { GetChatByIdRequest, GetChatByIdResponse, MessageResponse, MyChatResponse, NewGroupRequest } from 'types/api-types';

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

        getChatDetails: builder.query<ChatDetailsResponse, { chatId: string | undefined }>({
            query: ({ chatId }) => `/chat/details/${chatId}`,
            providesTags: ['Chat'],
        }),

        getMessages: builder.query<GetMessageResponse, { chatId: string | undefined; page: number }>({
            query: ({ chatId, page }) => `/message/${chatId}?page=${page}`,
            keepUnusedDataFor: 0, // Sử dụng để không lưu cached. Giúp dữ liệu luôn mới nhưng sẽ làm hệ thống chịu tải nhiều hơn
        }),

        getUserStatus: builder.query<ChatUserStatusResponse, { userId: string | undefined }>({
            query: ({ userId }) => `/chat/user/status?userId=${userId}`,
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
        sendAttachments: builder.mutation<SendAttachmentsResponse, FormData>({
            query: (myForm) => ({
                url: '/message',
                method: 'POST',
                body: myForm,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
        }),
    }),
});

export const {
    useGetMyChatsQuery,
    useGetChatDetailsQuery,
    useGetMessagesQuery,
    useGetUserStatusQuery,

    useNewGroupMutation,
    useGetChatByIdMutation,
    useSendAttachmentsMutation,
} = chatApi;
