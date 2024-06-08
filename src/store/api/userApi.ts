// ##########################
// #      IMPORT NPM        #
// ##########################
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ##########################
// #    IMPORT Components   #
// ##########################
import {
    MessageResponse,
    APIResponse,
    LoginGoogleType,
    LoginUserType,
    RegisterUserType,
    UserDetailsPopulateResponseType,
} from 'types/api-types';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1/',
        headers: {
            'Content-type': 'application/json',
        },
        credentials: 'include',
    }),
    tagTypes: ['User', 'Follow'],
    /**
     * TagTypes có tác dụng: Nếu call 1 api thì tất cả các api nào có cùng tagTypes sẽ bị gọi lại
     * Nên Những cái k cần thiết gọi lại thì phải tạo ra một tagTypes riêng
     */

    endpoints: (builder) => ({
        // UserDetails
        userDetails: builder.query<APIResponse, void>({
            query: () => 'me',
            providesTags: ['User'],
        }),

        // UserDetails By NickName
        userDetailsByNickName: builder.query<APIResponse, string>({
            query: (nickname) => `profile/${nickname}`,
            providesTags: ['User'],
        }),

        // UserDetailsPopulate
        userDetailsPopulate: builder.query<UserDetailsPopulateResponseType, string>({
            query: (nickname) => `userDetailsPopulate/${nickname}`,
            providesTags: ['User'],
        }),

        // Register User
        registerUser: builder.mutation<APIResponse, RegisterUserType>({
            query: (registerUserInfo) => ({
                url: 'register',
                method: 'POST',
                body: registerUserInfo,
            }),
            invalidatesTags: ['User'],
        }),

        // Login User
        loginUser: builder.mutation<APIResponse, LoginUserType>({
            query: (userInfo) => ({
                url: 'login',
                method: 'POST',
                body: userInfo,
            }),
            invalidatesTags: ['User'],
        }),

        // Login User With Google
        loginGoogle: builder.mutation<APIResponse, LoginGoogleType>({
            query: (userInfo) => ({
                url: 'login-google',
                method: 'POST',
                body: userInfo,
            }),
            invalidatesTags: ['User'],
        }),

        // Logout User
        logoutUser: builder.mutation<MessageResponse, void>({
            query: () => ({
                url: 'logout',
                method: 'GET',
            }),
            invalidatesTags: ['User'],
        }),

        // Follow User
        followUser: builder.mutation<MessageResponse, { userId: string }>({
            query: ({ userId }) => ({
                url: 'followUser',
                method: 'POST',
                body: { userId },
            }),
            invalidatesTags: ['User'],
        }),

        // UnFollow
        unFollow: builder.mutation<MessageResponse, { userId: string }>({
            query: ({ userId }) => ({
                url: 'unFollow',
                method: 'POST',
                body: { userId },
            }),
            invalidatesTags: ['User'],
        }),

        // Add friend
        addFriend: builder.mutation<MessageResponse, { userId: string }>({
            query: ({ userId }) => ({
                url: 'addFriend',
                method: 'POST',
                body: { userId },
            }),
            invalidatesTags: ['User'],
        }),

        // UnFriend
        unFriend: builder.mutation<MessageResponse, { userId: string }>({
            query: ({ userId }) => ({
                url: 'unFriend',
                method: 'POST',
                body: { userId },
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useUserDetailsQuery,
    useUserDetailsByNickNameQuery,
    useUserDetailsPopulateQuery,

    useRegisterUserMutation,
    useLoginUserMutation,
    useLoginGoogleMutation,
    useLogoutUserMutation,

    useFollowUserMutation,
    useUnFollowMutation,
    useAddFriendMutation,
    useUnFriendMutation,
} = userApi;
