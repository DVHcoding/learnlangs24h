// ##########################
// #      IMPORT NPM        #
// ##########################
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ##########################
// #    IMPORT Components   #
// ##########################
import { MessageResponse, APIResponse, LoginGoogleType, LoginUserType, RegisterUserType } from 'types/api-types';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1/',
        headers: {
            'Content-type': 'application/json',
        },
        credentials: 'include',
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        // UserDetails
        userDetails: builder.query<APIResponse, void>({
            query: () => 'me',
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
    }),
});

export const { useUserDetailsQuery, useRegisterUserMutation, useLoginUserMutation, useLoginGoogleMutation, useLogoutUserMutation } =
    userApi;
